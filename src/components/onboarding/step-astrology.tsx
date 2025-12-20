'use client';

import React, { useState } from 'react';
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
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

const formSchema = z.object({
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  timeOfBirth: z.string().min(1, 'Time of birth is required'),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
});

interface StepAstrologyProps {
  onComplete: () => void;
}

export default function StepAstrology({ onComplete }: StepAstrologyProps) {
  const { setAstrologyData, astrologyData, setStep } = useOnboardingStore();
  const [hour, setHour] = useState<string>(astrologyData?.timeOfBirth?.split(':')[0] || '12');
  const [minute, setMinute] = useState<string>(astrologyData?.timeOfBirth?.split(':')[1]?.slice(0, 2) || '00');
  const [period, setPeriod] = useState<string>('AM');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: astrologyData?.dateOfBirth ? new Date(astrologyData.dateOfBirth) : undefined,
      timeOfBirth: astrologyData?.timeOfBirth || '',
      placeOfBirth: astrologyData?.placeOfBirth || '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = format(values.dateOfBirth, 'yyyy-MM-dd');
    const formattedTime = `${hour}:${minute} ${period}`;
    
    setAstrologyData({
      dateOfBirth: formattedDate,
      timeOfBirth: formattedTime,
      placeOfBirth: values.placeOfBirth,
      // Mock astrological calculations
      lagna: 'Taurus',
      rashi: 'Leo',
      nakshatra: 'Magha',
    });
    onComplete();
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Birth Details</h2>
        <p className="text-gray-400 text-sm">Your cosmic coordinates for Soul ID generation</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Date of Birth with Calendar Picker */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                  <CalendarIcon className="w-4 h-4 text-yellow-500" />
                  Date of Birth
                </FormLabel>
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
                      className="bg-white/5 border-white/10 text-white h-12 focus:ring-yellow-500/50 pr-10"
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

          {/* Time of Birth with AM/PM */}
          <FormField
            control={form.control}
            name="timeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Time of Birth
                </FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 hover:bg-white/10">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                        <SelectItem key={h} value={h.toString().padStart(2, '0')} className="text-white hover:bg-white/10">
                          {h.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 hover:bg-white/10">
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10 max-h-[200px]">
                      {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                        <SelectItem key={m} value={m.toString().padStart(2, '0')} className="text-white hover:bg-white/10">
                          {m.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 hover:bg-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      <SelectItem value="AM" className="text-white hover:bg-white/10">AM</SelectItem>
                      <SelectItem value="PM" className="text-white hover:bg-white/10">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Place of Birth */}
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  Place of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter city name (e.g., New Delhi, India)"
                    {...field}
                    className="bg-white/5 border-white/10 text-white h-12 focus:ring-yellow-500/50 placeholder:text-gray-500"
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">Enter your birth city and country</p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <p className="text-xs text-gray-500 text-center italic">
              "Your birth details are the coordinates of your soul's entry into this realm."
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(3)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-12 px-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-semibold h-12 px-8"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
