'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatMessages } from './components/chat-messages';
import { ChatInput } from './components/chat-input';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateAIResponse } from '@/lib/ai/client';
import { createSystemMessage } from '@/lib/ai/spiritual-context';
import { loadUserChats, createChat, saveMessage, updateChatTitle, deleteChat as deleteFirestoreChat } from '@/lib/ai/chat-storage';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
  messages: Message[];
}

export default function AIGuidePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      loadChats();
    }
  }, [user, router]);

  // Auto-create new chat on mount if no chats exist
  useEffect(() => {
    if (user && chats.length === 0 && !activeChat) {
      handleNewChat();
    }
  }, [user]); // Only run once on mount

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  //Load chats from Firestore
  const loadChats = async () => {
    if (!user) return;
    try {
      const loadedChats = await loadUserChats(user.uid);
      setChats(loadedChats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  // Create new chat
  const handleNewChat = async () => {
    if (!user) return;
    
    try {
      const newChat = await createChat(user.uid, 'gemini'); // Default to Gemini
      setChats([newChat, ...chats]);
      setActiveChat(newChat.id);
      setMessages([]);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Failed to create chat:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new chat',
        variant: 'destructive',
      });
    }
  };

  // Select chat
  const handleSelectChat = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setActiveChat(chatId);
      setMessages(chat.messages);
      setIsSidebarOpen(false);
    }
  };

  // Delete chat
  const handleDeleteChat = async (chatId: string) => {
    if (!user) return;
    
    try {
      await deleteFirestoreChat(user.uid, chatId);
      setChats(chats.filter((c) => c.id !== chatId));
      if (activeChat === chatId) {
        setActiveChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  // Send message with REAL AI
  const handleSendMessage = async (content: string) => {
    if (!user || !activeChat) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);
    setStreamingMessage('');

    try {
      // Save user message to Firestore
      await saveMessage(user.uid, activeChat, userMessage);

      // Build spiritual context
      const systemMessage = await createSystemMessage(user.uid);

      // Prepare messages for AI
      const aiMessages = [
        systemMessage,
        ...updatedMessages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      ];

      let fullResponse = '';

      // Generate AI response with streaming
      await generateAIResponse(user.uid, aiMessages, {
        onToken: (token) => {
          fullResponse += token;
          setStreamingMessage(fullResponse);
        },
        onComplete: async () => {
          const aiMessage: Message = {
            id: `msg_${Date.now()}`,
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date(),
          };

          const finalMessages = [...updatedMessages, aiMessage];
          setMessages(finalMessages);
          setStreamingMessage('');
          setIsLoading(false);

          // Save AI message to Firestore
          await saveMessage(user.uid, activeChat, aiMessage);

          // Update chat title from first message
          if (messages.length === 0) {
            await updateChatTitle(
              user.uid,
              activeChat,
              content.slice(0, 50) + (content.length > 50 ? '...' : ''),
              content.slice(0, 100) + (content.length > 100 ? '...' : '')
            );
          }

          // Reload chats to update sidebar
          await loadChats();
        },
        onError: (error) => {
          setIsLoading(false);
          setStreamingMessage('');
          toast({
            title: 'AI Error',
            description: error,
            variant: 'destructive',
          });
        },
      });
    } catch (error: any) {
      setIsLoading(false);
      setStreamingMessage('');
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive',
      });
    }
  };

  // Copy message
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied',
      description: 'Message copied to clipboard',
    });
  };

  // Regenerate response
  const handleRegenerate = async (messageId: string) => {
    // Find the message and get all messages before it
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    const messagesToKeep = messages.slice(0, messageIndex);
    setMessages(messagesToKeep);

    // Get the last user message
    const lastUserMessage = messagesToKeep.reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      await handleSendMessage(lastUserMessage.content);
    }
  };

  // Message feedback
  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    // TODO: Save feedback to Firestore
    console.log('Feedback:', messageId, type);
  };

  if (!user) {
    return null; // Will redirect
  }

  // Combine regular messages with streaming message
  const displayMessages = streamingMessage
    ? [
        ...messages,
        {
          id: 'streaming',
          role: 'assistant' as const,
          content: streamingMessage,
          timestamp: new Date(),
        },
      ]
    : messages;

  return (
    <div className="h-screen flex bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-white/10 bg-[#0a0118]/80 backdrop-blur-xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-white">AI Spiritual Guide</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ChatMessages
            messages={displayMessages}
            isLoading={isLoading}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            onFeedback={handleFeedback}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          disabled={!activeChat}
        />
      </div>
    </div>
  );
}
