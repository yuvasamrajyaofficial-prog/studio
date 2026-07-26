"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const YUGAS = [
  {
    id: "satya",
    name: "Satya Yuga",
    subtitle: "Age of Truth",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.4)",
    bg: "from-yellow-900/40 to-yellow-700/20",
    border: "border-yellow-400/40",
    duration: "1,728,000 Yrs",
    virtue: 100,
    icon: "✨",
    desc: "The Golden Age. Humanity lives in perfect harmony with the cosmos. Truth reigns supreme and consciousness is at its peak.",
    scriptures: ["Vedas", "Upanishads", "Original Sutras"],
  },
  {
    id: "treta",
    name: "Treta Yuga",
    subtitle: "Silver Age",
    color: "#C0C0C0",
    glow: "rgba(192,192,192,0.35)",
    bg: "from-slate-700/40 to-slate-500/20",
    border: "border-slate-300/40",
    duration: "1,296,000 Yrs",
    virtue: 75,
    icon: "🔥",
    desc: "Virtue diminishes slightly. The age of great emperors and epic sacrifices. Courage and ritual become the path to the divine.",
    scriptures: ["Ramayana", "Rigveda", "Yoga Sutras"],
  },
  {
    id: "dwapara",
    name: "Dwapara Yuga",
    subtitle: "Bronze Age",
    color: "#CD7F32",
    glow: "rgba(205,127,50,0.35)",
    bg: "from-amber-900/40 to-amber-700/20",
    border: "border-amber-500/40",
    duration: "864,000 Yrs",
    virtue: 50,
    icon: "⚖️",
    desc: "The age of duality. The Vedas are divided into four. Truth and illusion become difficult to distinguish from each other.",
    scriptures: ["Mahabharata", "Bhagavad Gita", "Puranas"],
  },
  {
    id: "kali",
    name: "Kali Yuga",
    subtitle: "Iron Age (Now)",
    color: "#9B59B6",
    glow: "rgba(155,89,182,0.4)",
    bg: "from-violet-900/40 to-violet-700/20",
    border: "border-violet-500/40",
    duration: "432,000 Yrs",
    virtue: 25,
    icon: "⚔️",
    desc: "The current age of spiritual darkness. Yet liberation is easiest to attain — a single moment of devotion carries the power of a thousand years in Satya Yuga.",
    scriptures: ["Kali Santarana", "Modern Philosophy", "World Traditions"],
  },
];

export function YugaTimeline({
  selectedEra,
  onSelectEra,
}: {
  selectedEra?: string;
  onSelectEra?: (eraId: string) => void;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Connecting progress line */}
      <div className="relative mb-6 hidden md:block">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500/50 via-slate-400/50 via-amber-500/50 to-violet-500/50 -translate-y-1/2" />
        <div className="flex justify-between relative">
          {YUGAS.map((yuga, index) => (
            <button
              key={yuga.id}
              onClick={() => onSelectEra?.(yuga.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 relative z-10 bg-background"
                style={{
                  borderColor: selectedEra === yuga.id ? yuga.color : 'rgba(255,255,255,0.2)',
                  boxShadow: selectedEra === yuga.id ? `0 0 20px ${yuga.glow}` : 'none',
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {yuga.icon}
              </motion.div>
              <span
                className="text-xs font-mono uppercase tracking-wider transition-colors duration-300"
                style={{ color: selectedEra === yuga.id ? yuga.color : 'rgba(255,255,255,0.5)' }}
              >
                {yuga.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Era cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {YUGAS.map((yuga) => {
          const isActive = selectedEra === yuga.id;
          return (
            <motion.button
              key={yuga.id}
              onClick={() => onSelectEra?.(yuga.id)}
              className={`text-left rounded-2xl border bg-gradient-to-br backdrop-blur-sm p-4 md:p-5 cursor-pointer transition-all duration-300 ${yuga.bg} ${yuga.border} ${
                isActive ? 'ring-1' : 'hover:scale-[1.02]'
              }`}
              style={{
                ringColor: isActive ? yuga.color : 'transparent',
                boxShadow: isActive ? `0 0 30px ${yuga.glow}, inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl md:text-3xl">{yuga.icon}</span>
                <span
                  className="text-[10px] font-mono uppercase tracking-widest opacity-70"
                  style={{ color: yuga.color }}
                >
                  {yuga.duration}
                </span>
              </div>

              <h3
                className="font-headline font-bold text-base md:text-lg mb-0.5"
                style={{ color: isActive ? yuga.color : 'white' }}
              >
                {yuga.name}
              </h3>
              <p className="text-xs text-white/50 mb-3">{yuga.subtitle}</p>

              {/* Virtue bar */}
              <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${yuga.virtue}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full"
                  style={{ backgroundColor: yuga.color }}
                />
              </div>
              <p className="text-[10px] text-white/40 font-mono">{yuga.virtue}% Dharma</p>

              {/* Expanded content when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/70 leading-relaxed mb-3">
                        {yuga.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {yuga.scriptures.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
