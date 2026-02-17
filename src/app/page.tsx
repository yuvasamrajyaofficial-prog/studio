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
  Settings,
  MessageCircle,
  PlayCircle 
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { ADMIN_EMAILS } from "@/lib/admin-config";

// Kept Components
import { ScripturesCarousel } from "@/components/home/scriptures-carousel";
import { DailyWisdom } from "@/components/home/daily-wisdom";
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
      icon: BookOpen, // Or a sun icon?
      href: "#daily-wisdom", // Scroll to section
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
        
        <main className="flex-1 pt-20 px-4 md:px-8 pb-10">
          <div className="container mx-auto max-w-6xl">
            
            {/* Welcome Section */}
            <div className="flex flex-col items-center text-center mb-12">
               <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <SudharshanaChakraIcon className="w-24 h-24 text-primary animate-spin-slow relative z-10" />
              </div>
              
              <h1 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-4">
                {user ? `Welcome back, ${user.displayName?.split(' ')[0] || 'Seeker'}` : 'Welcome to MALOLA'}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl font-body">
                Your portal to global cultural and spiritual intelligence.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
              {features.map((feature) => (
                <Link key={feature.title} href={feature.href} className="block h-full">
                  <Card className={`h-full p-6 flex flex-col items-center text-center justify-center gap-4 transition-all duration-300 border border-border/50 hover:shadow-lg ${feature.border} bg-card/50 backdrop-blur-sm group`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Daily Wisdom */}
            <div id="daily-wisdom" className="scroll-mt-24">
               <DailyWisdom />
            </div>

            {/* Recent Scriptures */}
            <div className="mt-12">
              <ScripturesCarousel />
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
