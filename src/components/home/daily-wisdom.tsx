'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { getWisdomByDate, getAllWisdomEntries, WisdomEntry } from '@/lib/admin/wisdom-actions';

export function DailyWisdom() {
  const [wisdom, setWisdom] = useState<WisdomEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [sadhanaCompleted, setSadhanaCompleted] = useState(false);

  useEffect(() => {
    fetchTodayWisdom();
  }, []);

  const fetchTodayWisdom = async () => {
    setLoading(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      let todayWisdom = await getWisdomByDate(todayStr);

      if (!todayWisdom) {
        // Fallback to latest wisdom entry if no specific quote scheduled for today
        const all = await getAllWisdomEntries();
        if (all.length > 0) {
          todayWisdom = all[0];
        }
      }

      setWisdom(todayWisdom);
    } catch (error) {
      console.error('Failed to load daily wisdom:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultQuote = {
    quote: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    author: "Lord Krishna",
    source: "Bhagavad Gita 2.47",
    sadhana: "Reflect on one action today that you will perform with total dedication, offering the outcome to the Divine.",
  };

  const displayQuote = wisdom || defaultQuote;

  return (
    <section className="py-20 border-t border-border/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Daily Wisdom & Sadhana</span>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Quote className="absolute -top-6 -left-2 md:-left-8 w-12 h-12 text-primary/20" />
            
            <p className="font-headline text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
              "{displayQuote.quote}"
            </p>
          </motion.div>

          {/* Source Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
          >
            <span className="font-headline font-bold text-primary">{displayQuote.author || 'Ancient Wisdom'}</span>
            {displayQuote.source && (
              <>
                <span>•</span>
                <span>{displayQuote.source}</span>
              </>
            )}
          </motion.div>

          {/* Daily Sadhana Card */}
          {displayQuote.sadhana && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 rounded-2xl bg-card/60 border border-primary/20 backdrop-blur-sm text-left max-w-2xl mx-auto shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                  <Flame className="w-4 h-4 text-accent animate-pulse" />
                  <span>TODAY'S SADHANA PRACTICE</span>
                </div>
                <button
                  onClick={() => setSadhanaCompleted(!sadhanaCompleted)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all border ${
                    sadhanaCompleted
                      ? 'bg-green-500/20 text-green-500 border-green-500/30 font-bold'
                      : 'bg-muted/30 text-muted-foreground border-border/50 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {sadhanaCompleted ? 'Sadhana Completed!' : 'Mark Completed'}
                </button>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed">
                {displayQuote.sadhana}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
