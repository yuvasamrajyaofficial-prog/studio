"use client";

import { StudioLayout } from "@/components/studio/studio-layout";
import { motion } from "framer-motion";
import { BarChart3, Users, Coins, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatorDashboardPage() {
  return (
    <StudioLayout
      title="Creator Dashboard"
      subtitle="Empowering Creators. Tools to track your impact, grow your audience, and monetize your spiritual content."
    >
      {/* Hero Image / UI Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-24 bg-slate-900"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-950/90" />
        {/* Abstract UI Representation */}
        <div className="absolute inset-4 md:inset-8 border border-white/5 rounded-lg bg-slate-950/50 backdrop-blur-sm p-6 grid grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="hidden md:block col-span-1 border-r border-white/5 pr-6 space-y-4">
            <div className="h-8 w-32 bg-white/10 rounded mb-8" />
            <div className="h-4 w-full bg-white/5 rounded" />
            <div className="h-4 w-3/4 bg-white/5 rounded" />
            <div className="h-4 w-5/6 bg-white/5 rounded" />
          </div>
          {/* Main Content */}
          <div className="col-span-3 md:col-span-2 space-y-6">
            <div className="flex gap-4">
              <div className="h-24 flex-1 bg-purple-500/10 border border-purple-500/20 rounded-lg" />
              <div className="h-24 flex-1 bg-blue-500/10 border border-blue-500/20 rounded-lg" />
              <div className="h-24 flex-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg" />
            </div>
            <div className="h-64 w-full bg-white/5 rounded-lg border border-white/5 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/20 to-transparent" />
               {/* Graph Line */}
               <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                 <path d="M0,100 C100,80 200,120 300,60 S500,80 600,40 L600,200 L0,200 Z" fill="none" stroke="rgba(168, 85, 247, 0.5)" strokeWidth="2" />
               </svg>
            </div>
          </div>
        </div>
        
        {/* Overlay Badge */}
        <div className="absolute bottom-8 right-8 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Analytics
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        <DashboardFeature 
          icon={<BarChart3 className="w-6 h-6 text-purple-400" />}
          title="Deep Analytics"
          desc="Understand your audience with detailed breakdowns of listening time, geography, and retention."
        />
        <DashboardFeature 
          icon={<Users className="w-6 h-6 text-blue-400" />}
          title="Audience Insights"
          desc="Know who listens to your chants. Demographics, interests, and spiritual preferences."
        />
        <DashboardFeature 
          icon={<Coins className="w-6 h-6 text-amber-400" />}
          title="Monetization"
          desc="Earn royalties every time your voice model is used or your content is streamed."
        />
        <DashboardFeature 
          icon={<Zap className="w-6 h-6 text-cyan-400" />}
          title="Instant Payouts"
          desc="Transparent revenue tracking and automated monthly payouts to your account."
        />
      </div>

      {/* CTA Section */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-white/10 p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-white">Join the Creator Program</h2>
          <p className="text-lg text-slate-300">
            Are you a Vedic scholar, musician, or spiritual teacher? Share your gift with the world and build a sustainable path for your service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 rounded-full px-8 h-12 text-lg font-bold">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-lg">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </StudioLayout>
  );
}

function DashboardFeature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/10 transition-colors">
      <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
