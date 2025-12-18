"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const LOKAS = [
  // Upper
  { name: "Satya Loka", desc: "Abode of Brahma. The realm of ultimate truth.", bg: "bg-gradient-to-r from-yellow-900/80 to-yellow-800/80", border: "border-yellow-500/50", type: "upper" },
  { name: "Tapa Loka", desc: "Realm of intense penance and ascetics.", bg: "bg-gradient-to-r from-yellow-800/80 to-amber-800/80", border: "border-yellow-400/50", type: "upper" },
  { name: "Jana Loka", desc: "World of the creators, sons of Brahma.", bg: "bg-gradient-to-r from-amber-900/80 to-amber-800/80", border: "border-amber-500/50", type: "upper" },
  { name: "Mahar Loka", desc: "Home of great sages who transcended death.", bg: "bg-gradient-to-r from-amber-800/80 to-orange-800/80", border: "border-amber-400/50", type: "upper" },
  { name: "Svar Loka", desc: "Heaven ruled by Indra, where Devas reside.", bg: "bg-gradient-to-r from-blue-900/80 to-blue-800/80", border: "border-blue-500/50", type: "upper" },
  { name: "Bhuvar Loka", desc: "Atmospheric realm between Earth and Heaven.", bg: "bg-gradient-to-r from-blue-800/80 to-cyan-800/80", border: "border-blue-400/50", type: "upper" },
  // Earth
  { name: "Bhu Loka", desc: "Earth. The only realm where both enjoyment and liberation are possible.", bg: "bg-gradient-to-r from-green-900/90 to-blue-900/90", border: "border-green-400/80", type: "earth" },
  // Lower
  { name: "Atala", desc: "Realm of pleasure, ruled by demon Bala.", bg: "bg-gradient-to-r from-red-900/60 to-red-800/60", border: "border-red-500/50", type: "lower" },
  { name: "Vitala", desc: "World of gold and riches, ruled by Hara-Bhava.", bg: "bg-gradient-to-r from-red-800/60 to-rose-800/60", border: "border-red-400/50", type: "lower" },
  { name: "Sutala", desc: "Most opulent realm, ruled by King Bali.", bg: "bg-gradient-to-r from-rose-900/60 to-pink-900/60", border: "border-rose-500/50", type: "lower" },
  { name: "Talatala", desc: "Realm of Maya (illusion) and wizardry.", bg: "bg-gradient-to-r from-pink-900/60 to-fuchsia-900/60", border: "border-pink-500/50", type: "lower" },
  { name: "Mahatala", desc: "Home of the great Nagas (serpents).", bg: "bg-gradient-to-r from-fuchsia-900/60 to-purple-900/60", border: "border-fuchsia-500/50", type: "lower" },
  { name: "Rasatala", desc: "Dwelling of Danavas and Daityas.", bg: "bg-gradient-to-r from-purple-900/60 to-violet-900/60", border: "border-purple-500/50", type: "lower" },
  { name: "Patala", desc: "The lowest realm, most beautiful and luxurious.", bg: "bg-gradient-to-r from-violet-900/60 to-slate-900/70", border: "border-violet-500/50", type: "lower" },
];

export default function LokasPage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="14 Lokas"
        subtitle="The Cosmic Map of Worlds. Journey through the vertical universe."
      >
        <div className="w-full max-w-3xl mx-auto px-4 perspective-1000">
          <div className="space-y-2 transform-style-3d py-12">
            {LOKAS.map((loka, index) => (
              <LokaCard key={loka.name} loka={loka} index={index} />
            ))}
          </div>

          {/* Explanation */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-md shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-4">The Cosmic Axis</h3>
            <p className="text-slate-200 text-base leading-relaxed">
              The 14 Lokas represent the complete vertical structure of the universe. Mount Meru serves as the axis connecting all realms. 
              Only on Bhu Loka (Earth) can one simultaneously enjoy life and strive for liberation. The upper worlds are realms of enjoyment for pious deeds, 
              while the lower worlds are realms of materialistic pleasure and illusion.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function LokaCard({ loka, index }: { loka: typeof LOKAS[0]; index: number }) {
  const isEarth = loka.type === "earth";
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 5, 
        zIndex: 10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
      }}
      className={`relative p-6 rounded-2xl ${loka.bg} ${
        isEarth ? "border-2 scale-105 z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "border"
      } ${loka.border} backdrop-blur-md transform-style-3d transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isEarth ? "bg-blue-500 text-white" : "bg-white/10 text-white/70"}`}>
            <span className="text-xl font-bold">{14 - index}</span>
          </div>
          <div>
            <h3 className={`font-bold text-white ${isEarth ? "text-2xl" : "text-xl"}`}>
              {loka.name}
            </h3>
            <p className="text-slate-200 text-sm mt-1">{loka.desc}</p>
          </div>
        </div>
        <div className="text-3xl opacity-60 text-white">
          {loka.type === "upper" ? "↑" : loka.type === "lower" ? "↓" : "⊕"}
        </div>
      </div>
      
      {/* 3D Depth Layer */}
      <div 
        className="absolute inset-0 rounded-2xl bg-black/20 -z-10 translate-z-[-10px]" 
        style={{ transform: "translateZ(-20px)" }}
      />
    </motion.div>
  );
}
