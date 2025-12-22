'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Book, ChevronRight, Star, Filter } from 'lucide-react';
import { MOCK_SCRIPTURES } from '@/lib/scriptures/data';
import Link from 'next/link';



export default function ScripturesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScriptures = MOCK_SCRIPTURES.filter((scripture) => {
    const matchesSearch =
      scripture.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scripture.description.en.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0118] text-white font-sans selection:bg-amber-500/30">
      
      <div className="flex h-[calc(100vh-64px)]">


        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
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
                Begin Your Cosmic Journey
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-lg"
              >
                Select a sacred text from the library to unlock ancient wisdom and explore the depths of consciousness.
              </motion.p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12 relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-600/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    type="text"
                    placeholder="Search for scriptures, authors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-[#0f0518]/80 border-white/10 rounded-full text-white placeholder:text-gray-500 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Scriptures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScriptures.map((scripture, index) => (
                <motion.div
                  key={scripture.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link href={`/scriptures/${scripture.slug}`}>
                    <Card className="h-full bg-white/5 border-white/10 hover:border-amber-500/30 hover:bg-white/10 transition-all duration-300 group overflow-hidden relative">
                      {/* Image Overlay */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] to-transparent z-10" />
                        <img 
                          src={scripture.coverImage} 
                          alt={scripture.title.en}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-amber-400">
                            {scripture.tradition}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 relative z-20 -mt-12">
                        <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {scripture.title.en}
                        </h3>
                        <p className="text-sm text-amber-400/80 font-medium mb-3 font-serif">
                          {scripture.title.sa}
                        </p>
                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                          {scripture.description.en}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                          <span className="flex items-center gap-1">
                            <Book className="w-3 h-3" />
                            {scripture.totalChapters} Chapters
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300 text-amber-500 flex items-center gap-1">
                            Read Now <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {filteredScriptures.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400">No scriptures found matching your search.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
