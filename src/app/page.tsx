"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Headphones, Sparkles, Globe, Heart, Shield } from "lucide-react";
import { RotatingGlobe } from "@/components/home/rotating-globe";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-12 md:py-0 bg-[#0f0518]">
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
            <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-bold h-14 px-10 text-lg shadow-lg shadow-orange-500/30">
              <Link href="/register">Start Your Journey</Link>
            </Button>
            
            {/* Floating Flower Action Button */}
            <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
              <Button size="icon" className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 animate-bounce-slow">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </Button>
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

        {/* Cosmic & Lineage Section */}
        <section className="py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
                Cosmic Wisdom & Lineage
              </h2>
              <p className="text-slate-400 text-lg">
                Explore the cyclical nature of time, the structure of the universe, and the divine lineages that guide humanity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CosmicCard 
                title="Kālacakra" 
                desc="The Eternal Wheel of Time" 
                href="/kalacakra" 
                color="border-blue-500/50 hover:bg-blue-900/20"
              />
              <CosmicCard 
                title="Yuga Timeline" 
                desc="The Four Ages of Dharma" 
                href="/yuga-timeline" 
                color="border-yellow-500/50 hover:bg-yellow-900/20"
              />
              <CosmicCard 
                title="14 Lokas" 
                desc="The Cosmic Map of Worlds" 
                href="/lokas" 
                color="border-purple-500/50 hover:bg-purple-900/20"
              />
              <CosmicCard 
                title="Rishi Lineage" 
                desc="The Saptarishis & Sages" 
                href="/rishis" 
                color="border-orange-500/50 hover:bg-orange-900/20"
              />
              <CosmicCard 
                title="Dashavatara" 
                desc="The Ten Incarnations" 
                href="/avatars" 
                color="border-red-500/50 hover:bg-red-900/20"
              />
            </div>
          </div>
        </section>

        {/* Global Vision Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-background to-background opacity-50 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                  Guided by Paramananda. <br />
                  <span className="text-primary">Driven by Logic.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  MALOLA is not just a library; it's a civilizational AI platform. We bridge the gap between timeless spiritual truths and cutting-edge technology, ensuring that wisdom remains accessible, relevant, and preserved for future generations.
                </p>
                <div className="flex flex-col gap-4">
                  <CheckItem text="Consent-first architecture" />
                  <CheckItem text="Multi-lingual support" />
                  <CheckItem text="Strict data privacy & safety" />
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <RotatingGlobe />
              </div>
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

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

function CosmicCard({ title, desc, href, color }: { title: string, desc: string, href: string, color: string }) {
  return (
    <Link href={href} className={`block p-6 rounded-xl border ${color} backdrop-blur-sm transition-all duration-300 group`}>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </Link>
  );
}
