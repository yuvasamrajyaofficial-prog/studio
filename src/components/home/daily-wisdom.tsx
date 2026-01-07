'use client';

import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

// Mock data - In production, this would fetch from Firestore
const DAILY_QUOTE = {
  text: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
  translation: "Perform your duties established in yoga, renouncing attachment, O Arjuna. Be balanced in success and failure, for such equanimity is called yoga.",
  source: "Bhagavad Gita",
  chapter: "Chapter 2",
  verse: "Verse 48",
};

export function DailyWisdom() {
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
            <span className="text-sm font-medium text-primary">Daily Wisdom</span>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Quote className="absolute -top-4 -left-2 md:-left-8 w-12 h-12 text-primary/20" />
            
            <p className="font-headline text-xl md:text-2xl text-primary/90 mb-6 leading-relaxed">
              {DAILY_QUOTE.text}
            </p>
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
              "{DAILY_QUOTE.translation}"
            </p>
          </motion.div>

          {/* Source Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-muted-foreground"
          >
            <span className="font-headline font-bold text-foreground">{DAILY_QUOTE.source}</span>
            <span>•</span>
            <span>{DAILY_QUOTE.chapter}</span>
            <span>•</span>
            <span>{DAILY_QUOTE.verse}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
