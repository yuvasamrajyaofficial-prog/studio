'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { useAuth } from '@/contexts/auth-context';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    try {
      await resetPassword(values.email);
      setEmailSent(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <SudharshanaChakraIcon className="h-10 w-10 text-amber-400" />
            <span className="font-serif text-3xl font-bold text-amber-400 tracking-wide">MALOLA</span>
          </Link>
          <h1 
            className="text-4xl font-bold text-foreground mb-2"
          >
            Reset Password
          </h1>
          <p 
            className="text-muted-foreground"
          >
            Enter your email to receive a password reset link
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-8 rounded-3xl">
            {emailSent ? (
              <motion.div 
                className="text-center py-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Email Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Check your inbox for password reset instructions.
                </p>
                <Button asChild className="bg-gradient-to-r from-primary to-accent">
                  <Link href="/login">Return to Login</Link>
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">Email Address</FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-muted/20 border-border/50 text-foreground h-12 pl-11 placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground h-12 text-lg font-bold rounded-full transition-all shadow-lg shadow-primary/30"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            )}
          </Card>
        </motion.div>

        {/* Back to Login */}
        {!emailSent && (
          <motion.p 
            className="text-center text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Remember your password?{' '}
            <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium">
              Log In
            </Link>
          </motion.p>
        )}
      </div>
    </div>
  );
}
