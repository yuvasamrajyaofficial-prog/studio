"use client";

import { useOnboardingStore } from "@/store/onboarding-store";
import { Religion, UserInterest } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const religions: { value: Religion; label: string }[] = [
  { value: 'HINDUISM', label: 'Hinduism (Sanātana Dharma)' },
  { value: 'BUDDHISM', label: 'Buddhism' },
  { value: 'CHRISTIANITY', label: 'Christianity' },
  { value: 'ISLAM', label: 'Islam' },
  { value: 'SIKHISM', label: 'Sikhism' },
  { value: 'JAINISM', label: 'Jainism' },
  { value: 'SECULAR', label: 'Secular / Philosophy' },
  { value: 'OTHER', label: 'Other' },
];

const interests: { value: UserInterest; label: string }[] = [
  { value: 'SCRIPTURES', label: 'Ancient Scriptures' },
  { value: 'ASTROLOGY', label: 'Astrology & Cosmic Insights' },
  { value: 'AYURVEDA', label: 'Ayurveda & Wellness' },
  { value: 'MEDITATION', label: 'Meditation & Mindfulness' },
  { value: 'RELATIONSHIPS', label: 'Relationship Harmony' },
];

export function StepCulture() {
  const { 
    religion, setReligion, 
    interests: selectedInterests, toggleInterest,
    consentFlags, toggleConsent,
    setStep 
  } = useOnboardingStore();

  const router = useRouter();

  const handleComplete = () => {
    // In a real app, we would save to Firestore here
    console.log("Onboarding Complete");
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-headline">Cultural Context</h2>
        <p className="text-muted-foreground">
          Customize your spiritual and knowledge journey.
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Spiritual Path / Philosophy</Label>
        <RadioGroup 
          value={religion || ""} 
          onValueChange={(v) => setReligion(v as Religion)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {religions.map((r) => (
            <div key={r.value} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent cursor-pointer">
              <RadioGroupItem value={r.value} id={r.value} />
              <Label htmlFor={r.value} className="cursor-pointer flex-1">{r.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Interests</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interests.map((i) => (
            <div key={i.value} className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent">
              <Checkbox 
                id={i.value} 
                checked={selectedInterests.includes(i.value)}
                onCheckedChange={() => toggleInterest(i.value)}
              />
              <Label htmlFor={i.value} className="cursor-pointer flex-1">{i.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-semibold text-primary">Consent & Permissions</Label>
        <Card className="p-4 space-y-4 bg-muted/50">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent-astrology" 
              checked={consentFlags.astrology}
              onCheckedChange={() => toggleConsent('astrology')}
            />
            <div className="space-y-1">
              <Label htmlFor="consent-astrology" className="font-medium">Enable Astrology Features</Label>
              <p className="text-xs text-muted-foreground">
                I understand that astrology features are advisory and for entertainment/spiritual guidance only.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent-matching" 
              checked={consentFlags.relationshipMatching}
              onCheckedChange={() => toggleConsent('relationshipMatching')}
            />
            <div className="space-y-1">
              <Label htmlFor="consent-matching" className="font-medium">Enable Relationship Matching</Label>
              <p className="text-xs text-muted-foreground">
                Allow AI to suggest compatibility based on my profile and interests.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button 
          onClick={handleComplete} 
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
        >
          Enter MALOLA
        </Button>
      </div>
    </div>
  );
}
