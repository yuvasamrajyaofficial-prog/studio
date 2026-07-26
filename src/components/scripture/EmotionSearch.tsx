'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, BookOpen, Loader2, X } from 'lucide-react';
import { emotionSearchAction } from '@/app/actions';

type SearchResult = {
  title: string;
  tradition: string;
  verse: string;
  verseRef: string;
  reason: string;
  yuga: string;
};

const YUGA_COLORS: Record<string, string> = {
  satya: 'from-yellow-400/20 to-yellow-600/10 border-yellow-400/30 text-yellow-300',
  treta: 'from-slate-300/20 to-slate-400/10 border-slate-300/30 text-slate-200',
  dwapara: 'from-amber-600/20 to-amber-800/10 border-amber-500/30 text-amber-300',
  kali: 'from-violet-700/20 to-violet-900/10 border-violet-500/30 text-violet-300',
};

const PLACEHOLDER_PROMPTS = [
  'I feel lost and don\'t know my purpose...',
  'I\'m overwhelmed with anxiety about the future...',
  'I feel grief I cannot overcome...',
  'I\'m angry at the injustice in the world...',
  'I seek peace in the midst of chaos...',
  'I feel disconnected from something greater...',
  'I\'m afraid of death and impermanence...',
];

export function EmotionSearch() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [emotionSummary, setEmotionSummary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle placeholder text
  useEffect(() => {
    if (isFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFocused]);

  const handleSearch = async () => {
    if (!query.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setResults([]);
    setEmotionSummary('');

    const { error: err, data } = await emotionSearchAction(query);
    if (err || !data) {
      setError(err || 'Something went wrong. Please try again.');
    } else {
      setResults(data.results);
      setEmotionSummary(data.emotionSummary);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setEmotionSummary('');
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Soul-Guided Wisdom Search</span>
        </div>
        <h2 className="text-3xl font-bold font-headline mb-3">
          What are you feeling?
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Describe your emotion, situation, or question. MALOLA will find the perfect wisdom from across 5,000 years of sacred knowledge.
        </p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <div className={`relative flex items-center gap-3 rounded-2xl border transition-all duration-300 bg-card/60 backdrop-blur-md shadow-lg ${
          isFocused ? 'border-primary/60 shadow-primary/10 shadow-xl' : 'border-border/50'
        }`}>
          <Search className="absolute left-5 w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent pl-14 pr-4 py-5 text-base outline-none placeholder:text-muted-foreground/60 font-body"
            placeholder={!isFocused ? PLACEHOLDER_PROMPTS[placeholderIndex] : 'Type your feeling...'}
          />
          <div className="flex items-center gap-2 pr-3">
            {query && (
              <button
                onClick={clearSearch}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={!query.trim() || isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isLoading ? 'Seeking...' : 'Seek Wisdom'}
            </motion.button>
          </div>
        </div>

        {/* Pulsing cosmic glow while loading */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ boxShadow: '0 0 40px rgba(var(--primary), 0.3)' }}
          />
        )}
      </motion.div>

      {/* Loading state */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4 py-12"
          >
            <div className="relative w-20 h-20">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                  animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🌌</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm animate-pulse">
              Searching 5,000 years of wisdom...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center text-sm text-destructive mb-6"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {(results.length > 0 || emotionSummary) && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Emotion acknowledgment */}
            {emotionSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 text-center"
              >
                <div className="text-2xl mb-3">🙏</div>
                <p className="text-foreground/90 italic leading-relaxed font-body">{emotionSummary}</p>
              </motion.div>
            )}

            {/* Scripture result cards */}
            <div className="space-y-4">
              {results.map((result, index) => {
                const yugaStyle = YUGA_COLORS[result.yuga?.toLowerCase()] || YUGA_COLORS.kali;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-sm ${yugaStyle}`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-headline font-bold text-lg text-foreground">{result.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/30 border border-white/10">
                            {result.tradition}
                          </span>
                          <span className="text-xs opacity-70 capitalize">
                            {result.yuga} Yuga
                          </span>
                        </div>
                      </div>
                      <BookOpen className="w-5 h-5 opacity-60 flex-shrink-0 mt-1" />
                    </div>

                    {/* Verse */}
                    <blockquote className="border-l-2 border-current pl-4 mb-4">
                      <p className="text-sm md:text-base italic leading-relaxed font-body">
                        "{result.verse}"
                      </p>
                      <cite className="text-xs opacity-70 mt-2 block">— {result.verseRef}</cite>
                    </blockquote>

                    {/* Reason */}
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      <span className="font-semibold text-foreground/90">Why this? </span>
                      {result.reason}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
