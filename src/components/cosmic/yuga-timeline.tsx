"use client";

import React from "react";
import { motion } from "framer-motion";

const YUGAS = [
  {
    id: "satya",
    name: "Satya Yuga",
    color: "from-yellow-200 to-yellow-500",
    duration: "1,728,000 Years",
    virtue: "100% Dharma",
    desc: "The Age of Truth. Humanity is governed by gods, and every manifestation or work is close to the purest ideal. There is no need for writing, as people communicate directly by thought.",
    icon: "✨",
  },
  {
    id: "treta",
    name: "Treta Yuga",
    color: "from-gray-100 to-gray-400",
    duration: "1,296,000 Years",
    virtue: "75% Dharma",
    desc: "The Silver Age. Virtue diminishes slightly. Emperors rise to conquer the world, and wars become necessary to establish Dharma. Rituals and sacrifices become the primary path to the divine.",
    icon: "🔥",
  },
  {
    id: "dwapara",
    name: "Dwapara Yuga",
    color: "from-amber-600 to-amber-800",
    duration: "864,000 Years",
    virtue: "50% Dharma",
    desc: "The Bronze Age. Disease and death become more common. The Vedas are divided into four parts. Truth becomes harder to discern, and people become competitive and pleasure-seeking.",
    icon: "⚖️",
  },
  {
    id: "kali",
    name: "Kali Yuga",
    color: "from-slate-700 to-slate-900",
    duration: "432,000 Years",
    virtue: "25% Dharma",
    desc: "The Iron Age. The current age of darkness and ignorance. Virtue has reduced to a quarter. Strife, discord, and hypocrisy are rampant. Yet, spiritual liberation is easiest to attain through chanting.",
    icon: "⚔️",
  },
];

export function YugaTimeline() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 relative">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-gray-400 to-slate-800 -translate-x-1/2 opacity-30" />

      <div className="space-y-24">
        {YUGAS.map((yuga, index) => (
          <YugaCard key={yuga.id} yuga={yuga} index={index} />
        ))}
      </div>
    </div>
  );
}

function YugaCard({ yuga, index }: { yuga: typeof YUGAS[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-black border-4 border-white z-10 -translate-x-1/2 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        <span className="text-xs">{index + 1}</span>
      </div>

      {/* Content Card */}
      <div className="w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0">
        <div className={`p-6 rounded-2xl bg-gradient-to-br ${yuga.color} bg-opacity-10 backdrop-blur-md border border-white/10 shadow-2xl group hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden`}>
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="text-4xl filter drop-shadow-lg">{yuga.icon}</div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-white drop-shadow-md">{yuga.name}</h3>
              <span className="text-xs font-mono text-white/80 uppercase tracking-widest">
                {yuga.duration}
              </span>
            </div>
          </div>
          
          <p className="text-white/90 text-sm leading-relaxed mb-4 relative z-10">
            {yuga.desc}
          </p>

          <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden relative z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: yuga.virtue.split('%')[0] + '%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white/80 shadow-[0_0_10px_white]" 
            />
          </div>
          <div className="flex justify-between text-[10px] mt-1 text-white/60 uppercase font-bold relative z-10">
            <span>Virtue (Dharma)</span>
            <span>{yuga.virtue}</span>
          </div>
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
}
