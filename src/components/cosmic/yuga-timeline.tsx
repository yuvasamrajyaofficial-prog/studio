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
    <div className="w-full max-w-7xl mx-auto py-20 px-4 relative">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-gray-400 to-slate-800 -translate-x-1/2 opacity-30" />

      <div className="space-y-32 md:space-y-48">
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
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
        isEven ? "md:flex-row-reverse" : ""
      } pl-12 md:pl-0`}
    >
      {/* Timeline Node */}
      <div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full bg-black border-4 border-white z-10 -translate-x-1/2 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.6)]">
        <span className="text-sm font-bold">{index + 1}</span>
      </div>

      {/* Content Card */}
      <div className="w-full md:w-[calc(50%-3rem)]">
        <div className={`p-8 md:p-10 rounded-3xl bg-gradient-to-br ${yuga.color} bg-opacity-10 backdrop-blur-xl border border-white/10 shadow-2xl group hover:scale-105 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] relative overflow-hidden`}>
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="text-5xl md:text-6xl filter drop-shadow-lg">{yuga.icon}</div>
            <div className="text-right">
              <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md font-serif">{yuga.name}</h3>
              <span className="text-sm md:text-base font-mono text-white/80 uppercase tracking-widest mt-2 block">
                {yuga.duration}
              </span>
            </div>
          </div>
          
          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 relative z-10">
            {yuga.desc}
          </p>

          <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden relative z-10">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: yuga.virtue.split('%')[0] + '%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white/90 shadow-[0_0_15px_white]" 
            />
          </div>
          <div className="flex justify-between text-xs md:text-sm mt-2 text-white/70 uppercase font-bold relative z-10">
            <span>Virtue (Dharma)</span>
            <span>{yuga.virtue}</span>
          </div>
        </div>
      </div>

      {/* Empty space for the other side - visible only on desktop */}
      <div className="hidden md:block w-[calc(50%-3rem)]" />
    </motion.div>
  );
}
