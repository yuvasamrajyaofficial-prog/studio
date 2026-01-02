'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useChat } from '@ai-sdk/react';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatMessages } from './components/chat-messages';
import { ChatInput } from './components/chat-input';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadUserChats, createChat, saveMessage, updateChatTitle, deleteChat as deleteFirestoreChat } from '@/lib/ai/chat-storage';
import { useToast } from '@/hooks/use-toast';

interface Chat {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
  messages: any[];
}

export default function AIGuidePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  // Vercel AI SDK's useChat hook - MUCH cleaner!
  const { messages, input, setInput, append, isLoading, error, setMessages } = useChat({
    api: '/api/chat',
    body: {
      userId: user?.uid,
    },
    onResponse: (response) => {
      if (!response.ok) {
        toast({
          title: 'Error',
          description: 'Failed to get AI response',
          variant: 'destructive',
        });
      }
    },
    onFinish: async (message) => {
      // Save messages to Firestore after AI responds
      if (user && activeChat) {
        try {
          // Save assistant message
          await saveMessage(user.uid, activeChat, {
            id: message.id,
            role: 'assistant',
            content: message.content,
            timestamp: new Date(),
          });

          // Update chat title from first message if needed
          if (messages.length === 1) {
            const firstUserMessage = messages[0];
            await updateChatTitle(
              user.uid,
              activeChat,
              firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : ''),
              firstUserMessage.content.slice(0, 100) + (firstUserMessage.content.length > 100 ? '...' : '')
            );
          }

          // Reload chats
          await loadChats();
        } catch (error) {
          console.error('Failed to save message:', error);
        }
      }
    },
  });

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
  }, [user]);

  // Load chats from Firestore
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
      const newChat = await createChat(user.uid, 'gemini');
      setChats([newChat, ...chats]);
      setActiveChat(newChat.id);
      setMessages([]); // Clear messages
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
      setMessages(chat.messages || []);
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

  // Send message using Vercel AI SDK
  const handleSendMessage = async (content: string) => {
    if (!user || !activeChat) return;

    // Save user message to Firestore first
    const userMessage = {
      id: `msg_${Date.now()}`,
      role: 'user' as const,
      content,
      timestamp: new Date(),
    };

    try {
      await saveMessage(user.uid, activeChat, userMessage);
    } catch (error) {
      console.error('Failed to save user message:', error);
    }

    // Send to AI via Vercel AI SDK
    append({
      role: 'user',
      content,
    });
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
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;

    const messagesToKeep = messages.slice(0, messageIndex);
    setMessages(messagesToKeep);

    const lastUserMessage = [...messagesToKeep].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      append({
        role: 'user',
        content: lastUserMessage.content,
      });
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
            messages={messages}
            isLoading={isLoading}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            onFeedback={handleFeedback}
          />
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => {
            if (input.trim()) {
              handleSendMessage(input);
              setInput('');
            }
          }}
          isLoading={isLoading}
          disabled={!activeChat}
        />
      </div>
    </div>
  );
}
