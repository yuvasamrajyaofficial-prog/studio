"use client";

import React from "react";
import { motion } from "framer-motion";

const SAPTARISHIS = [
  { id: "kashyapa", name: "Kashyapa", desc: "The father of Devas, Asuras, Nagas, and all humanity.", x: 50, y: 20 },
  { id: "atri", name: "Atri", desc: "The seer of the fifth Mandala of Rigveda.", x: 20, y: 40 },
  { id: "vasishtha", name: "Vasishtha", desc: "Guru of Lord Rama. Possessor of Kamadhenu.", x: 80, y: 40 },
  { id: "vishvamitra", name: "Vishvamitra", desc: "The creator of the Gayatri Mantra.", x: 20, y: 70 },
  { id: "gautama", name: "Gautama", desc: "Discoverer of Mantras. Husband of Ahalya.", x: 80, y: 70 },
  { id: "jamadagni", name: "Jamadagni", desc: "Father of Parashurama. Master of weaponry.", x: 35, y: 90 },
  { id: "bharadwaja", name: "Bharadwaja", desc: "Scholar of Ayurveda and advanced sciences.", x: 65, y: 90 },
];

export function LineageTree() {
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] bg-slate-900/50 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Connecting Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d="M 50% 20% L 20% 40% L 20% 70% M 50% 20% L 80% 40% L 80% 70% M 20% 40% L 35% 90% M 80% 40% L 65% 90%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {SAPTARISHIS.map((rishi, index) => (
        <RishiNode key={rishi.id} rishi={rishi} index={index} />
      ))}
    </div>
  );
}

function RishiNode({ rishi, index }: { rishi: any; index: number }) {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${rishi.x}%`, top: `${rishi.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.2, type: "spring" }}
    >
      {/* Node Circle */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-600 p-1 shadow-[0_0_30px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_50px_rgba(251,191,36,0.8)] transition-shadow duration-300">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center border border-white/20">
          <span className="text-2xl">🧘</span>
        </div>
      </div>

      {/* Label & Info */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
        <div className="bg-slate-800/90 p-3 rounded-lg border border-amber-500/30 backdrop-blur-md">
          <h4 className="text-amber-400 font-bold mb-1">{rishi.name}</h4>
          <p className="text-xs text-slate-300 leading-tight">{rishi.desc}</p>
        </div>
      </div>
      
      {/* Name Label (Always visible) */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm font-medium text-amber-200/80 whitespace-nowrap group-hover:opacity-0 transition-opacity">
        {rishi.name}
      </div>
    </motion.div>
  );
}
