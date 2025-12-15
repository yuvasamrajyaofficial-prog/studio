"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { CountryCode } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const countries: { code: CountryCode; name: string; flag: string; description: string }[] = [
  { 
    code: 'IN', 
    name: 'India', 
    flag: '🇮🇳', 
    description: 'Sanātana Dharma, Vedic Astrology, Ayurveda' 
  },
  { 
    code: 'JP', 
    name: 'Japan', 
    flag: '🇯🇵', 
    description: 'Zen Philosophy, Shinto, Mindfulness' 
  },
  { 
    code: 'US', 
    name: 'USA', 
    flag: '🇺🇸', 
    description: 'Western Philosophy, Psychology, Innovation' 
  },
  { 
    code: 'GB', 
    name: 'UK', 
    flag: '🇬🇧', 
    description: 'History, Literature, Secular Ethics' 
  },
  { 
    code: 'OTHER', 
    name: 'Global', 
    flag: '🌍', 
    description: 'Universal Spiritual Wisdom' 
  },
];

export function StepCountry() {
  const { country, setCountry, setStep } = useOnboardingStore();

  const handleContinue = () => {
    if (country) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-headline">Select Your Region</h2>
        <p className="text-muted-foreground">
          We personalize your experience based on your cultural context.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countries.map((c) => (
          <motion.div
            key={c.code}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={cn(
                "cursor-pointer border-2 transition-colors hover:border-primary/50",
                country === c.code ? "border-primary bg-primary/5" : "border-transparent"
              )}
              onClick={() => setCountry(c.code)}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <span className="text-4xl">{c.flag}</span>
                <CardTitle className="text-xl">{c.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!country}
          size="lg"
          className="w-full md:w-auto"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
