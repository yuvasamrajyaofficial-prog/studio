'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Settings, BookOpen, 
  Highlighter, PenTool, Type, Moon, Sun, 
  Maximize2, Minimize2, X, Save, Share2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Scripture, Chapter, Verse } from '@/types/scripture';
import { MOCK_CHAPTERS, MOCK_VERSES } from '@/lib/scriptures/data';

interface ScriptureReaderProps {
  scripture: Scripture;
  onClose: () => void;
}

export function ScriptureReader({ scripture, onClose }: ScriptureReaderProps) {
  // View State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Settings State
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('dark');
  const [primaryLang, setPrimaryLang] = useState('sa'); // Original
  const [secondaryLang, setSecondaryLang] = useState('en'); // Translation

  // Tools State
  const [activeTool, setActiveTool] = useState<'none' | 'highlight' | 'note'>('none');
  const [highlights, setHighlights] = useState<string[]>([]); // Array of verse IDs

  // Data
  const chapters = MOCK_CHAPTERS.filter(c => c.scriptureId === scripture.id);
  const currentChapter = chapters[currentChapterIndex];
  const verses = MOCK_VERSES.filter(v => v.chapterId === currentChapter?.id);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextChapter();
      if (e.key === 'ArrowLeft') handlePrevChapter();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex]);

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
    }
  };

  const toggleHighlight = (verseId: string) => {
    if (activeTool !== 'highlight') return;
    setHighlights(prev => 
      prev.includes(verseId) 
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-[#0a0118] text-white transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#f5f5f5] text-gray-900' : 
      theme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636]' : ''
    }`}>
      
      {/* Top Toolbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: showControls ? 0 : -100 }}
        className={`h-16 border-b flex items-center justify-between px-4 backdrop-blur-md z-50 ${
          theme === 'dark' ? 'bg-[#0f0518]/90 border-white/10' : 
          theme === 'light' ? 'bg-white/90 border-gray-200' : 
          'bg-[#eaddcf]/90 border-[#d3c4b1]'
        }`}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-serif font-bold text-lg">{scripture.title.en}</h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Chapter {currentChapter?.number}: {currentChapter?.title.en}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsTwoPageView(!isTwoPageView)}
            className="hidden md:flex gap-2"
          >
            <BookOpen className="w-4 h-4" />
            {isTwoPageView ? '2-Page' : '1-Page'}
          </Button>

          {/* Tools */}
          <div className={`h-8 w-px mx-2 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'}`} />
          
          <Button 
            variant={activeTool === 'highlight' ? 'secondary' : 'ghost'} 
            size="icon"
            onClick={() => setActiveTool(activeTool === 'highlight' ? 'none' : 'highlight')}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </Button>
          
          <Button 
            variant={activeTool === 'note' ? 'secondary' : 'ghost'} 
            size="icon"
            onClick={() => setActiveTool(activeTool === 'note' ? 'none' : 'note')}
            title="Add Note"
          >
            <PenTool className="w-4 h-4" />
          </Button>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4 bg-[#1a0a2e] border-white/10 text-white">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Type className="w-3 h-3" />
                    <Slider 
                      value={[fontSize]} 
                      onValueChange={([v]) => setFontSize(v)} 
                      min={12} 
                      max={32} 
                      step={1}
                      className="flex-1"
                    />
                    <Type className="w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`h-8 rounded border ${theme === 'light' ? 'ring-2 ring-amber-500' : 'border-white/10'} bg-white`}
                    />
                    <button 
                      onClick={() => setTheme('sepia')}
                      className={`h-8 rounded border ${theme === 'sepia' ? 'ring-2 ring-amber-500' : 'border-white/10'} bg-[#f4ecd8]`}
                    />
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`h-8 rounded border ${theme === 'dark' ? 'ring-2 ring-amber-500' : 'border-white/10'} bg-[#0a0118]`}
                    />
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative flex">
        {/* Left Page (Previous Chapter Preview - Optional or just navigation) */}
        <Button 
          variant="ghost" 
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 h-24 w-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm hidden md:flex items-center justify-center"
          onClick={handlePrevChapter}
          disabled={currentChapterIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Reading Canvas */}
        <ScrollArea className="flex-1 h-full">
          <div className={`max-w-5xl mx-auto p-8 md:p-16 min-h-full transition-all duration-500 ${
            isTwoPageView ? 'columns-1 md:columns-2 gap-12' : 'max-w-3xl'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapterIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-12 break-inside-avoid">
                  <h2 className="text-3xl font-serif font-bold mb-2 text-amber-500">
                    Chapter {currentChapter?.number}
                  </h2>
                  <h3 className={`text-xl font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentChapter?.title.en}
                  </h3>
                  <div className="w-16 h-1 bg-amber-500/30 mx-auto rounded-full" />
                </div>

                <div className="space-y-8">
                  {verses.map((verse) => (
                    <div 
                      key={verse.id} 
                      className={`relative group p-4 rounded-lg transition-colors break-inside-avoid ${
                        highlights.includes(verse.id) 
                          ? (theme === 'dark' ? 'bg-amber-500/20' : 'bg-yellow-200/50') 
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => toggleHighlight(verse.id)}
                    >
                      {/* Verse Number */}
                      <span className="absolute -left-2 top-4 text-xs font-mono text-gray-500 opacity-0 group-hover:opacity-100">
                        {verse.number}
                      </span>

                      {/* Original Text */}
                      <p 
                        className="font-serif text-center mb-4 leading-relaxed"
                        style={{ fontSize: `${fontSize + 4}px` }}
                      >
                        {verse.text.original}
                      </p>

                      {/* Transliteration */}
                      {verse.text.transliteration && (
                        <p className="text-center text-sm text-gray-500 mb-4 italic font-serif">
                          {verse.text.transliteration}
                        </p>
                      )}

                      {/* Translation */}
                      <p 
                        className={`leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {verse.translations[secondaryLang] || verse.translations['en']}
                      </p>

                      {/* Action Menu (Hover) */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6">
                          <Save className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Right Page Navigation */}
        <Button 
          variant="ghost" 
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 h-24 w-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm hidden md:flex items-center justify-center"
          onClick={handleNextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`h-12 border-t flex items-center justify-between px-6 text-xs ${
        theme === 'dark' ? 'bg-[#0f0518] border-white/10 text-gray-400' : 
        theme === 'light' ? 'bg-white border-gray-200 text-gray-500' : 
        'bg-[#eaddcf] border-[#d3c4b1] text-[#5b4636]'
      }`}>
        <span>{currentChapterIndex + 1} of {chapters.length} Chapters</span>
        <div className="flex-1 mx-8 max-w-md">
          <Slider 
            value={[((currentChapterIndex + 1) / chapters.length) * 100]} 
            max={100} 
            step={1}
            disabled
            className="cursor-default"
          />
        </div>
        <span>{Math.round(((currentChapterIndex + 1) / chapters.length) * 100)}% Completed</span>
      </div>
    </div>
  );
}
