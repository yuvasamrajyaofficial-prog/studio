"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const YUGAS = [
  {
    name: "Satya Yuga",
    title: "Golden Age",
    duration: "1,728,000 Years",
    virtue: "100%",
    cardBg: "bg-gradient-to-br from-yellow-900/60 to-yellow-800/60",
    borderColor: "border-yellow-500/40",
    icon: "✨",
    desc: "The Age of Truth. Humanity lives in perfect harmony with the divine.",
    points: ["Lifespan: 100,000 years", "No disease", "Telepathic abilities", "Perfect virtue"]
  },
  {
    name: "Treta Yuga",
    title: "Silver Age",
    duration: "1,296,000 Years",
    virtue: "75%",
    cardBg: "bg-gradient-to-br from-gray-800/60 to-gray-700/60",
    borderColor: "border-gray-400/40",
    icon: "🔥",
    desc: "The age of ritual. Virtue diminishes as humanity moves from direct perception.",
    points: ["Lifespan: 10,000 years", "Dharma on 3 legs", "Rise of kingdoms", "Yajñas connect to divine"]
  },
  {
    name: "Dwapara Yuga",
    title: "Bronze Age",
    duration: "864,000 Years",
    virtue: "50%",
    cardBg: "bg-gradient-to-br from-amber-900/60 to-amber-800/60",
    borderColor: "border-amber-500/40",
    icon: "⚖️",
    desc: "The age of division. Vedas split into four as knowledge becomes harder to grasp.",
    points: ["Lifespan: 1,000 years", "Dharma on 2 legs", "Division of Vedas", "Balance of light/dark"]
  },
  {
    name: "Kali Yuga",
    title: "Iron Age",
    duration: "432,000 Years",
    virtue: "25%",
    cardBg: "bg-gradient-to-br from-slate-800/80 to-slate-900/80",
    borderColor: "border-slate-500/40",
    icon: "⚔️",
    desc: "The current age of darkness. Liberation is easiest through chanting divine names.",
    points: ["Lifespan: 100 years", "Dharma on 1 leg", "Spiritual ignorance", "Easy path via devotion"]
  },
];

export default function YugaTimelinePage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Yuga Timeline"
        subtitle="The Four Ages of Dharma. The cosmic progression from golden perfection to iron reality."
      >
        <div className="w-full max-w-3xl mx-auto px-4 space-y-8">
          {YUGAS.map((yuga, index) => (
            <YugaCard key={yuga.name} yuga={yuga} index={index} />
          ))}

          {/* Explanation */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-purple-900/40 border border-amber-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Eternal Cycle</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              The four Yugas form one Mahayuga (4,320,000 years). One thousand Mahayugas equal one day of Brahma. 
              After 100 Brahma years, complete dissolution occurs and the cosmos is reborn.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}

function YugaCard({ yuga, index }: { yuga: typeof YUGAS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl ${yuga.cardBg} border ${yuga.borderColor} backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{yuga.icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">{yuga.name}</h3>
          <p className="text-lg text-slate-200">{yuga.title}</p>
          <p className="text-sm text-slate-400 mt-1">{yuga.duration}</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold backdrop-blur-sm">
          {yuga.virtue}
        </div>
      </div>
      
      <p className="text-slate-200 text-sm leading-relaxed mb-4">{yuga.desc}</p>
      
      <div className="space-y-1.5">
        {yuga.points.map((point, i) => (
          <p key={i} className="text-xs text-slate-300">• {point}</p>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
        <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: yuga.virtue }} />
      </div>
    </motion.div>
  );
}
