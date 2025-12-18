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
        <div className="w-full max-w-5xl mx-auto px-4 relative">
          {/* Constellation Background */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(251, 191, 36, 0)" />
                  <stop offset="50%" stopColor="rgba(251, 191, 36, 0.5)" />
                  <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
                </linearGradient>
              </defs>
              {/* Connecting Lines */}
              <path d="M100,100 L300,200 L500,100 L700,300 L500,500 L300,400 L100,500 Z" fill="none" stroke="url(#line-gradient)" strokeWidth="2" className="animate-pulse-slow" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 relative z-10">
            {RISHIS.map((rishi, index) => (
              <RishiCard
                key={rishi.name}
                rishi={rishi}
                index={index}
                isSelected={selected === index}
                onClick={() => setSelected(selected === index ? null : index)}
              />
            ))}
          </div>

          {/* Explanation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 backdrop-blur-md shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-4">The Seven Sages</h3>
            <p className="text-slate-200 text-base leading-relaxed">
              The Saptarishis are eternal cosmic beings appearing in every age. They hold the position of the seven stars of Ursa Major, 
              forever circling the celestial pole. These mind-born sons of Brahma established the Guru-Shishya tradition and revealed the Vedas to humanity.
            </p>
          </motion.div>
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
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -5 }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${rishi.color} bg-opacity-20 border border-white/20 cursor-pointer hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all backdrop-blur-md`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl shadow-inner">🧘</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white">{rishi.name}</h3>
          <p className="text-base text-amber-100 font-medium">{rishi.title}</p>
          <p className="text-sm text-slate-100 mt-2 leading-relaxed">{rishi.desc}</p>
          
          <motion.div
            initial={false}
            animate={{ height: isSelected ? "auto" : 0, opacity: isSelected ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white">
                <span className="font-bold text-amber-300">Contribution:</span> {rishi.contribution}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
