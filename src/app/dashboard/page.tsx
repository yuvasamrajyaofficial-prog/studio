"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Clock, TrendingUp, Sparkles, 
  Calendar, Award, Target, ArrowRight 
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
  });

  useEffect(() => {
    // TODO: Fetch real stats from Firestore
    // For now, using mock data
    setStats({
      versesRead: 127,
      timeSpent: 840, // minutes
      currentStreak: 7,
      totalSessions: 23,
    });
  }, [user]);

  if (!user) {
    router.push("/login");
    return null;
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {userProfile?.preferences?.displayName || user.displayName || "Seeker"}
          </h1>
          <p className="text-muted-foreground">
            Continue your journey through the cosmic wisdom
          </p>
        </div>

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
                  { action: "Read 12 verses", scripture: "Bhagavad Gita", time: "2 hours ago" },
                  { action: "Completed Chapter 1", scripture: "Upanishads", time: "Yesterday" },
                  { action: "Explored Cosmos", scripture: "Soul ID Analysis", time: "2 days ago" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
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
                    {userProfile.soulID.number}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {userProfile.soulID.yuga} Yuga
                  </p>
                  <Button variant="outline" size="sm" onClick={() => router.push("/soul-id")}>
                    View Cosmic Profile
                  </Button>
                </div>
              </Card>
            )}

            {/* Recommended Scriptures */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                For You
              </h3>
              
              <div className="space-y-3">
                {[
                  { title: "Upanishads", reason: "Matches your Soul ID" },
                  { title: "Yoga Sutras", reason: "Based on your interests" },
                  { title: "Vedas", reason: "Complete your knowledge" },
                ].map((rec, i) => (
                  <div key={i} 
                       className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                       onClick={() => router.push("/scriptures")}>
                    <p className="font-medium text-sm">{rec.title}</p>
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Quick Actions
              </h3>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/scriptures")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Scriptures
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/cosmos")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Cosmos
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => router.push("/ai-guide")}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ask AI Guide
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
