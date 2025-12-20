"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { StepCountry } from "./step-country";
import { StepLanguage } from "./step-language";
import { StepCulture } from "./step-culture";
import StepAstrology from "./step-astrology";
import StepPsychology from "./step-psychology";
import SoulIDCard from "./soul-id-card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

export function OnboardingWizard() {
  const { step } = useOnboardingStore();
  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8 space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
          <span className={step >= 1 ? "text-primary font-bold" : ""}>Region</span>
          <span className={step >= 2 ? "text-primary font-bold" : ""}>Language</span>
          <span className={step >= 3 ? "text-primary font-bold" : ""}>Culture</span>
          <span className={step >= 4 ? "text-primary font-bold" : ""}>Astrology</span>
          <span className={step >= 5 ? "text-primary font-bold" : ""}>Psychology</span>
          <span className={step >= 6 ? "text-primary font-bold" : ""}>Soul ID</span>
        </div>
      </div>

       <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && <StepCountry />}
          {step === 2 && <StepLanguage />}
          {step === 3 && <StepCulture />}
          {step === 4 && <StepAstrology onComplete={() => useOnboardingStore.getState().setStep(5)} />}
          {step === 5 && <StepPsychology onComplete={() => useOnboardingStore.getState().setStep(6)} />}
          {step === 6 && <SoulIDCard />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
