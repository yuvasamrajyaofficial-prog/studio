"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const languages = [
  "English", "Hindi", "Sanskrit", "Kannada", "Tamil", "Telugu", 
  "Malayalam", "Japanese", "Spanish", "French", "German"
];

export function StepLanguage() {
  const { languages: selectedLanguages, toggleLanguage, setStep } = useOnboardingStore();

  const handleContinue = () => {
    if (selectedLanguages.length > 0) {
      setStep(3);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-headline">Preferred Languages</h2>
        <p className="text-muted-foreground">
          Select languages for scriptures and AI interaction.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center py-8">
        {languages.map((lang) => {
          const isSelected = selectedLanguages.includes(lang);
          return (
            <Badge
              key={lang}
              variant={isSelected ? "default" : "outline"}
              className="text-lg py-2 px-4 cursor-pointer hover:bg-primary/90 transition-all"
              onClick={() => toggleLanguage(lang)}
            >
              {lang}
              {isSelected && <Check className="ml-2 h-4 w-4" />}
            </Badge>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button 
          onClick={handleContinue} 
          disabled={selectedLanguages.length === 0}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
