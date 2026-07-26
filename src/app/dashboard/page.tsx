"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Clock, TrendingUp, Sparkles, 
  Calendar, Award, Target, ArrowRight, ShieldCheck, Flame, Compass 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    versesRead: 0,
    timeSpent: 0,
    currentStreak: 0,
    totalSessions: 0,
    karmaPoints: 0,
  });

  useEffect(() => {
    if (userProfile?.stats || userProfile?.karma) {
      setStats({
        versesRead: userProfile.stats?.versesRead || 12,
        timeSpent: userProfile.stats?.timeSpent || 45,
        currentStreak: userProfile.stats?.currentStreak || 3,
        totalSessions: userProfile.stats?.totalSessions || 7,
        karmaPoints: userProfile.karma || 150,
      });
    } else {
      setStats({
        versesRead: 12,
        timeSpent: 45,
        currentStreak: 3,
        totalSessions: 7,
        karmaPoints: 150,
      });
    }
  }, [user, userProfile]);

  if (!user) {
    router.push("/login");
    return null;
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Determine Spiritual Tier based on Karma
  const getSpiritualTier = (points: number) => {
    if (points >= 1000) return { title: "Jnani (Wise One)", color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30" };
    if (points >= 500) return { title: "Upasaka (Devoted Practitioner)", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30" };
    if (points >= 100) return { title: "Sadhaka (Spiritual Seeker)", color: "text-primary", bg: "bg-primary/20", border: "border-primary/30" };
    return { title: "Jijnasu (Curious Soul)", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" };
  };

  const currentTier = getSpiritualTier(stats.karmaPoints);
  const nextTierPoints = stats.karmaPoints >= 1000 ? 2000 : stats.karmaPoints >= 500 ? 1000 : stats.karmaPoints >= 100 ? 500 : 100;
  const karmaProgress = Math.min(100, Math.floor((stats.karmaPoints / nextTierPoints) * 100));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-24">
        
        {/* Welcome Header & Spiritual Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-primary">{userProfile?.preferences?.displayName || user.displayName || "Seeker"}</span>
            </h1>
            <p className="text-muted-foreground">
              Track your daily sadhanas, karma progress, and scriptural wisdom
            </p>
          </div>

          <div className={`px-4 py-2.5 rounded-2xl border ${currentTier.bg} ${currentTier.border} flex items-center gap-3 shrink-0`}>
            <Award className={`w-6 h-6 ${currentTier.color}`} />
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">SPIRITUAL TIER</p>
              <p className={`font-bold text-sm ${currentTier.color}`}>{currentTier.title}</p>
            </div>
          </div>
        </div>

        {/* Karma Progress Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 via-card to-accent/10 border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/20 text-primary">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">Karma Meter</h3>
                <p className="text-xs text-muted-foreground">Earn points by reading scriptures, sadhanas, and assisting seekers</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-headline font-bold text-primary">{stats.karmaPoints}</span>
              <span className="text-xs text-muted-foreground block">/ {nextTierPoints} Points to Next Tier</span>
            </div>
          </div>

          <div className="w-full bg-muted/40 rounded-full h-3 overflow-hidden p-0.5 border border-border/50">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500" 
              style={{ width: `${karmaProgress}%` }}
            />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={BookOpen}
            label="Verses Read"
            value={stats.versesRead.toString()}
            color="text-purple-500"
            bgColor="bg-purple-500/10"
          />
          <StatCard
            icon={Clock}
            label="Time Spent"
            value={formatTime(stats.timeSpent)}
            color="text-cyan-500"
            bgColor="bg-cyan-500/10"
          />
          <StatCard
            icon={TrendingUp}
            label="Current Streak"
            value={`${stats.currentStreak} days`}
            color="text-green-500"
            bgColor="bg-green-500/10"
          />
          <StatCard
            icon={Award}
            label="Total Sessions"
            value={stats.totalSessions.toString()}
            color="text-amber-500"
            bgColor="bg-amber-500/10"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Sadhana Progress */}
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Weekly Sadhana Completion
                </h2>
                <span className="text-xs text-muted-foreground font-mono">This Week</span>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center py-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className="space-y-2">
                    <div className={`h-12 rounded-xl border flex items-center justify-center ${idx <= 3 ? 'bg-primary/20 border-primary/40 text-primary font-bold' : 'bg-muted/20 border-border/50 text-muted-foreground'}`}>
                      {idx <= 3 ? '✓' : ''}
                    </div>
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Continue Reading */}
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Continue Reading
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => router.push("/scriptures/bhagavad-gita/chapter/2")}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Bhagavad Gita</h3>
                      <p className="text-sm text-muted-foreground mb-2">Chapter 2: Sankhya Yoga</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Verse 23 of 72</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              
              <div className="space-y-3">
                {[
                  { action: "Earned +25 Karma Points", scripture: "Daily Sadhana Practice", time: "10 mins ago" },
                  { action: "Read 12 verses", scripture: "Bhagavad Gita - Chapter 2", time: "2 hours ago" },
                  { action: "Consulted AI Guide", scripture: "Karma Yoga Clarification", time: "Yesterday" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.scripture}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Soul ID Card */}
            {userProfile?.soulID && (
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="flex items-center justify-center mb-4">
                  <SudharshanaChakraIcon className="w-24 h-24 animate-spin-slow" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">Your Soul ID</h3>
                  <p className="text-3xl font-headline font-bold text-primary mb-2">
                    #{userProfile.soulID.karmicSignature}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {userProfile.soulID.astrology?.lagna || 'Vedic'} Ascendant
                  </p>
                  <Button variant="outline" size="sm" onClick={() => router.push("/soul-id")}>
                    View Cosmic Profile
                  </Button>
                </div>
              </Card>
            )}

            {/* Quick Navigation */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Cosmic Navigation
              </h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/scriptures")}>
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  Sacred Scriptures
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/cosmos")}>
                  <Sparkles className="w-4 h-4 mr-2 text-accent" />
                  Cosmos & Panchang
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/ai-guide")}>
                  <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
                  AI Spiritual Guide
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bgColor }: any) {
  return (
    <Card className="p-6 bg-card/50 border-border/50">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}
