"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const YUGAS = [
  {
    id: "satya",
    name: "Satya Yuga",
    title: "The Golden Age",
    duration: "1,728,000 Years",
    virtue: "100%",
    color: "from-yellow-200 via-yellow-400 to-yellow-600",
    glowColor: "rgba(250, 204, 21, 0.3)",
    icon: "✨",
    description: "The Age of Truth and perfection. Humanity lives in complete harmony with the divine.",
    characteristics: [
      "Lifespan: 100,000 years",
      "No disease or suffering",
      "Natural telepathic abilities",
      "Perfect spiritual virtue"
    ]
  },
  {
    id: "treta",
    name: "Treta Yuga",
    title: "The Silver Age",
    duration: "1,296,000 Years",
    virtue: "75%",
    color: "from-gray-100 via-gray-300 to-gray-500",
    glowColor: "rgba(156, 163, 175, 0.3)",
    icon: "🔥",
    description: "The age of ritual and sacrifice. Virtue diminishes as humanity moves from direct divine perception.",
    characteristics: [
      "Lifespan: 10,000 years",
      "Dharma on three legs",
      "Rise of kingdoms",
      "Yajñas connect to divine"
    ]
  },
  {
    id: "dwapara",
    name: "Dwapara Yuga",
    title: "The Bronze Age",
    duration: "864,000 Years",
    virtue: "50%",
    color: "from-amber-500 via-amber-700 to-amber-900",
    glowColor: "rgba(217, 119, 6, 0.3)",
    icon: "⚖️",
    description: "The age of division. Vedas split into four parts as complete knowledge becomes difficult to grasp.",
    characteristics: [
      "Lifespan: 1,000 years",
      "Dharma on two legs",
      "Division of knowledge",
      "Balance of light/dark"
    ]
  },
  {
    id: "kali",
    name: "Kali Yuga",
    title: "The Iron Age",
    duration: "432,000 Years",
    virtue: "25%",
    color: "from-slate-600 via-slate-800 to-slate-950",
    glowColor: "rgba(71, 85, 105, 0.3)",
    icon: "⚔️",
    description: "The current age of darkness. Yet spiritual liberation is easiest through chanting divine names.",
    characteristics: [
      "Lifespan: 100 years",
      "Dharma on one leg",
      "Spiritual ignorance",
      "Easy path via devotion"
    ]
  },
];

export default function YugaTimelinePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Yuga Timeline"
        subtitle="The Four Ages of Dharma. The cosmic progression from golden perfection to iron reality."
      >
        {/* Timeline */}
        <div className="w-full max-w-7xl mx-auto relative px-4">
          {/* Central line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-yellow-400 via-gray-400 via-amber-700 to-slate-800 opacity-30 -translate-x-1/2" />
          
          {/* Yugas */}
          <div className="space-y-24 md:space-y-40 py-12 md:py-20">
            {YUGAS.map((yuga, index) => (
              <YugaOrb key={yuga.id} yuga={yuga} index={index} isMobile={isMobile} />
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="w-full max-w-5xl mt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-6 md:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-amber-300 mb-4 font-serif">The Eternal Cycle</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              The four Yugas form one Mahayuga (4,320,000 years). One thousand Mahayugas equal one day of Brahma. 
              After 100 Brahma years (311 trillion years), complete dissolution occurs and the cosmos is reborn.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function YugaOrb({ yuga, index, isMobile }: { yuga: typeof YUGAS[0]; index: number; isMobile: boolean }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? "md:flex-row-reverse" : ""
      } pl-16 md:pl-0`}
    >
      {/* Orb */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${yuga.color} flex items-center justify-center text-2xl md:text-4xl shadow-xl will-change-transform`}
          style={{ transform: "translateZ(0)" }}
          whileHover={!isMobile ? { scale: 1.1 } : {}}
          animate={!isMobile ? {
            boxShadow: [
              `0 0 20px ${yuga.glowColor}`,
              `0 0 40px ${yuga.glowColor}`,
              `0 0 20px ${yuga.glowColor}`,
            ],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {yuga.icon}
        </motion.div>
      </div>

      {/* Content */}
      <div className="w-full md:w-[calc(50%-3rem)]">
        <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${yuga.color} bg-opacity-10 backdrop-blur-xl border border-white/10 shadow-xl`}>
          <div className="mb-4">
            <h3 className="text-2xl md:text-4xl font-bold text-white font-serif">{yuga.name}</h3>
            <p className="text-lg md:text-xl text-white/80 mt-1">{yuga.title}</p>
            <p className="text-xs md:text-sm font-mono text-white/60 mt-2">{yuga.duration}</p>
          </div>

          <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4">
            {yuga.description}
          </p>

          <div className="space-y-1.5">
            {yuga.characteristics.map((char, i) => (
              <p key={i} className="text-xs md:text-sm text-white/70">
                • {char}
              </p>
            ))}
          </div>

          {/* Virtue bar */}
          <div className="mt-6">
            <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: yuga.virtue }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-full bg-gradient-to-r ${yuga.color}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[calc(50%-3rem)]" />
    </motion.div>
  );
}
