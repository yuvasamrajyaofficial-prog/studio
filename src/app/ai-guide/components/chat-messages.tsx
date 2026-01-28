'use client';

import React, { useRef, useEffect } from 'react';
import { Bot, User, ThumbsUp, ThumbsDown, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
  onCopy?: (content: string) => void;
  onRegenerate?: (messageId: string) => void;
  onFeedback?: (messageId: string, type: 'up' | 'down') => void;
}

export function ChatMessages({ messages, isLoading, onCopy, onRegenerate, onFeedback }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6"
        >
          <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </motion.div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          How can I guide you today?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md px-4">
          Ask about scriptures, meditation, spiritual practices, or seek guidance for your daily life.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex gap-2 sm:gap-3 md:gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          {/* Avatar */}
          <div className={`
            w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0
            ${message.role === 'assistant' ? 'bg-primary/10' : 'bg-accent/10'}
          `}>
            {message.role === 'assistant' ? (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            ) : (
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            )}
          </div>

          {/* Message bubble */}
          <div className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] space-y-2 ${message.role === 'user' ? 'items-end' : ''}`}>
            <div className={`
              px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base leading-relaxed break-words
              ${message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/20 border border-border/50 text-foreground'}
            `}>
              {message.content}
              {message.isStreaming && (
                <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
              )}
            </div>

            {/* Action buttons for assistant messages */}
            {message.role === 'assistant' && !message.isStreaming && (
              <div className="flex flex-wrap gap-1 sm:gap-2 pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onCopy?.(message.content)}
                  className="h-7 sm:h-8 text-xs text-muted-foreground hover:text-foreground px-2 sm:px-3"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onRegenerate?.(message.id)}
                  className="h-7 sm:h-8 text-xs text-muted-foreground hover:text-foreground px-2 sm:px-3"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Regenerate</span>
                </Button>
                <div className="flex-1 min-w-[20px]" />
                <button 
                  onClick={() => onFeedback?.(message.id, 'up')}
                  className="p-1 sm:p-1.5 text-muted-foreground hover:text-primary transition-colors touch-manipulation"
                >
                  <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button 
                  onClick={() => onFeedback?.(message.id, 'down')}
                  className="p-1 sm:p-1.5 text-muted-foreground hover:text-destructive transition-colors touch-manipulation"
                >
                  <ThumbsDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="bg-muted/20 border border-border/50 rounded-2xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
