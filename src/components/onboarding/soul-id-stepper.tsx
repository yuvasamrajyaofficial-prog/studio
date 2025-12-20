'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/store/onboarding-store';
import StepAstrology from './step-astrology';
import StepPsychology from './step-psychology';
import SoulIDCard from './soul-id-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const steps = [
  { id: 'astrology', title: 'Cosmic Origins', description: 'Map your place in the stars' },
  { id: 'psychology', title: 'Soul Mirror', description: 'Reflect on your inner nature' },
  { id: 'reveal', title: 'Your Soul ID', description: 'Behold your digital signature' },
];

export default function SoulIDStepper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { astrologyData, psychologyData, soulID } = useOnboardingStore();

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const canGoNext = () => {
    if (currentStepIndex === 0) return !!astrologyData;
    if (currentStepIndex === 1) return !!psychologyData;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Progress Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            {steps[currentStepIndex].title}
          </h1>
          <p className="text-gray-400">{steps[currentStepIndex].description}</p>
        </div>

        {/* Step Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {currentStepIndex === 0 && <StepAstrology onComplete={nextStep} />}
              {currentStepIndex === 1 && <StepPsychology onComplete={nextStep} />}
              {currentStepIndex === 2 && <SoulIDCard />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {currentStepIndex < 2 && (
          <div className="mt-12 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="text-gray-400 hover:text-white disabled:opacity-0 transition-all"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>

            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === currentStepIndex ? 'w-8 bg-yellow-500' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              disabled={!canGoNext()}
              className="bg-white text-black hover:bg-gray-200 disabled:opacity-50 transition-all px-8"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
