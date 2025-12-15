"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Globe, Book, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { country } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/checking auth
    const timer = setTimeout(() => {
      if (country === 'IN') {
        router.push('/scriptures');
      } else {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [country, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Personalizing your experience...</p>
        </div>
      </div>
    );
  }

  // Country-specific Titles/Themes
  const getDashboardTheme = () => {
    switch (country) {
      case 'US': return { title: "Western Wisdom & Innovation", icon: Sparkles };
      case 'JP': return { title: "Zen & Mindfulness", icon: Book };
      case 'GB': return { title: "Philosophy & Ethics", icon: Globe };
      default: return { title: "Global Wisdom", icon: Globe };
    }
  };

  const theme = getDashboardTheme();
  const ThemeIcon = theme.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ThemeIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-headline">{theme.title}</h1>
            <p className="text-muted-foreground">Curated insights for your region.</p>
          </div>
        </div>

        {/* Content Grid (Empty/Placeholder for non-Indian users as requested) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/50 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Local Scriptures</CardTitle>
            </CardHeader>
            <CardContent className="h-40 flex items-center justify-center text-muted-foreground/50 text-sm">
              Coming Soon for {country}
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Cultural Events</CardTitle>
            </CardHeader>
            <CardContent className="h-40 flex items-center justify-center text-muted-foreground/50 text-sm">
              No events scheduled
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-dashed border-2">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Community</CardTitle>
            </CardHeader>
            <CardContent className="h-40 flex items-center justify-center text-muted-foreground/50 text-sm">
              Join the waitlist
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
