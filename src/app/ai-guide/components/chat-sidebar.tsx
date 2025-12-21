'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Plus, 
  MessageSquare, 
  Trash2, 
  Edit,
  Search,
  ChevronLeft,
  Settings
} from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chats: Chat[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatSidebar({
  isOpen,
  onToggle,
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-80 bg-[#0a0118]/95 backdrop-blur-xl border-r border-white/10
          flex flex-col z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/cosmos"
              className="text-gray-400 hover:text-white transition-colors"
              title="Back to Cosmos"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-lg font-bold text-white">Spiritual Guide</h2>
            <Link
              href="/settings/ai"
              className="text-gray-400 hover:text-white transition-colors"
              title="AI Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          {/* New Chat Button */}
          <Button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">
          {filteredChats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {searchQuery ? 'No conversations found' : 'Start a new conversation'}
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`
                  group relative p-3 mb-2 rounded-lg cursor-pointer transition-all
                  ${
                    activeChat === chat.id
                      ? 'bg-white/10 border border-amber-400/30'
                      : 'hover:bg-white/5'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium truncate">
                      {chat.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate mt-1">
                      {chat.preview}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-500 text-center">
            Powered by Divine Intelligence
          </div>
        </div>
      </div>
    </>
  );
}
