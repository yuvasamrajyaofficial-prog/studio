'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getScriptures } from '@/lib/scriptures/actions';
import { Scripture } from '@/types/scripture';

export function ScripturesCarousel() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getScriptures();
        setScriptures(data.slice(0, 8)); // Limit to 8
      } catch (error) {
        console.error('Failed to load scriptures:', error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[85vw] md:w-72 h-80 flex-shrink-0 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (scriptures.length === 0) return null;

  return (
    <section className="py-20 border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-2"
            >
              Featured Scriptures
            </motion.h2>
            <p className="text-muted-foreground">Explore the timeless texts of ancient wisdom</p>
          </div>

          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll('left')} className="rounded-full border-border/50 hover:bg-muted/50">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll('right')} className="rounded-full border-border/50 hover:bg-muted/50">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {scriptures.map((scripture, index) => (
            <motion.div
              key={scripture.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 snap-start"
            >
              <Link href={`/scriptures/${scripture.id}`}>
                <Card className="w-[85vw] md:w-72 h-80 overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                  {/* Image */}
                  <div className="h-40 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />
                    <img
                      src={scripture.coverImage || 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=500'}
                      alt={scripture.title.en}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 z-20 px-2 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-xs font-medium text-primary">
                      {scripture.tradition}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-headline text-lg font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {scripture.title.en}
                    </h3>
                    <p className="text-sm text-primary/70 font-headline mb-2">{scripture.title.sa}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{scripture.description.en}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                      <Book className="w-3 h-3" />
                      <span>{scripture.totalChapters || 0} Chapters</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* View All Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 snap-start"
          >
            <Link href="/scriptures">
              <Card className="w-[85vw] md:w-72 h-80 flex flex-col items-center justify-center border-border/50 bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all duration-300 group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
                <span className="font-headline text-lg font-bold text-foreground">View All Scriptures</span>
                <p className="text-sm text-muted-foreground mt-2">Explore the complete library</p>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
