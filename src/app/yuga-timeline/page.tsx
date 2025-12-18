"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const YUGAS = [
  {
    name: "Satya Yuga",
    title: "Golden Age",
    duration: "1,728,000 Years",
    virtue: "100%",
    cardBg: "bg-gradient-to-br from-yellow-900/80 to-yellow-800/80",
    borderColor: "border-yellow-500/50",
    icon: "✨",
    desc: "The Age of Truth. Humanity lives in perfect harmony with the divine.",
    points: ["Lifespan: 100,000 years", "No disease", "Telepathic abilities", "Perfect virtue"]
  },
  {
    name: "Treta Yuga",
    title: "Silver Age",
    duration: "1,296,000 Years",
    virtue: "75%",
    cardBg: "bg-gradient-to-br from-gray-800/80 to-gray-700/80",
    borderColor: "border-gray-400/50",
    icon: "🔥",
    desc: "The age of ritual. Virtue diminishes as humanity moves from direct perception.",
    points: ["Lifespan: 10,000 years", "Dharma on 3 legs", "Rise of kingdoms", "Yajñas connect to divine"]
  },
  {
    name: "Dwapara Yuga",
    title: "Bronze Age",
    duration: "864,000 Years",
    virtue: "50%",
    cardBg: "bg-gradient-to-br from-amber-900/80 to-amber-800/80",
    borderColor: "border-amber-500/50",
    icon: "⚖️",
    desc: "The age of division. Vedas split into four as knowledge becomes harder to grasp.",
    points: ["Lifespan: 1,000 years", "Dharma on 2 legs", "Division of Vedas", "Balance of light/dark"]
  },
  {
    name: "Kali Yuga",
    title: "Iron Age",
    duration: "432,000 Years",
    virtue: "25%",
    cardBg: "bg-gradient-to-br from-slate-800/90 to-slate-900/90",
    borderColor: "border-slate-500/50",
    icon: "⚔️",
    desc: "The current age of darkness. Liberation is easiest through chanting divine names.",
    points: ["Lifespan: 100 years", "Dharma on 1 leg", "Spiritual ignorance", "Easy path via devotion"]
  },
];

export default function YugaTimelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Yuga Timeline"
        subtitle="The Four Ages of Dharma. The cosmic progression from golden perfection to iron reality."
      >
        <div ref={containerRef} className="w-full max-w-4xl mx-auto px-4 relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-amber-500 to-slate-800 opacity-50 rounded-full" />
          
          <div className="space-y-24 py-12">
            {YUGAS.map((yuga, index) => (
              <YugaCard key={yuga.name} yuga={yuga} index={index} />
            ))}
          </div>

          {/* Explanation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-8 rounded-3xl bg-gradient-to-br from-amber-900/40 to-purple-900/40 border border-amber-500/30 backdrop-blur-md shadow-2xl relative z-10"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-4">The Eternal Cycle</h3>
            <p className="text-slate-200 text-base leading-relaxed">
              The four Yugas form one Mahayuga (4,320,000 years). One thousand Mahayugas equal one day of Brahma. 
              After 100 Brahma years, complete dissolution occurs and the cosmos is reborn. This cycle repeats eternally, 
              offering souls countless opportunities for evolution and liberation.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function YugaCard({ yuga, index }: { yuga: typeof YUGAS[0]; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline Node */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 border-4 border-black z-10 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
      />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -10 : 10 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 p-8 rounded-3xl ${yuga.cardBg} border ${yuga.borderColor} backdrop-blur-md shadow-2xl transform-style-3d hover:scale-[1.02] transition-transform`}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="text-5xl filter drop-shadow-lg">{yuga.icon}</div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-1">{yuga.name}</h3>
            <p className="text-xl text-amber-200">{yuga.title}</p>
            <p className="text-sm text-slate-300 mt-1 font-mono">{yuga.duration}</p>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold backdrop-blur-sm border border-white/20">
            {yuga.virtue}
          </div>
        </div>
        
        <p className="text-slate-100 text-base leading-relaxed mb-6">{yuga.desc}</p>
        
        <div className="space-y-2 mb-6">
          {yuga.points.map((point, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <p className="text-sm text-slate-200">{point}</p>
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: yuga.virtue }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
          />
        </div>
      </motion.div>
    </div>
  );
}
