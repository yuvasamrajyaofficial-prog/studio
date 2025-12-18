"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";
import { useState } from "react";

const SAPTARISHIS = [
  { 
    name: "Kashyapa", 
    title: "Father of Creation",
    desc: "The progenitor of Devas, Asuras, Nagas, and all living beings. Father of the gods through Aditi and demons through Diti.",
    contribution: "Established the principle of universal fatherhood and cosmic genealogy",
    x: 50, y: 15,
    color: "from-amber-300 to-orange-500"
  },
  { 
    name: "Atri", 
    title: "Seer of the Fifth Mandala",
    desc: "Composer of numerous Rigvedic hymns. Father of Dattatreya and Durvasa. Known for his intense devotion and asceticism.",
    contribution: "Contributed to Rigveda, established principles of devotion",
    x: 25, y: 35,
    color: "from-blue-300 to-blue-500"
  },
  { 
    name: "Vasishtha", 
    title: "Guru of Lord Rama",
    desc: "The greatest of sages, possessor of Kamadhenu (wish-fulfilling cow). Engaged in legendary rivalry-turned-friendship with Vishwamitra.",
    contribution: "Authored Yoga Vasishtha, guided Rama in dharma",
    x: 75, y: 35,
    color: "from-purple-300 to-purple-500"
  },
  { 
    name: "Vishwamitra", 
    title: "Creator of Gayatri Mantra",
    desc: "Originally a warrior king who became a Brahmarishi through intense penance. Creator of the most sacred Gayatri Mantra.",
    contribution: "Gayatri Mantra, proved sanketh (determination) can overcome birth",
    x: 15, y: 60,
    color: "from-green-300 to-green-500"
  },
  { 
    name: "Gautama", 
    title: "Discoverer of Mantras",
    desc: "Husband of Ahalya, who was tested and liberated by Rama. Known for his righteousness and discovery of sacred mantras.",
    contribution: "Sciences of mantra, established dharmic justice",
    x: 50, y: 70,
    color: "from-yellow-300 to-yellow-500"
  },
  { 
    name: "Jamadagni", 
    title: "Master of Weaponry",
    desc: "Father of Parashurama, the warrior-sage avatar. Established the warrior-sage tradition combining spiritual and martial excellence.",
    contribution: "Sciences of warfare, father of Parashurama",
    x: 35, y: 85,
    color: "from-red-300 to-red-500"
  },
  { 
    name: "Bharadwaja", 
    title: "Scholar of Sciences",
    desc: "Master of Ayurveda, Vaimaanika Shastra (aeronautics), and advanced sciences. Teacher of Drona and Agnivesa.",
    contribution: "Ayurveda, aeronautics, archery sciences",
    x: 65, y: 85,
    color: "from-pink-300 to-pink-500"
  },
];

export default function RishisPage() {
  const [selectedRishi, setSelectedRishi] = useState<string | null>(null);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Rishi Lineage"
        subtitle="The Saptarishis & Sages. The seven great sages who form the foundation of Vedic knowledge and cosmic wisdom."
      >
        {/* 3D Network Graph */}
        <div className="w-full max-w-6xl mx-auto aspect-[16/10] md:aspect-[16/9] bg-slate-900/50 rounded-3xl border border-white/10 backdrop-blur-sm relative mb-12" style={{ perspective: "2000px" }}>
          {/* Background sacred geometry */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <radialGradient id="mandala">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="40%" fill="url(#mandala)" />
            <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.2" />
          </svg>

          {/* Energy connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {SAPTARISHIS.map((from, i) => 
              SAPTARISHIS.slice(i + 1).map((to, j) => (
                <motion.line
                  key={`${from.name}-${to.name}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="rgba(251, 191, 36, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: (i + j) * 0.1 }}
                />
              ))
            )}
          </svg>

          {/* Sage nodes */}
          {SAPTARISHIS.map((rishi, index) => (
            <motion.div
              key={rishi.name}
              className="absolute cursor-pointer group"
              style={{ 
                left: `${rishi.x}%`, 
                top: `${rishi.y}%`,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              onClick={() => setSelectedRishi(rishi.name)}
              whileHover={{ scale: 1.2, z: 50 }}
            >
              {/* Node */}
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${rishi.color} p-1 shadow-2xl relative`}>
                <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center border-2 border-white/20">
                  <span className="text-2xl md:text-4xl">🧘</span>
                </div>
                
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(251, 191, 36, 0.4)",
                      "0 0 40px rgba(251, 191, 36, 0.6)",
                      "0 0 20px rgba(251, 191, 36, 0.4)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-amber-300 font-bold text-xs md:text-sm text-center">{rishi.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Rishi Details */}
        {selectedRishi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mb-12 px-4"
          >
            {SAPTARISHIS.filter(r => r.name === selectedRishi).map(rishi => (
              <div key={rishi.name} className={`p-8 md:p-12 rounded-3xl bg-gradient-to-br ${rishi.color} bg-opacity-20 backdrop-blur-xl border border-white/20 shadow-2xl`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-serif">{rishi.name}</h3>
                    <p className="text-xl md:text-2xl text-amber-300">{rishi.title}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedRishi(null)}
                    className="text-white/50 hover:text-white text-3xl"
                  >
                    ×
                  </button>
                </div>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">{rishi.desc}</p>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/70">
                    <span className="font-bold text-amber-300">Contribution:</span> {rishi.contribution}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Collective wisdom */}
        <div className="w-full max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-purple-500/10 to-amber-500/10 border border-purple-500/20 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-amber-300 mb-4 font-serif">The Seven Sages</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              The Saptarishis are not just ancient sages, but eternal cosmic beings who appear in every Manvantara (cosmic age). 
              They hold the position of the seven stars of Ursa Major (Great Bear constellation), forever circling the celestial pole.
            </p>
            <p className="text-slate-300 leading-relaxed">
              These maharishis are the mind-born sons (Manasputras) of Brahma, created from his divine consciousness. 
              They are the original teachers of humanity, establishing the Guru-Shishya parampara (teacher-disciple lineage) 
              that continues to this day. Every spiritual tradition in India can trace its roots back to one of these seven sages.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}
