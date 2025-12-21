'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {  Send, Paperclip, Mic, StopCircle } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || isLoading || disabled) return;
    
    onSend(input);
    setInput('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="border-t border-white/10 bg-[#0a0118]/80 backdrop-blur-xl p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2">
          {/* File upload button */}
          <button
            disabled={disabled || isLoading}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text input */}
          <div className="flex-1 relative">
            <TextareaAutosize
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your spiritual guide..."
              disabled={disabled || isLoading}
              minRows={1}
              maxRows={8}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none disabled:opacity-50"
            />
            
            {/* Character count (optional) */}
            {input.length > 0 && (
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {input.length}
              </div>
            )}
          </div>

          {/* Voice input button */}
          <button
            disabled={disabled || isLoading}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send button */}
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading || disabled}
            className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 disabled:opacity-50"
          >
            {isLoading ? (
              <StopCircle className="w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Helper text */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press <kbd className="px-1 py-0.5 bg-white/10 rounded">Enter</kbd> to send,{' '}
          <kbd className="px-1 py-0.5 bg-white/10 rounded">Shift + Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
}
