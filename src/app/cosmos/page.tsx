'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { BookOpen, Sparkles, Heart, Users, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import type { SoulID } from '@/types/user';

export default function CosmosPage() {
  const router = useRouter();
  const [soulID, setSoulID] = useState<SoulID | null>(null);
  const [username, setUsername] = useState<string>('Seeker');

  useEffect(() => {
    // Check if user has Soul ID
    const storedSoulID = localStorage.getItem('malola_soul_id');
    const registrationData = localStorage.getItem('malola_registration');
    
    if (!storedSoulID) {
      // No Soul ID, redirect to register
      router.push('/register');
      return;
    }

    setSoulID(JSON.parse(storedSoulID));
    
    // Get user's name from registration if available
    if (registrationData) {
      const data = JSON.parse(registrationData);
      setUsername(data.country || 'Seeker'); // Can enhance with actual name field
    }
  }, [router]);

  if (!soulID) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] flex items-center justify-center">
        <div className="text-white text-xl">Verifying your cosmic credentials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Welcome Section */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden py-12 bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518]">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="mb-6 relative inline-block">
              <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full animate-pulse" />
              <SudharshanaChakraIcon className="w-24 h-24 md:w-32 md:h-32 text-amber-400 animate-spin-slow relative z-10" />
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-purple-400">
              Welcome to the Cosmos, {username}
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-6">
              Your Soul ID: <span className="text-amber-400 font-mono">#{soulID.karmicSignature}</span>
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{soulID.astrology.lagna} Ascendant</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span>{soulID.psychology.dominantGuna} Dominant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Scriptures */}
              <DashboardCard
                icon={BookOpen}
                title="Sacred Scriptures"
                description="Explore the cosmic library of ancient wisdom"
                href="/scriptures"
                gradient="from-blue-500/20 to-cyan-500/20"
                borderColor="border-blue-500/30"
              />

              {/* AI Guru */}
              <DashboardCard
                icon={Sparkles}
                title="AI Spiritual Guide"
                description="Converse with your personalized AI guru"
                href="/ai-guide"
                gradient="from-purple-500/20 to-pink-500/20"
                borderColor="border-purple-500/30"
              />

              {/* Soul Journey */}
              <DashboardCard
                icon={Heart}
                title="Your Soul Journey"
                description="Track your spiritual growth and insights"
                href="/dashboard"
                gradient="from-amber-500/20 to-orange-500/20"
                borderColor="border-amber-500/30"
              />

              {/* Community */}
              <DashboardCard
                icon={Users}
                title="Soul Circles"
                description="Connect with like-minded seekers"
                href="/community"
                gradient="from-green-500/20 to-emerald-500/20"
                borderColor="border-green-500/30"
              />

              {/* Blogs & Insights */}
              <DashboardCard
                icon={BookOpen}
                title="Cosmic Insights"
                description="Read curated articles and wisdom"
                href="/blogs"
                gradient="from-indigo-500/20 to-blue-500/20"
                borderColor="border-indigo-500/30"
              />

              {/* Profile */}
              <DashboardCard
                icon={Star}
                title="Soul Profile"
                description="View and edit your cosmic identity"
                href="/soul-id"
                gradient="from-yellow-500/20 to-amber-500/20"
                borderColor="border-yellow-500/30"
              />

            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-black/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Continue Your Journey</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/scriptures">Browse Scriptures</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/studio">Talk to AI Guru</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/blogs">Read Insights</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  description,
  href,
  gradient,
  borderColor
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  gradient: string;
  borderColor: string;
}) {
  return (
    <Link href={href}>
      <Card className={`p-6 h-full bg-gradient-to-br ${gradient} backdrop-blur-sm border ${borderColor} hover:border-white/30 transition-all duration-300 hover:scale-105 group cursor-pointer`}>
        <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </Card>
    </Link>
  );
}
