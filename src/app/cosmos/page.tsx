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
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile } from '@/lib/firebase/firestore';

export default function CosmosPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [soulID, setSoulID] = useState<SoulID | null>(null);
  const [username, setUsername] = useState<string>('Seeker');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push('/login');
      return;
    }

    // Load user data from Firestore
    loadUserData();
  }, [user, router]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      const profile = await getUserProfile(user.uid);
      if (profile) {
        if (profile.soulID) {
          setSoulID(profile.soulID);
        }
        setUsername(profile.displayName || profile.email?.split('@')[0] || 'Seeker');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading your cosmos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Welcome Section */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden py-12">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="mb-6 relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <SudharshanaChakraIcon className="w-24 h-24 md:w-32 md:h-32 text-primary animate-spin-slow relative z-10" />
            </div>
            
            <h1 className="font-headline text-4xl md:text-6xl font-bold mb-4 text-foreground">
              Welcome to the Cosmos, <span className="text-primary">{username}</span>
            </h1>
            
            {soulID ? (
              <>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-6 font-body">
                  Your Soul ID: <span className="text-primary font-mono font-bold">#{soulID.karmicSignature}</span>
                </p>
                
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-body">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span>{soulID.astrology?.lagna || 'Unknown'} Ascendant</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>{soulID.psychology?.dominantGuna || 'Balanced'} Dominant</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-body">
                  Your spiritual identity is yet to be revealed.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full text-lg shadow-lg shadow-primary/20">
                  <Link href="/soul-id">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Soul ID
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="py-12 bg-card/30 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Scriptures */}
              <DashboardCard
                icon={BookOpen}
                title="Sacred Scriptures"
                description="Explore the cosmic library of ancient wisdom"
                href="/scriptures"
                gradient="from-blue-500/10 to-cyan-500/10"
                borderColor="border-blue-500/20"
                iconColor="text-blue-500"
              />

              {/* AI Guru */}
              <DashboardCard
                icon={Sparkles}
                title="AI Spiritual Guide"
                description="Converse with your personalized AI guru"
                href="/ai-guide"
                gradient="from-purple-500/10 to-pink-500/10"
                borderColor="border-purple-500/20"
                iconColor="text-purple-500"
              />

              {/* Soul Journey */}
              <DashboardCard
                icon={Heart}
                title="Your Soul Journey"
                description="Track your spiritual growth and insights"
                href="/dashboard"
                gradient="from-amber-500/10 to-orange-500/10"
                borderColor="border-amber-500/20"
                iconColor="text-amber-500"
              />

              {/* Community */}
              <DashboardCard
                icon={Users}
                title="Soul Circles"
                description="Connect with like-minded seekers"
                href="/community"
                gradient="from-green-500/10 to-emerald-500/10"
                borderColor="border-green-500/20"
                iconColor="text-green-500"
              />

              {/* Blogs & Insights */}
              <DashboardCard
                icon={BookOpen}
                title="Cosmic Insights"
                description="Read curated articles and wisdom"
                href="/blogs"
                gradient="from-indigo-500/10 to-blue-500/10"
                borderColor="border-indigo-500/20"
                iconColor="text-indigo-500"
              />

              {/* Profile */}
              <DashboardCard
                icon={Star}
                title="Soul Profile"
                description="View and edit your cosmic identity"
                href="/soul-id"
                gradient="from-yellow-500/10 to-amber-500/10"
                borderColor="border-yellow-500/20"
                iconColor="text-yellow-500"
              />

            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 border-t border-border/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-headline font-bold text-foreground mb-6">Continue Your Journey</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="border-primary/20 text-foreground hover:bg-primary/5">
                <Link href="/scriptures">Browse Scriptures</Link>
              </Button>

              <Button asChild variant="outline" className="border-primary/20 text-foreground hover:bg-primary/5">
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
  borderColor,
  iconColor
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  gradient: string;
  borderColor: string;
  iconColor: string;
}) {
  return (
    <Link href={href}>
      <Card className={cn(
        "p-6 h-full bg-gradient-to-br backdrop-blur-sm border transition-all duration-300 hover:scale-105 group cursor-pointer",
        gradient,
        borderColor,
        "hover:border-primary/30"
      )}>
        <div className="h-12 w-12 rounded-lg bg-background/50 flex items-center justify-center mb-4 group-hover:bg-background transition-colors border border-border/50">
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <h3 className="text-xl font-headline font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm font-body">{description}</p>
      </Card>
    </Link>
  );
}
