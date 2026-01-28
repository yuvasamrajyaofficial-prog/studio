'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatMessages } from './components/chat-messages';
import { ChatInput } from './components/chat-input';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  loadUserChats, 
  createChat, 
  saveMessage, 
  updateChatTitle, 
  deleteChat as deleteFirestoreChat,
  getChat
} from '@/lib/ai/chat-storage';
import { generateAIResponse, AIMessage } from '@/lib/ai/client';
import { useToast } from '@/hooks/use-toast';
import { buildSpiritualContext } from '@/lib/ai/spiritual-context';
import { getUserProfile } from '@/lib/firebase/firestore';

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
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  
  // Ref to keep track of current message for streaming
  const currentMessageRef = useRef('');

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
    if (user && chats.length === 0 && !activeChat && !isLoading) {
      // Check if we've already tried to load chats
      const checkAndCreate = async () => {
        const loadedChats = await loadUserChats(user.uid);
        if (loadedChats.length === 0) {
          handleNewChat();
        }
      };
      checkAndCreate();
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
  const handleSelectChat = async (chatId: string) => {
    if (!user) return;
    
    try {
      // Optimistic update from list
      const chatFromList = chats.find((c) => c.id === chatId);
      if (chatFromList) {
        setActiveChat(chatId);
        setMessages(chatFromList.messages || []);
      }
      
      // Fetch full details (ensure latest messages)
      const fullChat = await getChat(user.uid, chatId);
      if (fullChat) {
        setMessages(fullChat.messages || []);
      }
      
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Failed to load chat details:', error);
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

  // Send message
  const handleSendMessage = async (content: string) => {
    if (!user || !activeChat || !content.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Update UI immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setInput('');

    try {
      // Save user message to Firestore
      await saveMessage(user.uid, activeChat, userMessage as any);

      // Prepare for AI response
      const assistantMessageId = `msg_${Date.now() + 1}`;
      let fullResponse = '';
      
      // Add placeholder assistant message
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      // Get user profile for context
      const userProfile = await getUserProfile(user.uid);
      const systemPrompt = buildSpiritualContext(userProfile);

      // Prepare messages for AI (include system prompt)
      const aiMessages: AIMessage[] = [
        { role: 'system', content: systemPrompt },
        ...newMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }))
      ];

      // Stream response
      await generateAIResponse(user.uid, aiMessages, {
        onToken: (token) => {
          fullResponse += token;
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: fullResponse }
              : m
          ));
        },
        onComplete: async () => {
          setIsLoading(false);
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, isStreaming: false }
              : m
          ));

          // Save assistant message to Firestore
          await saveMessage(user.uid, activeChat, {
            id: assistantMessageId,
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date(),
          });

          // Update chat title if it's the first message
          if (messages.length === 0) {
            await updateChatTitle(
              user.uid,
              activeChat,
              content.slice(0, 50) + (content.length > 50 ? '...' : ''),
              content.slice(0, 100) + (content.length > 100 ? '...' : '')
            );
            loadChats(); // Refresh list
          }
        },
        onError: (error) => {
          setIsLoading(false);
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
      });

    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to send message',
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
    // Find the message index
    const index = messages.findIndex(m => m.id === messageId);
    if (index === -1) return;

    // If it's a user message, we want to regenerate the response TO this message
    // If it's an assistant message, we want to regenerate THIS message
    
    // For simplicity in this version, we'll just take the last user message and resend it
    // A more robust implementation would slice the history
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  // Message feedback
  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    // TODO: Save feedback to Firestore
    console.log('Feedback:', messageId, type);
    toast({
      title: 'Feedback Received',
      description: `You voted ${type} on this message.`,
    });
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="h-[100dvh] flex bg-background overflow-hidden">
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
      <div className="flex-1 flex flex-col h-[100dvh]">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-border/50 bg-card/80 backdrop-blur-xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">AI Spiritual Guide</h1>
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
          onSend={(content) => {
            if (content) {
              handleSendMessage(content);
            } else if (input.trim()) {
              handleSendMessage(input);
            }
          }}
          isLoading={isLoading}
          disabled={!activeChat}
        />
      </div>
    </div>
  );
}
