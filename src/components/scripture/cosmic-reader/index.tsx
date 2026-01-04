'use client';

import React, { useState } from 'react';
import { EpubView } from './epub-view';
import { PdfView } from './pdf-view';
import { VerseView, Verse } from './verse-view';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ReaderMode = 'verse' | 'epub' | 'pdf';

interface CosmicReaderProps {
  mode: ReaderMode;
  content: {
    url?: string; // For EPUB/PDF
    verses?: Verse[]; // For Verse mode
    title?: string;
  };
  initialLocation?: string | number;
}

export function CosmicReader({ mode, content, initialLocation }: CosmicReaderProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isParallel, setIsParallel] = useState(true);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className={cn(
      "relative transition-all duration-500",
      isFullScreen ? "fixed inset-0 z-50 bg-[#0a0118] p-4" : "w-full"
    )}>
      {/* Global Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullScreen}
          className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-md"
        >
          {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Reader Content */}
      <div className="h-full">
        {mode === 'epub' && content.url && (
          <EpubView 
            url={content.url} 
            title={content.title}
            initialLocation={initialLocation}
          />
        )}

        {mode === 'pdf' && content.url && (
          <PdfView 
            url={content.url} 
            title={content.title} 
          />
        )}

        {mode === 'verse' && content.verses && (
          <div className="max-w-4xl mx-auto space-y-6 pb-24">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">
                {content.title}
              </h1>
              <p className="text-gray-400">
                Chapter View
              </p>
            </div>
            
            {content.verses.map((verse) => (
              <VerseView 
                key={verse.id} 
                verse={verse} 
                isParallel={isParallel}
                onToggleParallel={() => setIsParallel(!isParallel)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
