'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { calculateSoulID, getKarmicGlowColor } from '@/lib/soul-id-calculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, Zap, Moon, Sun, Home, ChevronLeft } from 'lucide-react';
import type { SoulID } from '@/types/user';
import Link from 'next/link';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, updateSoulID, saveRegistrationData } from '@/lib/firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function SoulIDPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [soulID, setSoulID] = useState<SoulID | null>(null);
  const [isRevealing, setIsRevealing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAndSaveSoulID = async () => {
      try {
        // Check if user is authenticated
        if (!user) {
          router.push('/login');
          return;
        }

        // Try to get existing Soul ID from Firestore first
        const profile = await getUserProfile(user.uid);
        
        if (profile?.soulID) {
          // Soul ID already exists, just display it
          setSoulID(profile.soulID);
          setIsLoading(false);
          setTimeout(() => setIsRevealing(false), 2000);
          return;
        }

        // Get registration data from Firestore
        if (!profile?.registration) {
          // Try localStorage as fallback (for migration)
          const localData = localStorage.getItem('malola_registration');
          
          if (!localData) {
            router.push('/register');
            return;
          }

          const data = JSON.parse(localData);
          
          // Save registration data to Firestore
          await saveRegistrationData(user.uid, data);
        }

        // Generate Soul ID from registration data
        const registrationData = profile?.registration || JSON.parse(localStorage.getItem('malola_registration') || '{}');
        
        const astrologyData = {
          dateOfBirth: registrationData.dateOfBirth,
          timeOfBirth: registrationData.timeOfBirth,
          placeOfBirth: registrationData.placeOfBirth,
          lagna: 'Taurus', // Mock - would calculate from actual astrology API
          rashi: 'Leo',
          nakshatra: 'Magha',
        };

        const generatedSoulID = calculateSoulID(astrologyData);
        setSoulID(generatedSoulID);
        
        // Save Soul ID to Firestore
        await updateSoulID(user.uid, generatedSoulID);
        
        // Also save to localStorage (for migration/fallback)
        localStorage.setItem('malola_soul_id', JSON.stringify(generatedSoulID));
        
        setIsLoading(false);
        setTimeout(() => setIsRevealing(false), 2000);

        toast({
          title: 'Soul ID Created!',
          description: 'Your cosmic identity has been generated.',
        });

      } catch (error) {
        console.error('Error generating Soul ID:', error);
        toast({
          title: 'Error',
          description: 'Failed to generate Soul ID. Please try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    generateAndSaveSoulID();
  }, [user, router, toast]);

  if (!soulID) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] flex items-center justify-center">
        <div className="text-white text-xl">Generating your Soul ID...</div>
      </div>
    );
  }

  const glowColor = getKarmicGlowColor(soulID.psychology);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/register" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Registration</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <SudharshanaChakraIcon className="h-10 w-10 text-amber-400" />
            <span className="font-serif text-3xl font-bold text-amber-400 tracking-wide">MALOLA</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Your Soul ID is Ready</h1>
          <p className="text-gray-400">Welcome to the cosmic realm</p>
        </div>

        {/* Soul ID Card */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative group w-full max-w-md"
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 blur-[60px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000"
              style={{ backgroundColor: glowColor }}
            />

            <Card className="relative w-full aspect-[9/14] bg-black/40 border-white/10 backdrop-blur-3xl rounded-[40px] p-8 flex flex-col overflow-hidden border">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                    Soul ID Signature
                  </span>
                </div>
                <ShieldCheck className="w-6 h-6 text-green-500/50" />
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-32 h-32 rounded-full border border-dashed border-white/20"
                  />
                  <div
                    className="absolute inset-2 rounded-full blur-md opacity-50"
                    style={{ backgroundColor: glowColor }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    {soulID.astrology.lagna} Ascendant
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {soulID.astrology.nakshatra} Nakshatra • {soulID.astrology.rashi} Moon
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full pt-4">
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-gray-500 mb-1">Sattva</div>
                    <div className="text-sm font-bold text-white">{Math.round(soulID.psychology.gunaBalance.sattva)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-gray-500 mb-1">Rajas</div>
                    <div className="text-sm font-bold text-white">{Math.round(soulID.psychology.gunaBalance.rajas)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-gray-500 mb-1">Tamas</div>
                    <div className="text-sm font-bold text-white">{Math.round(soulID.psychology.gunaBalance.tamas)}%</div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-auto pt-8 border-t border-white/5">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Karmic Signature</div>
                    <div className="text-2xl font-mono font-bold text-white">
                      #{soulID.karmicSignature}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-mono text-gray-600 break-all w-32 leading-tight">
                      {soulID.signatureHash.substring(0, 32)}...
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sun className="w-24 h-24 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 opacity-10">
                <Moon className="w-24 h-24 text-white" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center space-y-6"
          >
            <p className="text-gray-400 text-sm max-w-md">
              Your Soul ID has been generated and stored in the cosmic ledger. You can now explore ancient wisdom and connect with your spiritual path.
            </p>
            <Button 
              onClick={() => router.push('/cosmos')}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold h-14 px-12"
            >
              <Home className="w-5 h-5 mr-2" />
              Enter the Cosmos
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
