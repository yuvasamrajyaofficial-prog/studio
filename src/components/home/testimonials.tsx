'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, Users, BookOpen, MessageCircle } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Seekers Joined' },
  { icon: BookOpen, value: '500+', label: 'Scriptures Available' },
  { icon: MessageCircle, value: '50,000+', label: 'AI Conversations' },
];

const testimonials = [
  {
    quote: "MALOLA has transformed my understanding of the Bhagavad Gita. The AI explanations are incredibly insightful.",
    author: "Ananya S.",
    role: "Spiritual Seeker",
    avatar: "A",
  },
  {
    quote: "Finally, a platform that respects the depth of our scriptures while making them accessible to everyone.",
    author: "Rajesh K.",
    role: "Philosophy Student",
    avatar: "R",
  },
  {
    quote: "The Soul ID feature gave me profound insights into my spiritual journey. Truly a unique experience.",
    author: "Priya M.",
    role: "Meditation Practitioner",
    avatar: "P",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-card/30 border-t border-border/50">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Loved by Seekers Worldwide
          </motion.h2>
          <div className="flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="ml-2 text-muted-foreground">4.9 out of 5</span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
