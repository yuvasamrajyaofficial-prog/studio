"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  BookOpen, 
  Sparkles, 
  User, 
  Newspaper, 
  ShieldCheck, 
  Headphones, 
  Globe, 
  Heart, 
  Shield 
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { ADMIN_EMAILS } from "@/lib/admin-config";

// Components
import { ScripturesCarousel } from "@/components/home/scriptures-carousel";
import { DailyWisdom } from "@/components/home/daily-wisdom";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  const { user } = useAuth();
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const features = [
    {
      title: "Enter the Cosmos",
      description: "Chat with AI Spirit Guide",
      icon: Sparkles,
      href: "/cosmos",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50"
    },
    {
      title: "Scripture Library",
      description: "Explore Ancient Texts",
      icon: BookOpen,
      href: "/scriptures",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/50"
    },
    {
      title: "Daily Wisdom",
      description: "Start Day with Insight",
      icon: BookOpen,
      href: "#daily-wisdom",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "hover:border-orange-500/50"
    },
    {
      title: "Blogs & Articles",
      description: "Read Spiritual Insights",
      icon: Newspaper,
      href: "/blogs",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      title: "My Profile",
      description: "Manage Your Journey",
      icon: User,
      href: "/profile",
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50"
    },
  ];

  if (isAdmin) {
    features.push({
      title: "Admin Dashboard",
      description: "Manage Content & Users",
      icon: ShieldCheck,
      href: "/admin",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "hover:border-red-500/50"
    });
  }

  return (
    <>
      <JsonLd
        type="WebSite"
        data={{
          name: "MALOLA",
          description: "Your AI-powered spiritual guide to ancient wisdom.",
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Header />
        
        <main className="flex-1 pt-16">
          
          {/* ================= MOBILE VIEW (APP DASHBOARD) ================= */}
          <div className="md:hidden px-4 pb-10 pt-4">
             <div className="flex flex-col items-center text-center mb-10">
               <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <SudharshanaChakraIcon className="w-20 h-20 text-primary animate-spin-slow relative z-10" />
              </div>
              
              <h1 className="font-headline text-3xl font-bold text-foreground mb-2">
                {user ? `Welcome, ${user.displayName?.split(' ')[0] || 'Seeker'}` : 'Welcome to MALOLA'}
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Your portal to spiritual intelligence.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href} className="block h-full">
                  <Card className={`h-full p-4 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 border border-border/50 hover:shadow-lg ${feature.border} bg-card/50 backdrop-blur-sm group active:scale-95`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline text-base font-bold text-foreground mb-1 leading-tight">{feature.title}</h3>
                      <p className="text-[10px] text-muted-foreground leading-tight">{feature.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            <div id="daily-wisdom" className="scroll-mt-24">
               <DailyWisdom />
            </div>

            <div className="mt-8">
              <ScripturesCarousel />
            </div>
          </div>


          {/* ================= DESKTOP VIEW (LANDING PAGE) ================= */}
          <div className="hidden md:block">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-0">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
              
              <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                <div className="mb-10 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                  <SudharshanaChakraIcon className="w-56 h-56 text-primary animate-spin-slow relative z-10" />
                </div>
                
                <h1 className="font-headline text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-foreground leading-tight">
                  Global Cultural & <br />
                  <span className="text-primary">Spiritual Intelligence</span>
                </h1>
                
                <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed font-light font-body">
                  Explore ancient scriptures, divine wisdom, and educational resources through a culture-aware, ethically governed AI platform.
                </p>
                
                {/* CTA Button */}
                <div className="flex flex-col items-center gap-4">
                  {user ? (
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-10 text-lg shadow-lg shadow-primary/30">
                      <Link href="/cosmos">Enter the Cosmos</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-10 text-lg shadow-lg shadow-primary/30">
                        <Link href="/register">Start Your Journey</Link>
                      </Button>
                      
                      <p className="text-muted-foreground text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-semibold underline">
                          Log in here
                        </Link>
                      </p>
                    </>
                  )}
                </div>
                
              </div>
            </section>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Features Grid */}
            <section className="py-24 bg-card/30 relative border-t border-border/50">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="font-headline text-4xl font-bold mb-4 text-foreground">
                    Ancient Wisdom, Modern Technology
                  </h2>
                  <p className="text-muted-foreground text-lg font-body">
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

            {/* Featured Scriptures Carousel */}
            <ScripturesCarousel />

            {/* Daily Wisdom Section */}
            <DailyWisdom />

            {/* Testimonials / Social Proof */}
            <Testimonials />

            {/* Newsletter Signup */}
            <Newsletter />
          </div>

        </main>
        
        <Footer />
      </div>
    </>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-headline text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed font-body">
        {description}
      </p>
    </div>
  );
}
