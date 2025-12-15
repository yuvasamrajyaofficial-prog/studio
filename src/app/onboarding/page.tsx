import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12">
      <div className="mb-8 flex flex-col items-center">
        <SudharshanaChakraIcon className="w-16 h-16 text-primary animate-spin-slow mb-4" />
        <h1 className="text-3xl font-bold font-headline tracking-tight">MALOLA</h1>
        <p className="text-muted-foreground">Global Cultural Intelligence</p>
      </div>
      
      <OnboardingWizard />
    </div>
  );
}
