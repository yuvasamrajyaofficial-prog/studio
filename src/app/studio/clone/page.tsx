"use client";

import { StudioLayout } from "@/components/studio/studio-layout";
import { motion } from "framer-motion";
import { Mic, AudioWaveform, Globe2, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceCloningPage() {
  return (
    <StudioLayout
      title="Voice Cloning"
      subtitle="Create a digital twin of your voice. Speak once, reach millions in every language."
    >
      {/* How it Works Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0" />
        
        <StepCard 
          number="01"
          title="Record Samples"
          desc="Upload 3-5 minutes of high-quality audio or record directly in our studio. The more data, the better the clone."
          icon={<Mic className="w-6 h-6 text-purple-400" />}
          delay={0.1}
        />
        <StepCard 
          number="02"
          title="AI Processing"
          desc="Our neural engine analyzes your unique vocal cords, pitch, cadence, and emotional range to build a model."
          icon={<AudioWaveform className="w-6 h-6 text-blue-400" />}
          delay={0.2}
        />
        <StepCard 
          number="03"
          title="Generate Audio"
          desc="Type any text or upload a scripture, and generate lifelike audio in your voice in 50+ languages."
          icon={<Globe2 className="w-6 h-6 text-cyan-400" />}
          delay={0.3}
        />
      </div>

      {/* Demo Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-12 flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Experience the Magic</h3>
              <p className="text-slate-400">Listen to how our AI preserves the sanctity and emotion of the original voice while translating the language.</p>
            </div>
            
            <div className="space-y-4">
              <AudioPlayer label="Original (Hindi)" duration="0:45" />
              <AudioPlayer label="Cloned (English)" duration="0:45" isClone />
              <AudioPlayer label="Cloned (Sanskrit)" duration="0:45" isClone />
            </div>
          </div>
          
          <div className="relative min-h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            {/* Visualizer Placeholder */}
            <div className="flex items-end gap-1 h-32">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [20, 60, 30, 80, 40] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, repeatType: "reverse" }}
                  className="w-2 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">Ready to Immortalize Your Voice?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 rounded-full text-lg">
            Start Cloning Now
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 h-12 rounded-full text-lg">
            View Pricing
          </Button>
        </div>
        <p className="text-sm text-slate-500">Professional plan required for commercial use.</p>
      </div>
    </StudioLayout>
  );
}

function StepCard({ number, title, desc, icon, delay }: { number: string; title: string; desc: string; icon: ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative p-8 rounded-2xl bg-slate-900 border border-white/5 hover:border-purple-500/30 transition-colors group"
    >
      <div className="absolute -top-6 left-8 text-6xl font-bold text-white/5 select-none group-hover:text-purple-500/10 transition-colors">
        {number}
      </div>
      <div className="relative z-10">
        <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit border border-white/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function AudioPlayer({ label, duration, isClone }: { label: string; duration: string; isClone?: boolean }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isClone ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
        <Play className="w-5 h-5 fill-current" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-white">{label}</span>
          <span className="text-xs text-slate-500">{duration}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-slate-500 group-hover:bg-white transition-colors" />
        </div>
      </div>
    </div>
  );
}
