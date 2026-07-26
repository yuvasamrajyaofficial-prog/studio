'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Settings, BookOpen, 
  Highlighter, PenTool, Type, Moon, Sun, 
  Maximize2, Minimize2, X, Save, Share2, Loader2,
  Volume2, VolumeX, Pause, Play, StopCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Scripture, Chapter, Verse } from '@/types/schema';
import { getChapters, getVerses } from '@/lib/admin/actions';
import { generateVerseAudioAction } from '@/app/actions';

interface ScriptureReaderProps {
  scripture: Scripture;
  onClose: () => void;
}

// Waveform animation component shown during audio load/play
function AudioWaveform({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-amber-400 rounded-full"
          animate={isActive ? {
            height: ['4px', `${8 + Math.random() * 12}px`, '4px'],
          } : { height: '4px' }}
          transition={isActive ? {
            duration: 0.4 + i * 0.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.08,
          } : {}}
        />
      ))}
    </div>
  );
}

// Per-verse audio narration button
function VerseAudioButton({ verseText }: { verseText: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle');
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    if (state === 'playing') {
      audioRef.current?.pause();
      setState('paused');
      return;
    }
    if (state === 'paused' && audioRef.current) {
      audioRef.current.play();
      setState('playing');
      return;
    }

    // New request
    setState('loading');
    setError(null);

    const { error: err, audio } = await generateVerseAudioAction(verseText);
    if (err || !audio) {
      setError(err || 'Audio unavailable');
      setState('idle');
      return;
    }

    const audioEl = new Audio(audio);
    audioRef.current = audioEl;
    audioEl.onended = () => setState('idle');
    audioEl.onerror = () => { setError('Playback error'); setState('idle'); };
    await audioEl.play();
    setState('playing');
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setState('idle');
    setError(null);
  };

  return (
    <div className="flex items-center gap-1.5">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handlePlay}
        disabled={state === 'loading'}
        title={state === 'playing' ? 'Pause narration' : 'Listen to verse'}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
          state === 'playing' || state === 'paused'
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            : 'bg-muted/40 text-muted-foreground hover:bg-amber-500/10 hover:text-amber-400'
        }`}
      >
        {state === 'loading' && <Loader2 className="w-3 h-3 animate-spin" />}
        {state === 'idle' && <Volume2 className="w-3 h-3" />}
        {state === 'playing' && (
          <>
            <Pause className="w-3 h-3" />
            <AudioWaveform isActive={true} />
          </>
        )}
        {state === 'paused' && <Play className="w-3 h-3" />}
        <span className="hidden sm:inline">
          {state === 'loading' ? 'Loading...' : state === 'playing' ? 'Pause' : state === 'paused' ? 'Resume' : 'Listen'}
        </span>
      </motion.button>

      {(state === 'playing' || state === 'paused') && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleStop}
          className="p-1.5 rounded-lg bg-muted/40 text-muted-foreground hover:text-destructive transition-colors"
        >
          <StopCircle className="w-3 h-3" />
        </motion.button>
      )}

      {error && (
        <span className="text-[10px] text-destructive/70">{error}</span>
      )}
    </div>
  );
}

export function ScriptureReader({ scripture, onClose }: ScriptureReaderProps) {
  // View State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Data State
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [loadingVerses, setLoadingVerses] = useState(false);

  // Settings State
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('dark');
  const [secondaryLang, setSecondaryLang] = useState('en');

  // Tools State
  const [activeTool, setActiveTool] = useState<'none' | 'highlight' | 'note'>('none');
  const [highlights, setHighlights] = useState<string[]>([]);

  // Fetch Chapters
  useEffect(() => {
    const loadChapters = async () => {
      if (!scripture.id) return;
      setLoadingChapters(true);
      try {
        const data = await getChapters(scripture.id);
        setChapters(data as unknown as Chapter[]);
      } catch (error) {
        console.error('Failed to load chapters:', error);
      } finally {
        setLoadingChapters(false);
      }
    };
    loadChapters();
  }, [scripture.id]);

  // Fetch Verses when Chapter changes
  useEffect(() => {
    const loadVerses = async () => {
      const currentChapter = chapters[currentChapterIndex];
      if (!currentChapter?.id) return;
      setLoadingVerses(true);
      try {
        const data = await getVerses(currentChapter.id);
        setVerses(data as unknown as Verse[]);
      } catch (error) {
        console.error('Failed to load verses:', error);
      } finally {
        setLoadingVerses(false);
      }
    };
    if (chapters.length > 0) loadVerses();
  }, [currentChapterIndex, chapters]);

  const currentChapter = chapters[currentChapterIndex];

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextChapter();
      if (e.key === 'ArrowLeft') handlePrevChapter();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIndex, chapters.length]);

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) scrollArea.scrollTop = 0;
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) scrollArea.scrollTop = 0;
    }
  };

  const toggleHighlight = (verseId: string) => {
    if (activeTool !== 'highlight') return;
    setHighlights(prev =>
      prev.includes(verseId) ? prev.filter(id => id !== verseId) : [...prev, verseId]
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-300 ${
      theme === 'sepia' ? 'bg-[#f4ecd8] text-[#433422]' :
      theme === 'light' ? 'bg-white text-gray-900' :
      'bg-[#0a0118] text-gray-100'
    }`}>

      {/* Top Toolbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: showControls ? 0 : -100 }}
        className={`h-16 border-b flex items-center justify-between px-4 backdrop-blur-md z-50 flex-shrink-0 ${
          theme === 'sepia' ? 'bg-[#f4ecd8]/90 border-[#433422]/20' :
          theme === 'light' ? 'bg-white/90 border-gray-200' :
          'bg-[#0a0118]/90 border-white/10'
        }`}
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-serif font-bold text-lg hidden md:block">{scripture.title.en}</h1>
            {!loadingChapters && (
              <p className="text-xs opacity-70">
                Chapter {currentChapter?.number}: {currentChapter?.title.en}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsTwoPageView(!isTwoPageView)}
            className="hidden md:flex gap-2"
          >
            <BookOpen className="w-4 h-4" />
            {isTwoPageView ? '2-Page' : '1-Page'}
          </Button>

          <div className="h-8 w-px mx-2 bg-border/50" />

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Type className="w-3 h-3" />
                    <Slider
                      value={[fontSize]}
                      onValueChange={([v]) => setFontSize(v)}
                      min={12} max={32} step={1}
                      className="flex-1"
                    />
                    <Type className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['light', 'sepia', 'dark'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`h-8 rounded border ${theme === t ? 'ring-2 ring-primary' : 'border-border/50'} ${
                          t === 'light' ? 'bg-white' : t === 'sepia' ? 'bg-[#f4ecd8]' : 'bg-[#0a0118]'
                        }`}
                      />
                    ))}
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
      <div className="flex-1 overflow-hidden relative flex min-h-0">
        {/* Loading overlay */}
        {(loadingChapters || loadingVerses) && (
          <div className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Left Chapter Navigation */}
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 h-24 w-12 rounded-full bg-muted/20 hover:bg-muted/40 backdrop-blur-sm hidden md:flex items-center justify-center p-0"
          onClick={handlePrevChapter}
          disabled={currentChapterIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Reading Canvas */}
        <ScrollArea className="flex-1 h-full">
          <div className={`max-w-5xl mx-auto p-4 md:p-16 min-h-full transition-all duration-500 ${
            isTwoPageView ? 'columns-1 md:columns-2 gap-12' : 'max-w-3xl'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapterIndex}
                initial={{ opacity: 0, rotateY: -5, x: 40 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 5, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ transformOrigin: 'left center' }}
              >
                {!loadingChapters && currentChapter && (
                  <div className="text-center mb-12 break-inside-avoid">
                    <h2 className="text-3xl font-serif font-bold mb-2 text-amber-500">
                      Chapter {currentChapter.number}
                    </h2>
                    <h3 className="text-xl font-medium mb-4 opacity-80">
                      {currentChapter.title.en}
                    </h3>
                    <div className="w-16 h-1 bg-amber-500/30 mx-auto rounded-full" />
                  </div>
                )}

                {!loadingVerses && verses.length > 0 ? (
                  <div className="space-y-8 pb-32">
                    {verses.map((verse) => {
                      const verseText = verse.content?.en || verse.content?.sa || '';
                      return (
                        <motion.div
                          key={verse.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`relative group p-4 rounded-lg transition-colors break-inside-avoid ${
                            verse.id && highlights.includes(verse.id)
                              ? (theme === 'dark' ? 'bg-amber-500/20' : 'bg-yellow-200/50')
                              : 'hover:bg-accent/5'
                          }`}
                          onClick={() => verse.id && toggleHighlight(verse.id)}
                        >
                          {/* Verse Number */}
                          <span className="absolute -left-2 top-4 text-xs font-mono opacity-0 group-hover:opacity-100 text-muted-foreground">
                            {verse.number}
                          </span>

                          {/* Original Sanskrit Text */}
                          <p
                            className="font-serif text-center mb-4 leading-relaxed"
                            style={{ fontSize: `${fontSize + 4}px` }}
                          >
                            {verse.content.sa}
                          </p>

                          {/* Transliteration */}
                          {verse.transliteration && (
                            <p className="text-center text-sm opacity-70 mb-4 italic font-serif">
                              {verse.transliteration}
                            </p>
                          )}

                          {/* Translation */}
                          <p
                            className="leading-relaxed opacity-90 mb-4"
                            style={{ fontSize: `${fontSize}px` }}
                          >
                            {verse.content?.[secondaryLang as keyof typeof verse.content] || verse.content?.['en']}
                          </p>

                          {/* Action row */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* Audio narration */}
                            <VerseAudioButton verseText={verseText} />

                            {/* Other tools */}
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                                <Share2 className="w-3 h-3" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                                <Save className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  !loadingVerses && (
                    <div className="text-center py-20 opacity-50">
                      <p>No verses found for this chapter.</p>
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Right Chapter Navigation */}
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 h-24 w-12 rounded-full bg-muted/20 hover:bg-muted/40 backdrop-blur-sm hidden md:flex items-center justify-center p-0"
          onClick={handleNextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`h-12 border-t flex items-center justify-between px-6 text-xs flex-shrink-0 ${
        theme === 'sepia' ? 'bg-[#f4ecd8] border-[#433422]/20' :
        theme === 'light' ? 'bg-white border-gray-200' :
        'bg-[#0a0118] border-white/10'
      }`}>
        <span>{currentChapterIndex + 1} of {chapters.length} Chapters</span>
        <div className="flex-1 mx-8 max-w-md">
          <Slider
            value={[chapters.length > 0 ? ((currentChapterIndex + 1) / chapters.length) * 100 : 0]}
            max={100} step={1} disabled
            className="cursor-default"
          />
        </div>
        <span>{chapters.length > 0 ? Math.round(((currentChapterIndex + 1) / chapters.length) * 100) : 0}% Completed</span>
      </div>
    </div>
  );
}
