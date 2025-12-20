'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '@/store/onboarding-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, CheckCircle2 } from 'lucide-react';

const questions = [
  {
    id: 'energy',
    text: 'How would you describe your typical energy level throughout the day?',
    options: [
      { label: 'Calm, steady, and clear', value: 'sattva' },
      { label: 'Dynamic, active, and sometimes restless', value: 'rajas' },
      { label: 'Slow, stable, and sometimes heavy', value: 'tamas' },
    ],
  },
  {
    id: 'focus',
    text: 'When faced with a challenge, what is your first reaction?',
    options: [
      { label: 'Reflect and seek a balanced solution', value: 'sattva' },
      { label: 'Take immediate action and push through', value: 'rajas' },
      { label: 'Wait and see, or feel overwhelmed', value: 'tamas' },
    ],
  },
  {
    id: 'nature',
    text: 'Which of these best describes your physical nature?',
    options: [
      { label: 'Light, creative, and quick (Vata)', value: 'vata' },
      { label: 'Intense, focused, and warm (Pitta)', value: 'pitta' },
      { label: 'Strong, calm, and nurturing (Kapha)', value: 'kapha' },
    ],
  },
];

interface StepPsychologyProps {
  onComplete: () => void;
}

export default function StepPsychology({ onComplete }: StepPsychologyProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { setPsychologyData } = useOnboardingStore();

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestionIndex].id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final data
      const gunaCounts = { sattva: 0, rajas: 0, tamas: 0 };
      const doshaCounts = { vata: 0, pitta: 0, kapha: 0 };

      Object.values(newAnswers).forEach((val) => {
        if (val in gunaCounts) gunaCounts[val as keyof typeof gunaCounts]++;
        if (val in doshaCounts) doshaCounts[val as keyof typeof doshaCounts]++;
      });

      setPsychologyData({
        gunaBalance: {
          sattva: (gunaCounts.sattva / 2) * 100 || 50,
          rajas: (gunaCounts.rajas / 2) * 100 || 30,
          tamas: (gunaCounts.tamas / 2) * 100 || 20,
        },
        dosha: {
          vata: doshaCounts.vata * 100 || 33,
          pitta: doshaCounts.pitta * 100 || 33,
          kapha: doshaCounts.kapha * 100 || 34,
        },
        personalityTraits: ['Intuitive', 'Balanced', 'Seeker'],
      });
      onComplete();
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl min-h-[400px] flex flex-col">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-medium leading-tight">
              {questions[currentQuestionIndex].text}
            </h2>

            <div className="grid gap-3">
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="group relative w-full text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                      {option.label}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5">
        <p className="text-xs text-gray-500 text-center italic">
          "The mind is a mirror; let us clear the dust to see the soul."
        </p>
      </div>
    </Card>
  );
}
