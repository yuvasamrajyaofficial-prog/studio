"use client";

import { StudioLayout } from "@/components/studio/studio-layout";
import { motion } from "framer-motion";
import { Languages, BookOpen, Sparkles, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { name: "Sanskrit", native: "संस्कृतम्" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Kannada", native: "ಕನ್ನಡ" },
  { name: "Malayalam", native: "മലയാളം" },
  { name: "English", native: "English" },
  { name: "Spanish", native: "Español" },
  { name: "French", native: "Français" },
  { name: "German", native: "Deutsch" },
  { name: "Japanese", native: "日本語" },
  { name: "Mandarin", native: "中文" },
];

export default function TTSPage() {
  return (
    <StudioLayout
      title="Text-to-Voice"
      subtitle="Scriptures in Every Tongue. Convert sacred texts into lifelike audio with spiritual resonance."
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        <StatCard label="Languages" value="50+" />
        <StatCard label="Voices" value="200+" />
        <StatCard label="Emotions" value="12" />
        <StatCard label="Latency" value="<50ms" />
      </div>

      {/* Language Grid */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Global Reach, Local Soul</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our models are trained on religious texts to ensure correct pronunciation of complex terminology and mantric sounds across all major languages.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all text-center group cursor-default"
            >
              <div className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{lang.native}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{lang.name}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white">Why Spiritual TTS?</h2>
          <div className="space-y-6">
            <FeatureRow 
              icon={<BookOpen className="w-5 h-5 text-amber-400" />}
              title="Context Aware"
              desc="Understands the difference between narrative text and mantric chanting."
            />
            <FeatureRow 
              icon={<Languages className="w-5 h-5 text-blue-400" />}
              title="Pronunciation Perfect"
              desc="Specialized handling of Sanskrit sandhi rules and phonetics."
            />
            <FeatureRow 
              icon={<Sparkles className="w-5 h-5 text-purple-400" />}
              title="Emotional Depth"
              desc="Injects Bhakti (devotion), Veera (valor), or Shanti (peace) as required."
            />
          </div>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
            Try the Demo
          </Button>
        </div>
        
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black/40">
           {/* Abstract Waveform Visualization */}
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-64 h-64 relative">
               <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping-slow" />
               <div className="absolute inset-4 bg-blue-500/30 rounded-full animate-ping-slower" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <PlayCircle className="w-20 h-20 text-white opacity-80" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </StudioLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-center">
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 p-2 rounded-lg bg-white/5 h-fit border border-white/5">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
