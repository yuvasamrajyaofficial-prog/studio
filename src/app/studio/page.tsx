"use client";

import { StudioLayout } from "@/components/studio/studio-layout";
import { motion } from "framer-motion";
import { Mic, Globe, LayoutDashboard, ArrowRight, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";

export default function StudioPage() {
  return (
    <StudioLayout
      title="AI Voice Studio"
      subtitle="Your Divine Voice, Immortalized. The world's most advanced spiritual audio platform."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <FeatureCard
          href="/studio/clone"
          icon={<Mic className="w-8 h-8 text-purple-400" />}
          title="Voice Cloning"
          desc="Create a digital twin of your voice to narrate scriptures in any language while retaining your unique tone and emotion."
          color="group-hover:border-purple-500/50"
          delay={0.1}
        />
        <FeatureCard
          href="/studio/tts"
          icon={<Globe className="w-8 h-8 text-blue-400" />}
          title="Text-to-Voice"
          desc="Convert sacred texts into lifelike audio in over 50 languages using our specialized spiritual neural models."
          color="group-hover:border-blue-500/50"
          delay={0.2}
        />
        <FeatureCard
          href="/dashboard"
          icon={<LayoutDashboard className="w-8 h-8 text-cyan-400" />}
          title="Creator Dashboard"
          desc="Track your impact, manage your content, and monetize your spiritual contributions to the global community."
          color="group-hover:border-cyan-500/50"
          delay={0.3}
        />
      </div>

      {/* Value Prop Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-32 relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-transparent" />
        <div className="relative p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Preserving Heritage</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Why Clone Your Voice?
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Scriptures were meant to be heard, not just read. By immortalizing your voice, you ensure that future generations can hear the Vedas, Upanishads, and Epics chanted with the correct intonation and devotion, regardless of language barriers.
            </p>
            <ul className="space-y-4">
              {[
                "Reach a global audience in their native tongue",
                "Preserve your unique chanting style forever",
                "Create audiobooks at 100x speed",
                "Monetize your voice model ethically"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full relative aspect-square max-w-md">
            {/* Abstract Visualization */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="relative h-full w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
               <Wand2 className="w-32 h-32 text-white/20" />
               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>
          </div>
        </div>
      </motion.div>
    </StudioLayout>
  );
}

function FeatureCard({ href, icon, title, desc, color, delay }: { href: string; icon: ReactNode; title: string; desc: string; color: string; delay: number }) {
  return (
    <Link href={href} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
        className={`group h-full p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/20 ${color} transition-all duration-300 backdrop-blur-sm relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative z-10">
          <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
            {title}
          </h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            {desc}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
            Explore Feature <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
