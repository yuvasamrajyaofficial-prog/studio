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
    color: "from-yellow-300 to-yellow-600",
    icon: "✨",
    desc: "The Age of Truth. Humanity lives in perfect harmony with the divine.",
    points: ["Lifespan: 100,000 years", "No disease", "Telepathic abilities", "Perfect virtue"]
  },
  {
    name: "Treta Yuga",
    title: "Silver Age",
    duration: "1,296,000 Years",
    virtue: "75%",
    color: "from-gray-200 to-gray-500",
    icon: "🔥",
    desc: "The age of ritual. Virtue diminishes as humanity moves from direct perception.",
    points: ["Lifespan: 10,000 years", "Dharma on 3 legs", "Rise of kingdoms", "Yajñas connect to divine"]
  },
  {
    name: "Dwapara Yuga",
    title: "Bronze Age",
    duration: "864,000 Years",
    virtue: "50%",
    color: "from-amber-500 to-amber-800",
    icon: "⚖️",
    desc: "The age of division. Vedas split into four as knowledge becomes harder to grasp.",
    points: ["Lifespan: 1,000 years", "Dharma on 2 legs", "Division of Vedas", "Balance of light/dark"]
  },
  {
    name: "Kali Yuga",
    title: "Iron Age",
    duration: "432,000 Years",
    virtue: "25%",
    color: "from-slate-600 to-slate-900",
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
          <div className="mt-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Eternal Cycle</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
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
      className={`p-6 rounded-2xl bg-gradient-to-br ${yuga.color} bg-opacity-15 border border-white/20`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{yuga.icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1">{yuga.name}</h3>
          <p className="text-lg text-white/80">{yuga.title}</p>
          <p className="text-sm text-white/60 mt-1">{yuga.duration}</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold">
          {yuga.virtue}
        </div>
      </div>
      
      <p className="text-white/90 text-sm leading-relaxed mb-4">{yuga.desc}</p>
      
      <div className="space-y-1.5">
        {yuga.points.map((point, i) => (
          <p key={i} className="text-xs text-white/70">• {point}</p>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 w-full h-2 bg-black/30 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${yuga.color}`} style={{ width: yuga.virtue }} />
      </div>
    </motion.div>
  );
}
