'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboardingStore } from '@/store/onboarding-store';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

const formSchema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  timeOfBirth: z.string().min(1, 'Time of birth is required'),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
});

interface StepAstrologyProps {
  onComplete: () => void;
}

export default function StepAstrology({ onComplete }: StepAstrologyProps) {
  const { setAstrologyData, astrologyData } = useOnboardingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: astrologyData?.dateOfBirth || '',
      timeOfBirth: astrologyData?.timeOfBirth || '',
      placeOfBirth: astrologyData?.placeOfBirth || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setAstrologyData(values);
    onComplete();
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className="bg-white/5 border-white/10 text-white h-12 focus:ring-yellow-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    className="bg-white/5 border-white/10 text-white h-12 focus:ring-yellow-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Place of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="City, Country"
                    {...field}
                    className="bg-white/5 border-white/10 text-white h-12 focus:ring-yellow-500/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <p className="text-xs text-gray-500 text-center italic">
              "Your birth details are the coordinates of your soul's entry into this realm."
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
}
