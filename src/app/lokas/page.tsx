"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const LOKAS = [
  // Upper
  { name: "Satya Loka", desc: "Abode of Brahma. The realm of ultimate truth.", bg: "bg-gradient-to-br from-yellow-900/60 to-yellow-800/60", border: "border-yellow-500/40", type: "upper" },
  { name: "Tapa Loka", desc: "Realm of intense penance and ascetics.", bg: "bg-gradient-to-br from-yellow-800/60 to-amber-800/60", border: "border-yellow-400/40", type: "upper" },
  { name: "Jana Loka", desc: "World of the creators, sons of Brahma.", bg: "bg-gradient-to-br from-amber-900/60 to-amber-800/60", border: "border-amber-500/40", type: "upper" },
  { name: "Mahar Loka", desc: "Home of great sages who transcended death.", bg: "bg-gradient-to-br from-amber-800/60 to-orange-800/60", border: "border-amber-400/40", type: "upper" },
  { name: "Svar Loka", desc: "Heaven ruled by Indra, where Devas reside.", bg: "bg-gradient-to-br from-blue-900/60 to-blue-800/60", border: "border-blue-500/40", type: "upper" },
  { name: "Bhuvar Loka", desc: "Atmospheric realm between Earth and Heaven.", bg: "bg-gradient-to-br from-blue-800/60 to-cyan-800/60", border: "border-blue-400/40", type: "upper" },
  // Earth
  { name: "Bhu Loka", desc: "Earth. The only realm where both enjoyment and liberation are possible.", bg: "bg-gradient-to-br from-green-900/70 to-blue-900/70", border: "border-green-400/50", type: "earth" },
  // Lower
  { name: "Atala", desc: "Realm of pleasure, ruled by demon Bala.", bg: "bg-gradient-to-br from-red-900/50 to-red-800/50", border: "border-red-500/40", type: "lower" },
  { name: "Vitala", desc: "World of gold and riches, ruled by Hara-Bhava.", bg: "bg-gradient-to-br from-red-800/50 to-rose-800/50", border: "border-red-400/40", type: "lower" },
  { name: "Sutala", desc: "Most opulent realm, ruled by King Bali.", bg: "bg-gradient-to-br from-rose-900/50 to-pink-900/50", border: "border-rose-500/40", type: "lower" },
  { name: "Talatala", desc: "Realm of Maya (illusion) and wizardry.", bg: "bg-gradient-to-br from-pink-900/50 to-fuchsia-900/50", border: "border-pink-500/40", type: "lower" },
  { name: "Mahatala", desc: "Home of the great Nagas (serpents).", bg: "bg-gradient-to-br from-fuchsia-900/50 to-purple-900/50", border: "border-fuchsia-500/40", type: "lower" },
  { name: "Rasatala", desc: "Dwelling of Danavas and Daityas.", bg: "bg-gradient-to-br from-purple-900/50 to-violet-900/50", border: "border-purple-500/40", type: "lower" },
  { name: "Patala", desc: "The lowest realm, most beautiful and luxurious.", bg: "bg-gradient-to-br from-violet-900/50 to-slate-900/60", border: "border-violet-500/40", type: "lower" },
];

export default function LokasPage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="14 Lokas"
        subtitle="The Cosmic Map of Worlds. Journey through the vertical universe."
      >
        <div className="w-full max-w-2xl mx-auto px-4 space-y-3">
          {LOKAS.map((loka, index) => (
            <LokaCard key={loka.name} loka={loka} index={index} />
          ))}

          {/* Explanation */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Cosmic Axis</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              The 14 Lokas represent the complete vertical structure of the universe. Mount Meru serves as the axis connecting all realms. 
              Only on Bhu Loka (Earth) can one simultaneously enjoy life and strive for liberation.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}

function LokaCard({ loka, index }: { loka: typeof LOKAS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-xl ${loka.bg} ${
        loka.type === "earth" ? "border-2" : "border"
      } ${loka.border} backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-bold text-white ${loka.type === "earth" ? "text-xl" : ""}`}>
            {loka.name}
          </h3>
          <p className="text-slate-200 text-sm mt-1">{loka.desc}</p>
        </div>
        <div className="text-2xl opacity-60">
          {loka.type === "upper" ? "↑" : loka.type === "lower" ? "↓" : "⊕"}
        </div>
      </div>
    </motion.div>
  );
}
