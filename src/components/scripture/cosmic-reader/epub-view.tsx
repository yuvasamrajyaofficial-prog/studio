'use client';

import React, { useState, useRef } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import { useTheme } from 'next-themes';
import { Loader2, ChevronLeft, ChevronRight, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface EpubViewProps {
  url: string;
  title?: string;
  initialLocation?: string | number;
  onLocationChange?: (location: string | number) => void;
}

export function EpubView({ url, title, initialLocation, onLocationChange }: EpubViewProps) {
  const [location, setLocation] = useState<string | number | undefined>(initialLocation);
  const [toc, setToc] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const renditionRef = useRef<any>(null);
  const { theme } = useTheme();

  const locationChanged = (epubcifi: string | number) => {
    setLocation(epubcifi);
    if (onLocationChange) {
      onLocationChange(epubcifi);
    }
  };

  // Custom Cosmic Theme for React Reader
  const cosmicReaderStyles = {
    ...ReactReaderStyle,
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: 'transparent',
      transition: 'undefined',
    },
    titleArea: {
      ...ReactReaderStyle.titleArea,
      color: '#fff',
    },
    tocArea: {
      ...ReactReaderStyle.tocArea,
      background: '#111',
    },
    tocButtonExpanded: {
      ...ReactReaderStyle.tocButtonExpanded,
      background: '#222',
    },
    tocButtonBar: {
      ...ReactReaderStyle.tocButtonBar,
      background: '#fff',
    },
    tocButton: {
      ...ReactReaderStyle.tocButton,
      color: 'white',
    },
    arrow: {
      ...ReactReaderStyle.arrow,
      color: 'white',
    },
  };

  return (
    <div className="h-[80vh] relative flex flex-col bg-[#0a0118]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">{title || 'Scripture Reader'}</h3>
            <p className="text-xs text-gray-400">EPUB Format</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* TOC Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#0f0518] border-white/10 text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Table of Contents</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2 max-h-[80vh] overflow-y-auto">
                {toc.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (renditionRef.current) {
                        renditionRef.current.display(item.href);
                      }
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Reader Area */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0a0118]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <p className="text-sm text-gray-400">Loading Scripture...</p>
            </div>
          </div>
        )}
        
        <ReactReader
          url={url}
          title={title}
          location={location}
          locationChanged={locationChanged}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            setIsLoading(false);
            
            // Inject custom CSS into the iframe
            rendition.themes.register('cosmic', {
              body: { 
                color: '#e2e8f0', 
                background: 'transparent',
                'font-family': 'Inter, sans-serif',
                'line-height': '1.8'
              },
              p: {
                'font-size': '18px',
                'margin-bottom': '1.5em'
              },
              h1: { color: '#a855f7' },
              h2: { color: '#c084fc' },
              a: { color: '#60a5fa' }
            });
            rendition.themes.select('cosmic');
          }}
          tocChanged={(toc) => setToc(toc)}
          styles={cosmicReaderStyles}
        />
      </div>
    </div>
  );
}
