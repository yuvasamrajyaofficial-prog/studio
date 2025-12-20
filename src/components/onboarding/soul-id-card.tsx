'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboarding-store';
import { calculateSoulID, getKarmicGlowColor } from '@/lib/soul-id-calculator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ShieldCheck, Zap, Moon, Sun } from 'lucide-react';

export default function SoulIDCard() {
  const router = useRouter();
  const { astrologyData, psychologyData, setSoulID, soulID } = useOnboardingStore();
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    if (astrologyData && psychologyData && !soulID) {
      const id = calculateSoulID(astrologyData, psychologyData);
      setSoulID(id);
      setTimeout(() => setIsRevealing(false), 2000);
    } else {
      setIsRevealing(false);
    }
  }, [astrologyData, psychologyData, soulID, setSoulID]);

  if (!soulID) return null;

  const glowColor = getKarmicGlowColor(soulID.psychology);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative group"
      >
        {/* Glow Effect */}
        <div
          className="absolute inset-0 blur-[60px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000"
          style={{ backgroundColor: glowColor }}
        />

        <Card className="relative w-[380px] h-[540px] bg-black/40 border-white/10 backdrop-blur-3xl rounded-[40px] p-8 flex flex-col overflow-hidden border">
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
              <h2 className="text-3xl font-bold tracking-tight">
                {soulID.astrology.lagna} Ascendant
              </h2>
              <p className="text-gray-400 text-sm">
                {soulID.astrology.nakshatra} Nakshatra • {soulID.astrology.rashi} Moon
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full pt-4">
              <div className="text-center">
                <div className="text-[10px] uppercase text-gray-500 mb-1">Sattva</div>
                <div className="text-sm font-bold">{Math.round(soulID.psychology.gunaBalance.sattva)}%</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase text-gray-500 mb-1">Rajas</div>
                <div className="text-sm font-bold">{Math.round(soulID.psychology.gunaBalance.rajas)}%</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] uppercase text-gray-500 mb-1">Tamas</div>
                <div className="text-sm font-bold">{Math.round(soulID.psychology.gunaBalance.tamas)}%</div>
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
            <Sun className="w-24 h-24" />
          </div>
          <div className="absolute bottom-0 left-0 p-4 opacity-10">
            <Moon className="w-24 h-24" />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center space-y-4"
      >
        <p className="text-gray-400 text-sm max-w-xs">
          Your Soul ID is now encrypted and stored in the cosmic ledger.
        </p>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="bg-white text-black hover:bg-gray-200 px-12 h-12 rounded-full font-bold"
        >
          Enter the Cosmos
        </Button>
      </motion.div>
    </div>
  );
}
