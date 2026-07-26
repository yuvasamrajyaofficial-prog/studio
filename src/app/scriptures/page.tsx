'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronRight, Eye } from 'lucide-react';
import { getScriptures } from '@/lib/scriptures/actions';
import { useAuth } from '@/contexts/auth-context';
import { incrementUserStat } from '@/lib/firebase/firestore';
import { ScriptureReader } from './components/scripture-reader';
import { Scripture } from '@/types/scripture';
import { KalacakraWheel3D } from '@/components/cosmic/kalacakra-wheel-3d';
import { YugaTimeline } from '@/components/cosmic/yuga-timeline';
import { EmotionSearch } from '@/components/scripture/EmotionSearch';

export default function ScripturesPage() {
  const { user } = useAuth();
  const [activeScripture, setActiveScripture] = useState<Scripture | null>(null);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string>('kali');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadScriptures() {
      try {
        const data = await getScriptures();
        setScriptures(data);
      } catch (error) {
        console.error('Failed to load scriptures:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadScriptures();
  }, []);

  const handleScriptureClick = (scripture: Scripture) => {
    setActiveScripture(scripture);
    if (user) {
      incrementUserStat(user.uid, 'scripturesRead' as any);
    }
  };

  const handleEraSelect = (eraId: string) => {
    setSelectedEra(eraId);
    // Smooth scroll to grid after a slight delay to allow expansion animation
    setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  const filteredScriptures = scriptures.filter((scripture) => {
    const matchesCategory = selectedCategory
      ? (scripture.tradition?.includes(selectedCategory) || scripture.title.en.includes(selectedCategory))
      : true;
    const scriptureEraStr = scripture.yuga?.toLowerCase() || '';
    const matchesEra = selectedEra === 'all' || scriptureEraStr.includes(selectedEra);
    return matchesCategory && matchesEra;
  });

  if (activeScripture) {
    return (
      <ScriptureReader
        scripture={activeScripture as any}
        onClose={() => setActiveScripture(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <main className="flex-1 p-4 md:p-8 lg:p-10 relative overflow-y-auto overflow-x-hidden">

        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 w-full mx-auto">

          {/* ── Header + Interactive Cosmic Wheel ── */}
          <div className="text-center mb-12 lg:mb-16 pt-8 lg:pt-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4"
            >
              Cosmic Scriptures
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg font-body mb-8"
            >
              Explore the timeless wisdom of ancient texts across the four cosmic ages (Yugas).
            </motion.p>

            {/* Interactive 3D Wheel — clicking a ring selects the era */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full flex justify-center my-12"
            >
              <KalacakraWheel3D
                activeEra={selectedEra}
                onSelectEra={handleEraSelect}
              />
            </motion.div>
          </div>

          {/* ── Era Timeline Slider ── */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-headline">Journey Through Time</h2>
              <p className="text-muted-foreground mt-2">Select an era to explore its sacred wisdom.</p>
            </div>
            <YugaTimeline selectedEra={selectedEra} onSelectEra={handleEraSelect} />
          </div>

          {/* ── Emotion-Based AI Search ── */}
          <div className="mb-8">
            <EmotionSearch />
          </div>

          {/* ── Scriptures Grid ── */}
          <div className="flex-1 max-w-7xl mx-auto" ref={gridRef}>
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <h3 className="text-2xl font-bold">
                {selectedEra === 'kali' ? '⚔️ Kaliyuga Texts' :
                 selectedEra === 'dvapara' || selectedEra === 'dwapara' ? '⚖️ Dvapara Texts' :
                 selectedEra === 'treta' ? '🔥 Treta Texts' :
                 selectedEra === 'satya' ? '✨ Satya Texts' :
                 '📚 All Scriptures'}
              </h3>
              <Button variant="outline" size="sm" onClick={() => setSelectedEra('all')}>
                Show All Eras
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredScriptures.map((scripture) => (
                    <motion.div
                      key={scripture.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div onClick={() => handleScriptureClick(scripture)} className="cursor-pointer h-full group">
                        <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden relative shadow-lg hover:shadow-primary/5">

                          {/* Image */}
                          <div className="h-56 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                            <img
                              src={scripture.coverImage || 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1000&auto=format&fit=crop'}
                              alt={scripture.title.en}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-3 right-3 z-20">
                              <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-xs font-medium text-primary shadow-xl">
                                {scripture.tradition}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                              <Button variant="secondary" className="rounded-full bg-background/80 hover:bg-background text-foreground border border-border/50 backdrop-blur-md">
                                <Eye className="w-4 h-4 mr-2" />
                                Read Now
                              </Button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 relative z-20">
                            <h3 className="text-xl font-headline font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                              {scripture.title.en}
                            </h3>
                            <p className="text-sm text-primary/80 font-medium mb-4 font-headline">
                              {scripture.title.sa}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-6 h-[4.5em] font-body">
                              {scripture.description.en}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4 font-body">
                              <span className="flex items-center gap-1.5">
                                <Book className="w-3.5 h-3.5 text-accent" />
                                <span>{scripture.totalChapters || 0} Chapters</span>
                              </span>
                              <span className="group-hover:translate-x-1 transition-transform duration-300 text-primary flex items-center gap-1 font-medium">
                                Start Reading <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!isLoading && filteredScriptures.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-xl border border-border/50">
                <Book className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">No scriptures found</h3>
                <p className="text-muted-foreground">Try selecting a different category or era.</p>
                <Button
                  variant="link"
                  className="text-primary mt-4"
                  onClick={() => { setSelectedCategory(null); setSelectedEra('kali'); }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
