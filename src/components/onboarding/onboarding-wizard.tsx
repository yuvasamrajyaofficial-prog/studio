"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { StepCountry } from "./step-country";
import { StepLanguage } from "./step-language";
import { StepCulture } from "./step-culture";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

export function OnboardingWizard() {
  const { step } = useOnboardingStore();

  const progress = (step / 3) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <div className="mb-8 space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-wider">
          <span className={step >= 1 ? "text-primary font-bold" : ""}>Region</span>
          <span className={step >= 2 ? "text-primary font-bold" : ""}>Language</span>
          <span className={step >= 3 ? "text-primary font-bold" : ""}>Culture</span>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
