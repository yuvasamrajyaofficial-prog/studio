import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-12 relative">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <SudharshanaChakraIcon className="w-16 h-16 text-primary animate-spin-slow mb-4" />
        <h1 className="text-3xl font-bold font-headline tracking-tight">MALOLA</h1>
        <p className="text-muted-foreground">Global Cultural Intelligence</p>
      </div>
      
      <OnboardingWizard />
    </div>
  );
}
