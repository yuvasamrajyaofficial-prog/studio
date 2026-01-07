"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Headphones, Sparkles, Globe, Heart, Shield } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-8 md:py-0 bg-[#0f0518]">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-[#0f0518] to-[#0f0518] pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="mb-8 md:mb-10 relative">
              <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full animate-pulse" />
              <SudharshanaChakraIcon className="w-40 h-40 md:w-56 md:h-56 text-amber-400 animate-spin-slow relative z-10" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-slate-200">
              Global Cultural & <br className="hidden md:block" />
              <span className="text-amber-400">Spiritual Intelligence</span>
            </h1>
            
            <p className="max-w-2xl text-base md:text-lg text-slate-400 mb-10 leading-relaxed font-light px-4">
              Explore ancient scriptures, divine wisdom, and educational resources through a culture-aware, ethically governed AI platform.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              {user ? (
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-bold h-14 px-10 text-lg shadow-lg shadow-purple-500/30">
                  <Link href="/cosmos">Enter the Cosmos</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold h-14 px-10 text-lg shadow-lg shadow-orange-500/30">
                    <Link href="/register">Start Your Journey</Link>
                  </Button>
                  
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-amber-400 hover:text-amber-300 font-semibold underline">
                      Log in here
                    </Link>
                  </p>
                </>
              )}
            </div>
            
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                Ancient Wisdom, Modern Technology
              </h2>
              <p className="text-muted-foreground text-lg">
                A unified ecosystem designed to preserve, translate, and make accessible the world's profound spiritual heritage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={BookOpen}
                title="Universal Scripture Library"
                description="Access texts from Vedas, Upanishads, and global traditions, organized by era and philosophy."
              />
              <FeatureCard 
                icon={Headphones}
                title="Immersive Audio Experience"
                description="Listen to verse-by-verse recitations and full audiobooks with high-quality AI narration."
              />
              <FeatureCard 
                icon={Sparkles}
                title="AI-Powered Insights"
                description="Engage with our 'Antigravity' agents for context-aware explanations and guidance."
              />
              <FeatureCard 
                icon={Globe}
                title="Cultural Context Engine"
                description="Content adapts to your region and cultural background for a personalized experience."
              />
              <FeatureCard 
                icon={Heart}
                title="Holistic Wellness"
                description="Integrate Ayurveda lifestyle tips and mental wellness support into your daily routine."
              />
              <FeatureCard 
                icon={Shield}
                title="Ethical Governance"
                description="A safe platform where AI never claims divinity and respects human agency."
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-headline text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
