'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, Plus, Search, ChevronLeft, 
  Settings, Trash2, Clock, Star 
} from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeChat: string | null;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
}

const MOCK_CHATS = [
  { id: '1', title: 'Understanding Dharma', date: '2 hours ago' },
  { id: '2', title: 'Meditation Techniques', date: 'Yesterday' },
  { id: '3', title: 'Bhagavad Gita Chapter 2', date: '3 days ago' },
  { id: '4', title: 'Ayurvedic Daily Routine', date: '1 week ago' },
];

export function ChatSidebar({ 
  isOpen, 
  onToggle, 
  activeChat, 
  onChatSelect,
  onNewChat 
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-[100dvh]
          w-[85vw] max-w-80 sm:w-80 bg-card/95 backdrop-blur-xl border-r border-border/50
          flex flex-col z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/cosmos"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-lg font-bold text-foreground">Spiritual Guide</h2>
            <Link
              href="/settings/ai"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          {/* New Chat Button */}
          <Button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/20 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`
                  w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left
                  ${
                    activeChat === chat.id
                      ? 'bg-primary/10 border border-primary/30'
                      : 'hover:bg-muted/20'
                  }
                `}
              >
                <MessageSquare className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground text-sm font-medium truncate">
                    {chat.title}
                  </h3>
                  <p className="text-muted-foreground text-xs truncate mt-1">
                    {chat.date}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-primary/5 border border-primary/10">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground">Premium Guide</p>
              <p className="text-[10px] text-muted-foreground">Unlimited insights</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
