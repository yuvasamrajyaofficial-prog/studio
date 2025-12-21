'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatMessages } from './components/chat-messages';
import { ChatInput } from './components/chat-input';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
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
  }, [messages]);

  // Create new chat
  const handleNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      title: 'New Conversation',
      preview: 'Start a new spiritual conversation',
      updatedAt: new Date(),
      messages: [],
    };
    
    setChats([newChat, ...chats]);
    setActiveChat(newChatId);
    setMessages([]);
    setIsSidebarOpen(false);
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
  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((c) => c.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
      setMessages([]);
    }
  };

  // Send message (mock for now)
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    // Mock AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: `Thank you for sharing that with me. As your spiritual guide, I'm here to help you explore deeper wisdom and find clarity on your path.\n\nremember:\n- Every journey begins with intention\n- Wisdom comes from within\n- You are exactly where you need to be\n\nHow can I support you further on your spiritual journey?`,
        timestamp: new Date(),
      };

      const newMessages = [...messages, userMessage, aiMessage];
      setMessages(newMessages);
      setIsLoading(false);

      // Update chat with new messages
      if (activeChat) {
        setChats(
          chats.map((chat) =>
            chat.id === activeChat
              ? {
                  ...chat,
                  messages: newMessages,
                  title: messages.length === 0 ? content.slice(0, 30) + '...' : chat.title,
                  preview: content.slice(0, 50) + '...',
                  updatedAt: new Date(),
                }
              : chat
          )
        );
      }
    }, 1500);
  };

  // Copy message
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    // TODO: Add toast notification
  };

  // Regenerate response
  const handleRegenerate = (messageId: string) => {
    // TODO: Implement regeneration
    console.log('Regenerate:', messageId);
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          disabled={!activeChat && messages.length === 0}
        />
      </div>
    </div>
  );
}
