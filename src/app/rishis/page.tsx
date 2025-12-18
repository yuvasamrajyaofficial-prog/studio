"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";
import { useState } from "react";

const RISHIS = [
  { name: "Kashyapa", title: "Father of Creation", desc: "Progenitor of Devas, Asuras, Nagas, and all beings.", contribution: "Universal fatherhood", color: "from-amber-300 to-orange-500" },
  { name: "Atri", title: "Seer of 5th Mandala", desc: "Composer of Rigvedic hymns. Father of Dattatreya.", contribution: "Rigveda, devotion principles", color: "from-blue-300 to-blue-500" },
  { name: "Vasishtha", title: "Guru of Rama", desc: "Greatest sage, possessor of Kamadhenu (wish-cow).", contribution: "Yoga Vasishtha, guided Rama", color: "from-purple-300 to-purple-500" },
  { name: "Vishwamitra", title: "Creator of Gayatri", desc: "Warrior king who became Brahmarishi through penance.", contribution: "Gayatri Mantra", color: "from-green-300 to-green-500" },
  { name: "Gautama", title: "Discoverer of Mantras", desc: "Known for righteousness. Husband of Ahalya.", contribution: "Mantra sciences, dharmic justice", color: "from-yellow-300 to-yellow-500" },
  { name: "Jamadagni", title: "Master of Weaponry", desc: "Father of Parashurama, warrior-sage tradition.", contribution: "Warfare sciences", color: "from-red-300 to-red-500" },
  { name: "Bharadwaja", title: "Scholar of Sciences", desc: "Master of Ayurveda and advanced sciences.", contribution: "Ayurveda, aeronautics", color: "from-pink-300 to-pink-500" },
];

export default function RishisPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Rishi Lineage"
        subtitle="The Saptarishis & Sages. The seven great sages who form the foundation of Vedic knowledge."
      >
        <div className="w-full max-w-3xl mx-auto px-4 space-y-4">
          {RISHIS.map((rishi, index) => (
            <RishiCard
              key={rishi.name}
              rishi={rishi}
              index={index}
              isSelected={selected === index}
              onClick={() => setSelected(selected === index ? null : index)}
            />
          ))}

          {/* Explanation */}
          <div className="mt-8 p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Seven Sages</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Saptarishis are eternal cosmic beings appearing in every age. They hold the position of the seven stars of Ursa Major, 
              forever circling the celestial pole. These mind-born sons of Brahma established the Guru-Shishya tradition.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}

function RishiCard({ rishi, index, isSelected, onClick }: { 
  rishi: typeof RISHIS[0]; 
  index: number;
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`p-5 rounded-xl bg-gradient-to-br ${rishi.color} bg-opacity-15 border border-white/20 cursor-pointer hover:border-white/40 transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">🧘</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{rishi.name}</h3>
          <p className="text-base text-amber-300">{rishi.title}</p>
          <p className="text-sm text-white/80 mt-2">{rishi.desc}</p>
          
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pt-3 border-t border-white/20"
            >
              <p className="text-xs text-white/70">
                <span className="font-bold text-amber-300">Contribution:</span> {rishi.contribution}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
