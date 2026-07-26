"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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
  Shield,
  Compass,
  Award
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
import { KalpavrikshaTree } from "@/components/3d/kalpavriksha-tree";

export default function HomePage() {
  const { user } = useAuth();
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  const features = [
    {
      title: "Cosmic AI Spirit Guide",
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
      title: "Soul ID Engine",
      description: "Astrological Profile",
      icon: User,
      href: "/soul-id",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50"
    },
    {
      title: "Daily Wisdom",
      description: "Start Day with Insight",
      icon: Compass,
      href: "#daily-wisdom",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "hover:border-orange-500/50"
    },
    {
      title: "Sadhana & Karma",
      description: "Track Spiritual Points",
      icon: Award,
      href: "/dashboard",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/50"
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
          description: "Your AI-powered spiritual guide to ancient scriptures and cultural intelligence.",
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
        <Header />
        
        <main className="flex-1 pt-16">
          
          {/* ================= MOBILE VIEW (APP DASHBOARD) ================= */}
          <div className="md:hidden px-4 pb-10 pt-4">
             <div className="flex flex-col items-center text-center mb-6">
              <h1 className="font-headline text-3xl font-bold text-foreground mb-2">
                {user ? `Welcome, ${user.displayName?.split(' ')[0] || 'Seeker'}` : 'Welcome to MALOLA'}
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                Your portal to spiritual intelligence & 3D Kalpavriksha.
              </p>
            </div>

            {/* 3D Kalpavriksha Tree Mobile Embed */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-amber-500/30 bg-card/40 backdrop-blur-md">
              <KalpavrikshaTree />
            </div>

            {/* Mobile Feature Grid */}
            <div className="grid grid-cols-2 gap-3 mb-12">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href} className="block h-full">
                  <Card className={`h-full p-4 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 border border-border/50 hover:shadow-lg ${feature.border} bg-card/50 backdrop-blur-sm group active:scale-95`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bg} ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline text-sm font-bold text-foreground mb-1 leading-tight">{feature.title}</h3>
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


          {/* ================= DESKTOP VIEW (3D LANDING PAGE) ================= */}
          <div className="hidden md:block">
            {/* 3D Hero Section */}
            <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-8">
              {/* Background Ambient Cosmic Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-purple-500/5 to-transparent pointer-events-none" />
              
              <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                
                <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground leading-tight">
                  Global Cultural & <br />
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                    Spiritual Intelligence
                  </span>
                </h1>
                
                <p className="max-w-2xl text-base md:text-lg text-muted-foreground mb-4 leading-relaxed font-light font-body">
                  Explore ancient scriptures, divine wisdom, and astrological insights under the sacred 3D Kalpavriksha wish-fulfilling tree.
                </p>

                {/* 3D Kalpavriksha Tree Visualizer */}
                <div className="w-full max-w-4xl my-2">
                  <KalpavrikshaTree />
                </div>
                
                {/* Hero CTA Button */}
                <div className="flex flex-col items-center gap-4 mt-4">
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
                    description="Access texts from Vedas, Upanishads, and global traditions in Kannada (ಕನ್ನಡ), English & Hindi."
                  />
                  <FeatureCard 
                    icon={Headphones}
                    title="Immersive Audio Experience"
                    description="Listen to verse-by-verse recitations and full audiobooks with high-quality AI narration."
                  />
                  <FeatureCard 
                    icon={Sparkles}
                    title="AI Spirit Guide"
                    description="Engage with our Antigravity AI guide for context-aware spiritual explanations and guidance."
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
