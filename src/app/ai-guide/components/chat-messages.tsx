'use client';

import React from 'react';
import { Bot, User, ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6"
        >
          <Bot className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          How can I guide you today?
        </h2>
        <p className="text-muted-foreground max-w-md">
          Ask about scriptures, meditation, spiritual practices, or seek guidance for your daily life.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <div className={`
            w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
            ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-accent/10'}
          `}>
            {message.role === 'assistant' ? (
              <Bot className="w-5 h-5 text-primary" />
            ) : (
              <User className="w-5 h-5 text-accent" />
            )}
          </div>

          <div className={`max-w-[80%] space-y-2 ${message.role === 'user' ? 'items-end' : ''}`}>
            <div className={`
              px-4 py-3 rounded-2xl text-sm leading-relaxed
              ${message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/20 border border-border/50 text-foreground'}
            `}>
              {message.content}
            </div>

            {message.role === 'assistant' && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
                <div className="flex-1" />
                <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="bg-muted/20 border border-border/50 rounded-2xl px-6 py-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
