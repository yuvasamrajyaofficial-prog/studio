'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Smile, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="border-t border-border/50 bg-background/80 backdrop-blur-xl p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          <div className="flex gap-1 mb-1">
            <button 
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-muted/20 border border-border/50 rounded-2xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none disabled:opacity-50"
              disabled={isLoading}
            />
            <button 
              className="absolute right-3 bottom-3 p-1 text-muted-foreground hover:text-foreground hover:bg-muted/20 rounded-lg transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <Button 
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="rounded-xl h-[46px] w-[46px] p-0 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline"
            size="icon"
            className="rounded-xl h-[46px] w-[46px] border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/20"
            disabled={isLoading}
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-[10px] text-center text-muted-foreground mt-2">
          Malola AI can provide spiritual guidance but always consult original scriptures for absolute truth.
        </p>
      </div>
    </div>
  );
}
