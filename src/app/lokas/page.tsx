"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const LOKAS = [
  // Upper
  { name: "Satya Loka", desc: "Abode of Brahma. The realm of ultimate truth.", color: "from-yellow-100 to-yellow-400", type: "upper" },
  { name: "Tapa Loka", desc: "Realm of intense penance and ascetics.", color: "from-yellow-200 to-yellow-500", type: "upper" },
  { name: "Jana Loka", desc: "World of the creators, sons of Brahma.", color: "from-amber-100 to-amber-400", type: "upper" },
  { name: "Mahar Loka", desc: "Home of great sages who transcended death.", color: "from-amber-200 to-amber-500", type: "upper" },
  { name: "Svar Loka", desc: "Heaven ruled by Indra, where Devas reside.", color: "from-blue-200 to-blue-400", type: "upper" },
  { name: "Bhuvar Loka", desc: "Atmospheric realm between Earth and Heaven.", color: "from-blue-300 to-blue-500", type: "upper" },
  // Earth
  { name: "Bhu Loka", desc: "Earth. The only realm where both enjoyment and liberation are possible.", color: "from-green-400 to-blue-500", type: "earth" },
  // Lower
  { name: "Atala", desc: "Realm of pleasure, ruled by demon Bala.", color: "from-red-300 to-red-400", type: "lower" },
  { name: "Vitala", desc: "World of gold and riches, ruled by Hara-Bhava.", color: "from-red-400 to-red-500", type: "lower" },
  { name: "Sutala", desc: "Most opulent realm, ruled by King Bali.", color: "from-red-500 to-red-600", type: "lower" },
  { name: "Talatala", desc: "Realm of Maya (illusion) and wizardry.", color: "from-red-600 to-red-700", type: "lower" },
  { name: "Mahatala", desc: "Home of the great Nagas (serpents).", color: "from-red-700 to-red-800", type: "lower" },
  { name: "Rasatala", desc: "Dwelling of Danavas and Daityas.", color: "from-red-800 to-red-900", type: "lower" },
  { name: "Patala", desc: "The lowest realm, most beautiful and luxurious.", color: "from-red-900 to-black", type: "lower" },
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
          <div className="mt-8 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Cosmic Axis</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
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
      className={`p-4 rounded-xl bg-gradient-to-br ${loka.color} ${
        loka.type === "earth" ? "border-2 border-white/30" : "border border-white/20"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-bold text-white ${loka.type === "earth" ? "text-xl" : ""}`}>
            {loka.name}
          </h3>
          <p className="text-white/90 text-sm mt-1">{loka.desc}</p>
        </div>
        <div className="text-2xl opacity-40">
          {loka.type === "upper" ? "↑" : loka.type === "lower" ? "↓" : "⊕"}
        </div>
      </div>
    </motion.div>
  );
}
