'use client';

import { motion } from 'framer-motion';
import { UserPlus, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description: 'Sign up in seconds with email or Google. Your spiritual journey begins here.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Generate Soul ID',
    description: 'Discover your unique spiritual profile based on Vedic astrology and psychology.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BookOpen,
    title: 'Explore & Learn',
    description: 'Read ancient scriptures, chat with AI guides, and grow your wisdom.',
    color: 'from-amber-500 to-orange-500',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Begin Your Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Three simple steps to unlock the wisdom of the ages
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10 shadow-lg">
                {index + 1}
              </div>

              {/* Icon Container */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-headline text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-6">
                  <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
