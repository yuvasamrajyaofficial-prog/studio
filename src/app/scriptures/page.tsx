'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronRight, Eye, Menu } from 'lucide-react';
import { getScriptures } from '@/lib/scriptures/actions';
import { useAuth } from '@/contexts/auth-context';
import { incrementUserStat } from '@/lib/firebase/firestore';
import { ScriptureReader } from './components/scripture-reader';
import { Scripture } from '@/types/scripture';
import { ScriptureSidebar } from './components/scripture-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function ScripturesPage() {
  const { user } = useAuth();
  const [activeScripture, setActiveScripture] = useState<Scripture | null>(null);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string>('Kali');

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
      incrementUserStat(user.uid, 'scripturesRead');
    }
  };

  // Handle sidebar item click (Mobile & Desktop)
  const handleSidebarSelect = (scriptureName: string) => {
    // Find the scripture that matches the name (or category if it's a category-based selection)
    // For now, we assume the sidebar items map to scripture titles or traditions
    const found = scriptures.find(s => 
      s.title.en.includes(scriptureName) || s.tradition.includes(scriptureName)
    );

    if (found) {
      handleScriptureClick(found);
    } else {
      // If no direct match, we just filter (Desktop behavior) or do nothing (Mobile behavior if we want strict list-to-reader)
      // But user asked: "click all scriptuters...which they want... then users will click all scriptuters...which they want..."
      // implying the sidebar IS the list on mobile.
    }
  };

  const filteredScriptures = scriptures.filter((scripture) => {
    const matchesCategory = selectedCategory 
      ? (scripture.tradition.includes(selectedCategory) || scripture.title.en.includes(selectedCategory))
      : true;
    const matchesEra = true; 
    return matchesCategory && matchesEra;
  });

  if (activeScripture) {
    return (
      <ScriptureReader 
        scripture={activeScripture} 
        onClose={() => setActiveScripture(null)} 
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <main className="flex-1 p-4 md:p-8 lg:p-10 relative overflow-y-auto">

          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12 lg:mb-16 pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <Book className="w-8 h-8 text-amber-400" />
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mb-4"
              >
                Sacred Library
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                Explore the timeless wisdom of ancient texts, curated for the modern seeker.
              </motion.p>
            </div>

            {/* Scriptures Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-80 rounded-xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScriptures.map((scripture, index) => (
                    <motion.div
                      key={scripture.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div onClick={() => handleScriptureClick(scripture)} className="cursor-pointer h-full group">
                        <Card className="h-full bg-[#0f0518] border-white/10 hover:border-amber-500/50 transition-all duration-500 overflow-hidden relative shadow-lg hover:shadow-amber-900/20">
                          
                          {/* Image Container */}
                          <div className="h-56 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent z-10" />
                            <img 
                              src={scripture.coverImage || 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=1000&auto=format&fit=crop'} 
                              alt={scripture.title.en}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 items-end">
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-amber-400 shadow-xl">
                                {scripture.tradition}
                              </span>
                            </div>

                            {/* Quick View Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-[2px]">
                              <Button variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md">
                                <Eye className="w-4 h-4 mr-2" />
                                Read Now
                              </Button>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 relative z-20">
                            <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                              {scripture.title.en}
                            </h3>
                            <p className="text-sm text-amber-500/80 font-medium mb-4 font-serif">
                              {scripture.title.sa}
                            </p>
                            <p className="text-sm text-gray-400 line-clamp-3 mb-6 h-[4.5em]">
                              {scripture.description.en}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                              <span className="flex items-center gap-1.5">
                                <Book className="w-3.5 h-3.5 text-purple-400" />
                                <span className="text-gray-400">{scripture.totalChapters || 0} Chapters</span>
                              </span>
                              <span className="group-hover:translate-x-1 transition-transform duration-300 text-amber-500 flex items-center gap-1 font-medium">
                                Start Reading <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!isLoading && filteredScriptures.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
                  <Book className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No scriptures found</h3>
                  <p className="text-gray-400">Try selecting a different category or era.</p>
                  <Button 
                    variant="link" 
                    className="text-amber-400 mt-4"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedEra('Kali');
                    }}
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
