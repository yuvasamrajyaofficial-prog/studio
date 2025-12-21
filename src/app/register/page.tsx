'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, Globe, Languages, Sparkles, ChevronRight, ChevronLeft, Mail, Lock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import Link from 'next/link';
import { Religion, UserInterest } from '@/types/user';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  // Authentication fields
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  
  // Profile fields
  country: z.string().min(1, 'Country is required'),
  language: z.string().min(1, 'Language is required'),
  religion: z.string().min(1, 'Spiritual path is required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  consentAstrology: z.boolean(),
  consentMatching: z.boolean(),
  
  // Birth details for Soul ID
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  timeOfBirth: z.string().min(1, 'Time of birth is required'),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
});

const religions: { value: Religion; label: string }[] = [
  { value: 'HINDUISM', label: 'Hinduism (Sanātana Dharma)' },
  { value: 'BUDDHISM', label: 'Buddhism' },
  { value: 'CHRISTIANITY', label: 'Christianity' },
  { value: 'ISLAM', label: 'Islam' },
  { value: 'SIKHISM', label: 'Sikhism' },
  { value: 'JAINISM', label: 'Jainism' },
  { value: 'SECULAR', label: 'Secular / Philosophy' },
  { value: 'OTHER', label: 'Other' },
];

const interests: { value: UserInterest; label: string }[] = [
  { value: 'SCRIPTURES', label: 'Ancient Scriptures' },
  { value: 'ASTROLOGY', label: 'Astrology & Cosmic Insights' },
  { value: 'AYURVEDA', label: 'Ayurveda & Wellness' },
  { value: 'MEDITATION', label: 'Meditation & Mindfulness' },
  { value: 'RELATIONSHIPS', label: 'Relationship Harmony' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hour, setHour] = useState<string>('12');
  const [minute, setMinute] = useState<string>('00');
  const [period, setPeriod] = useState<string>('AM');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      country: '',
      language: '',
      religion: '',
      interests: [],
      consentAstrology: false,
      consentMatching: false,
      dateOfBirth: undefined,
      timeOfBirth: '',
      placeOfBirth: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    let authUser = null;
    
    try {
      const formattedDate = format(values.dateOfBirth, 'yyyy-MM-dd');
      const formattedTime = `${hour}:${minute} ${period}`;
      
      // Step 1: Create Firebase auth account
      console.log('[Registration] Creating auth account...');
      authUser = await signUp(values.email, values.password);
      console.log('[Registration] Auth account created:', authUser.uid);
      
      // Step 2: Save full registration data
      try {
        const registrationData = {
          country: values.country,
          language: values.language,
          religion: values.religion,
          interests: values.interests,
          consentAstrology: values.consentAstrology,
          consentMatching: values.consentMatching,
          dateOfBirth: formattedDate,
          timeOfBirth: formattedTime,
          placeOfBirth: values.placeOfBirth,
          registeredAt: new Date().toISOString(),
        };
        
        console.log('[Registration] Saving to Firestore...');
        const { saveRegistrationData } = await import('@/lib/firebase/firestore');
        await saveRegistrationData(authUser.uid, registrationData);
        console.log('[Registration] Firestore save successful');
        
        // Also save to localStorage
        localStorage.setItem('malola_registration', JSON.stringify(registrationData));
      } catch (firestoreError) {
        console.error('[Registration] Firestore save failed:', firestoreError);
        // Don't fail the whole registration if just Firestore fails
      }
      
      toast({
        title: '✨ Account created successfully!',
        description: 'Generating your Soul ID...',
      });
      
      // Navigate to Soul ID generation
      router.push('/soul-id');
      
    } catch (error: any) {
      console.error('[Registration] Error:', error);
      
      // If auth succeeded but something else failed, still proceed
      if (authUser) {
        console.log('[Registration] Auth succeeded, proceeding to Soul ID...');
        toast({
          title: 'Account created!',
          description: 'Complete your profile setup.',
        });
        router.push('/soul-id');
        return;
      }
      
      // Auth failed completely
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Try logging in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      }
      
      toast({
        title: 'Registration failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <SudharshanaChakraIcon className="h-10 w-10 text-amber-400" />
            <span className="font-serif text-3xl font-bold text-amber-400 tracking-wide">MALOLA</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Begin Your Cosmic Journey</h1>
          <p className="text-gray-400">Register to unlock your Soul ID and access ancient wisdom</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
            {/* Section 0: Account (NEW) */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Mail className="w-6 h-6 text-amber-400" />
                  Create Account
                </h2>
                <p className="text-gray-400 text-sm mt-1">Sign up to begin your spiritual journey</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your@email.com" 
                          className="bg-white/5 border-white/10 text-white h-12 placeholder:text-gray-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="At least 6 characters" 
                          className="bg-white/5 border-white/10 text-white h-12 placeholder:text-gray-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Section 1: Region & Language */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-amber-400" />
                  Region & Language
                </h2>
                <p className="text-gray-400 text-sm mt-1">Where are you from?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="India" className="text-white">India</SelectItem>
                          <SelectItem value="USA" className="text-white">United States</SelectItem>
                          <SelectItem value="UK" className="text-white">United Kingdom</SelectItem>
                          <SelectItem value="Canada" className="text-white">Canada</SelectItem>
                          <SelectItem value="Australia" className="text-white">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Preferred Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="English" className="text-white">English</SelectItem>
                          <SelectItem value="Hindi" className="text-white">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="Sanskrit" className="text-white">संस्कृत (Sanskrit)</SelectItem>
                          <SelectItem value="Tamil" className="text-white">தமிழ் (Tamil)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Section 2: Cultural Context */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  Cultural Context
                </h2>
                <p className="text-gray-400 text-sm mt-1">Customize your spiritual journey</p>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-200">Spiritual Path / Philosophy</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {religions.map((r) => (
                            <div key={r.value} className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5 cursor-pointer">
                              <RadioGroupItem value={r.value} id={r.value} />
                              <FormLabel htmlFor={r.value} className="cursor-pointer flex-1 text-gray-300">{r.label}</FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="interests"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-200">Interests</FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {interests.map((interest) => (
                          <FormField
                            key={interest.value}
                            control={form.control}
                            name="interests"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2 border border-white/10 rounded-lg p-4 hover:bg-white/5">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(interest.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, interest.value])
                                        : field.onChange(field.value?.filter((value) => value !== interest.value));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="cursor-pointer flex-1 text-gray-300">{interest.label}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <FormField
                    control={form.control}
                    name="consentAstrology"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-gray-300">Enable Astrology Features</FormLabel>
                          <p className="text-xs text-gray-500">Advisory and for spiritual guidance only</p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentMatching"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="text-gray-300">Enable Relationship Matching</FormLabel>
                          <p className="text-xs text-gray-500">AI-powered compatibility suggestions</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>

            {/* Section 3: Birth Details for Soul ID */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-amber-400" />
                  Birth Details for Soul ID
                </h2>
                <p className="text-gray-400 text-sm mt-1">Your cosmic coordinates</p>
              </div>

              <div className="space-y-6">
                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Date of Birth</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined;
                              field.onChange(date);
                            }}
                            max={format(new Date(), 'yyyy-MM-dd')}
                            min="1900-01-01"
                            className="bg-white/5 border-white/10 text-white h-12 pr-10"
                          />
                        </FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-white/10"
                            >
                              <CalendarIcon className="h-5 w-5 text-gray-400" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-gray-900 border-white/10" align="end">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                              initialFocus
                              className="bg-gray-900 text-white"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Type manually or click calendar icon</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time of Birth */}
                <FormField
                  control={form.control}
                  name="timeOfBirth"
                  render={({ field }) => {
                    const updateTime = (h: string, m: string, p: string) => {
                      const timeString = `${h}:${m} ${p}`;
                      field.onChange(timeString);
                    };

                    return (
                      <FormItem>
                        <FormLabel className="text-gray-300">Time of Birth</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          <Select 
                            value={hour} 
                            onValueChange={(val) => {
                              setHour(val);
                              updateTime(val, minute, period);
                            }}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                              <SelectValue placeholder="Hour" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10">
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                <SelectItem key={h} value={h.toString().padStart(2, '0')} className="text-white">
                                  {h.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={minute} 
                            onValueChange={(val) => {
                              setMinute(val);
                              updateTime(hour, val, period);
                            }}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                              <SelectValue placeholder="Min" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10 max-h-[200px]">
                              {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                <SelectItem key={m} value={m.toString().padStart(2, '0')} className="text-white">
                                  {m.toString().padStart(2, '0')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select 
                            value={period} 
                            onValueChange={(val) => {
                              setPeriod(val);
                              updateTime(hour, minute, val);
                            }}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10">
                              <SelectItem value="AM" className="text-white">AM</SelectItem>
                              <SelectItem value="PM" className="text-white">PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Place of Birth */}
                <FormField
                  control={form.control}
                  name="placeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Place of Birth</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city name (e.g., New Delhi, India)"
                          {...field}
                          className="bg-white/5 border-white/10 text-white h-12 placeholder:text-gray-500"
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">Enter your birth city and country</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold h-14 px-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Generate My Soul ID'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <p className="text-center text-xs text-gray-500 italic">
              "Your registration marks the beginning of your cosmic journey through ancient wisdom."
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
