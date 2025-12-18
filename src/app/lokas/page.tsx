"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const UPPER_LOKAS = [
  { name: "Satya Loka", desc: "The highest realm, abode of Brahma. The realm of ultimate truth and cosmic consciousness.", residents: "Brahma and enlightened beings", color: "from-yellow-100 to-yellow-400" },
  { name: "Tapa Loka", desc: "Realm of intense penance and cosmic austerities.", residents: "Great ascetics and Sanaka sages", color: "from-yellow-200 to-yellow-500" },
  { name: "Jana Loka", desc: "World of the creators, sons of Brahma who never fall into material existence.", residents: "Bhrigu, Marichi, and other Prajapatis", color: "from-amber-100 to-amber-400" },
  { name: "Mahar Loka", desc: "Home of great sages who transcended material death.", residents: "Saintly persons and Maharishis", color: "from-amber-200 to-amber-500" },
  { name: "Svar Loka", desc: "Heavenly realm ruled by Indra, where Devas reside.", residents: "Devas, Apsaras, and Gandharvas", color: "from-blue-200 to-blue-400" },
  { name: "Bhuvar Loka", desc: "Atmospheric realm between Earth and Heaven.", residents: "Semi-divine beings and spirits", color: "from-blue-300 to-blue-500" },
];

const EARTH_LOKA = {
  name: "Bhu Loka",
  desc: "The Earth plane. The only realm where both enjoyment and liberation are possible.",
  residents: "Humans, animals, and plants",
  color: "from-green-400 to-blue-500"
};

const LOWER_LOKAS = [
  { name: "Atala", desc: "Realm of pleasure and seduction, ruled by the demon Bala.", residents: "Demon Bala and temptresses", color: "from-red-300 to-red-400" },
  { name: "Vitala", desc: "World of gold and riches, ruled by Hara-Bhava (form of Shiva).", residents: "Hara-Bhava and mineral beings", color: "from-red-400 to-red-500" },
  { name: "Sutala", desc: "Most opulent realm, more beautiful than heaven itself.", residents: "King Bali and his subjects", color: "from-red-500 to-red-600" },
  { name: "Talatala", desc: "Realm of Maya (illusion) and wizardry.", residents: "Maya Danava and magicians", color: "from-red-600 to-red-700" },
  { name: "Mahatala", desc: "Home of the great serpents, Nagas.", residents: "Multi-headed serpents and Nagas", color: "from-red-700 to-red-800" },
  { name: "Rasatala", desc: "Dwelling of Danavas and Daityas (demons).", residents: "Danavas and Daityas", color: "from-red-800 to-red-900" },
  { name: "Patala", desc: "The lowest realm, most beautiful and luxurious.", residents: "Vasuki and great serpent kings", color: "from-red-900 to-black" },
];

export default function LokasPage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="14 Lokas"
        subtitle="The Cosmic Map of Worlds. Journey through the vertical universe from the highest heaven to the deepest underworld."
      >
        {/* 3D Vertical Stack */}
        <div className="w-full max-w-5xl mx-auto px-4 space-y-3 py-12">
          {/* Upper Lokas */}
          <div className="space-y-3">
            {UPPER_LOKAS.map((loka, index) => (
              <LokaCard key={loka.name} loka={loka} type="upper" index={index} total={UPPER_LOKAS.length} />
            ))}
          </div>

          {/* Earth - Special */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`relative p-10 md:p-12 rounded-3xl bg-gradient-to-br ${EARTH_LOKA.color} shadow-2xl border-4 border-white/30 backdrop-blur-xl`}
          >
            <div className="absolute inset-0 bg-white/10 rounded-3xl animate-pulse" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 font-serif">{EARTH_LOKA.name}</h3>
              <p className="text-xl md:text-2xl text-white/90 mb-4">The Middle Realm</p>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-3">{EARTH_LOKA.desc}</p>
              <p className="text-sm text-white/70 italic">Residents: {EARTH_LOKA.residents}</p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

          {/* Lower Lokas */}
          <div className="space-y-3">
            {LOWER_LOKAS.map((loka, index) => (
              <LokaCard key={loka.name} loka={loka} type="lower" index={index} total={LOWER_LOKAS.length} />
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="w-full max-w-5xl mt-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-amber-300 mb-4 font-serif">The Cosmic Axis</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              The 14 Lokas represent the complete vertical structure of the universe. Mount Meru, the cosmic mountain, 
              serves as the axis connecting all realms. Each Loka has its own unique qualities, pleasures, and duration of existence.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Interestingly, the lower Lokas (Patalas) are not realms of suffering like hell. They are incredibly beautiful 
              and luxurious, but they lack the opportunity for spiritual advancement. Only on Bhu Loka (Earth) can one simultaneously 
              enjoy material life and strive for liberation—making Earth the most valuable of all realms.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function LokaCard({ loka, type, index, total }: { 
  loka: typeof UPPER_LOKAS[0]; 
  type: "upper" | "lower"; 
  index: number;
  total: number;
}) {
  const depth = type === "upper" ? (total - index) * 10 : index * 10;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.02, 
        z: 20,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}
      className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br ${loka.color} backdrop-blur-xl border border-white/20 shadow-xl cursor-pointer`}
      style={{ 
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth}px)`
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-serif">{loka.name}</h3>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-2">{loka.desc}</p>
          <p className="text-xs md:text-sm text-white/70 italic">Residents: {loka.residents}</p>
        </div>
        <div className="text-4xl md:text-5xl opacity-40 ml-4">
          {type === "upper" ? "↑" : "↓"}
        </div>
      </div>
      
      {/* 3D depth indicator */}
      <div className="absolute bottom-2 right-2 text-xs text-white/30 font-mono">
        Level {type === "upper" ? total - index : -(index + 1)}
      </div>
    </motion.div>
  );
}
