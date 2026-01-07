'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Lock, ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);

    try {
      await signIn(values.email, values.password);

      toast({
        title: '✨ Welcome back!',
        description: 'Logged in successfully.',
      });

      // Redirect to cosmos dashboard
      router.push('/cosmos');

    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'Failed to log in. Please try again.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }

      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setIsGoogleLoading(true);
    
    try {
      await signInWithGoogle();
      
      toast({
        title: '✨ Welcome!',
        description: 'Signed in with Google successfully.',
      });
      
      router.push('/cosmos');
    } catch (error: any) {
      console.error('Google login error:', error);
      
      toast({
        title: 'Google Sign-In failed',
        description: 'Unable to sign in with Google. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <motion.div 
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <SudharshanaChakraIcon className="h-10 w-10 text-amber-400" />
            </motion.div>
            <span className="font-serif text-3xl font-bold text-amber-400 tracking-wide">MALOLA</span>
          </Link>
          <motion.h1 
            className="text-4xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sign in to continue your spiritual journey
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-8 rounded-3xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
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

                {/* Password Field with Show/Hide */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-foreground/80">Password</FormLabel>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-muted/20 border-border/50 text-foreground h-12 pl-11 pr-11 placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                          >
                            <AnimatePresence mode="wait">
                              {showPassword ? (
                                <motion.div
                                  key="eye-off"
                                  initial={{ opacity: 0, rotate: -90 }}
                                  animate={{ opacity: 1, rotate: 0 }}
                                  exit={{ opacity: 0, rotate: 90 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <EyeOff className="w-5 h-5" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="eye"
                                  initial={{ opacity: 0, rotate: -90 }}
                                  animate={{ opacity: 1, rotate: 0 }}
                                  exit={{ opacity: 0, rotate: 90 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Eye className="w-5 h-5" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
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
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Login */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-border/50 text-foreground hover:bg-muted transition-all"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  Continue with Google
                </Button>
              </motion.div>

              {/* Apple Login (Placeholder - requires Apple Developer setup) */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-border/50 text-foreground hover:bg-muted transition-all"
                  disabled
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Continue with Apple
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Register Link */}
        <motion.p 
          className="text-center text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Don't have an account?{' '}
          <Link href="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
