'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    
    // Simulate API call - In production, integrate with email service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-20 border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay on the Path
            </h2>
            <p className="text-muted-foreground text-lg">
              Receive daily wisdom, scripture insights, and spiritual guidance directly to your inbox.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                className="bg-background/80 backdrop-blur-sm border-border/50 h-12 pl-4 pr-4"
              />
            </div>
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success' || !email.trim()}
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            We respect your privacy. Unsubscribe anytime.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
