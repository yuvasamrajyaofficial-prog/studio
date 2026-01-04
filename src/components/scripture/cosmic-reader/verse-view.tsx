'use client';

import React, { useState } from 'react';
import { Play, Pause, Share2, Bookmark, Type, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Verse {
  id: string;
  number: number;
  text: {
    original: string; // Sanskrit
    transliteration?: string;
  };
  translations: {
    en: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  commentary?: string;
}

interface VerseViewProps {
  verse: Verse;
  isParallel?: boolean;
  onToggleParallel?: () => void;
}

export function VerseView({ verse, isParallel = true, onToggleParallel }: VerseViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  const fontSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const sanskritSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="group relative bg-[#0a0118]/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300">
      {/* Header / Controls */}
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-amber-500 px-2 py-1 bg-amber-500/10 rounded">
            Verse {verse.number}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={onToggleParallel}
          >
            <Languages className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => setFontSize(s => s === 'sm' ? 'md' : s === 'md' ? 'lg' : 'sm')}
          >
            <Type className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className={cn(
        "grid gap-6 p-6",
        isParallel ? "md:grid-cols-2" : "grid-cols-1"
      )}>
        {/* Original Text (Sanskrit) */}
        <div className="space-y-4 text-center md:text-left flex flex-col justify-center">
          <p className={cn(
            "font-serif text-amber-100 leading-relaxed",
            sanskritSizes[fontSize]
          )}>
            {verse.text.original}
          </p>
          {verse.text.transliteration && (
            <p className="text-gray-400 italic font-light">
              {verse.text.transliteration}
            </p>
          )}
        </div>

        {/* Translation */}
        <div className={cn(
          "space-y-4 flex flex-col justify-center",
          isParallel && "md:border-l md:border-white/10 md:pl-6"
        )}>
          <p className={cn(
            "text-gray-200 leading-relaxed",
            fontSizes[fontSize]
          )}>
            {verse.translations.en}
          </p>
          {verse.translations.hi && (
            <p className="text-gray-400 text-lg font-hindi">
              {verse.translations.hi}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
