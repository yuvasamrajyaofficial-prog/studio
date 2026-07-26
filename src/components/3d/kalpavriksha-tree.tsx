"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Compass, User, Award, Shield } from "lucide-react";
import Link from "next/link";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";

interface TreeBranchNode {
  id: string;
  title: string;
  sanskrit: string;
  description: string;
  icon: any;
  href: string;
  x: number; // percentage
  y: number; // percentage
  color: string;
}

export function KalpavrikshaTree() {
  const [activeNode, setActiveNode] = useState<TreeBranchNode | null>(null);

  const branchNodes: TreeBranchNode[] = [
    {
      id: "scriptures",
      title: "Vedas & Scriptures",
      sanskrit: "वेद एवं शास्त्र",
      description: "Explore Bhagavad Gita, Upanishads & ancient texts in Kannada, English & Hindi.",
      icon: BookOpen,
      href: "/scriptures",
      x: 24,
      y: 28,
      color: "from-amber-500 to-yellow-300"
    },
    {
      id: "ai-guide",
      title: "Cosmic AI Guide",
      sanskrit: "दिव्य विचार",
      description: "Voice-activated AI guidance grounded in traditional Vedic philosophy.",
      icon: Sparkles,
      href: "/cosmos",
      x: 74,
      y: 26,
      color: "from-purple-500 to-pink-400"
    },
    {
      id: "panchang",
      title: "Ephemeris & Panchang",
      sanskrit: "पञ्चाङ्ग गणित",
      description: "Real-time planetary calculations for Tithi, Nakshatra, Yoga & Rahu Kalam.",
      icon: Compass,
      href: "/cosmos",
      x: 18,
      y: 52,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "soul-id",
      title: "Soul ID Astrological Engine",
      sanskrit: "आत्म परिज्ञान",
      description: "Deterministic calculations for Rashi, Nakshatra, Lagna, Guna & Dosha.",
      icon: User,
      href: "/soul-id",
      x: 82,
      y: 50,
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: "karma-engine",
      title: "Karma & Sadhana Meter",
      sanskrit: "कर्म साधना",
      description: "Track daily spiritual practices, earn Karma points & unlock Sadhaka tiers.",
      icon: Award,
      href: "/dashboard",
      x: 50,
      y: 20,
      color: "from-orange-400 to-amber-500"
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[500px] flex items-center justify-center py-6 select-none">
      {/* Background Radiant Prana Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-purple-500/10 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Floating Sanskrit Mantras in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 flex flex-col justify-between p-4 text-amber-300 font-serif text-sm tracking-widest">
        <motion.div 
          animate={{ x: [-20, 20, -20] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="text-left"
        >
          ॐ नमो नारायणाय • असतो मा सद्गमय
        </motion.div>
        <motion.div 
          animate={{ x: [20, -20, 20] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="text-right"
        >
          तमसो मा ज्योतिर्गमय • मृत्योर्मा अमृतं गमय
        </motion.div>
      </div>

      {/* Main SVG Tree Structure */}
      <div className="relative w-full aspect-[4/3] max-h-[520px] flex items-center justify-center">
        {/* Crown Sudharshana Chakra */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-2 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full" />
            <SudharshanaChakraIcon className="w-16 h-16 md:w-20 md:h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
          </div>
        </motion.div>

        {/* 3D Trunk & Sacred Branch SVG Path */}
        <svg 
          viewBox="0 0 800 600" 
          className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,158,11,0.25)]"
        >
          <defs>
            {/* Trunk Gradient */}
            <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Glowing Foliage Gradient */}
            <radialGradient id="foliageGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#d97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radiant Foliage Canopy Backing */}
          <circle cx="400" cy="220" r="190" fill="url(#foliageGlow)" />
          <circle cx="300" cy="250" r="130" fill="url(#foliageGlow)" />
          <circle cx="500" cy="250" r="130" fill="url(#foliageGlow)" />

          {/* Tree Trunk Base */}
          <path
            d="M 370,580 Q 380,420 385,340 C 385,300 370,250 320,200 Q 250,130 180,180"
            fill="none"
            stroke="url(#trunkGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 430,580 Q 420,420 415,340 C 415,300 430,250 480,200 Q 550,130 620,180"
            fill="none"
            stroke="url(#trunkGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Main Central Trunk */}
          <path
            d="M 400,590 L 400,280 Q 400,180 400,100"
            fill="none"
            stroke="url(#trunkGrad)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Dynamic Secondary Branches */}
          <path
            d="M 400,320 Q 320,270 200,310"
            fill="none"
            stroke="url(#trunkGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 400,320 Q 480,270 600,310"
            fill="none"
            stroke="url(#trunkGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Shimmering Golden Prana Leaves (SVG Circles) */}
          {[
            { cx: 380, cy: 110, r: 8 }, { cx: 420, cy: 110, r: 8 },
            { cx: 340, cy: 150, r: 10 }, { cx: 460, cy: 150, r: 10 },
            { cx: 280, cy: 180, r: 12 }, { cx: 520, cy: 180, r: 12 },
            { cx: 200, cy: 260, r: 10 }, { cx: 600, cy: 260, r: 10 },
            { cx: 240, cy: 300, r: 9 }, { cx: 560, cy: 300, r: 9 },
          ].map((leaf, idx) => (
            <motion.circle
              key={idx}
              cx={leaf.cx}
              cy={leaf.cy}
              r={leaf.r}
              fill="#fbbf24"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Floating Branch Feature Nodes */}
        {branchNodes.map((node) => {
          const IconComp = node.icon;
          const isActive = activeNode?.id === node.id;

          return (
            <motion.div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onClick={() => setActiveNode(node)}
              >
                {/* Aura Pulse */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${node.color} rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity animate-pulse`} />
                
                {/* Node Orb */}
                <Link href={node.href}>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-950/90 border-2 border-amber-400/80 flex flex-col items-center justify-center shadow-lg shadow-amber-500/20 text-white relative z-10 transition-all duration-300 ${isActive ? 'ring-4 ring-amber-400/50 scale-110' : ''}`}>
                    <IconComp className="w-5 h-5 md:w-6 md:h-6 text-amber-300 group-hover:text-amber-200" />
                  </div>
                </Link>

                {/* Node Badge Text */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap z-20 pointer-events-none">
                  <span className="text-[11px] font-bold text-amber-200 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30 shadow-md">
                    {node.title}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Node Info Modal / Card */}
      {activeNode && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-slate-950/90 backdrop-blur-xl border border-amber-500/40 p-4 rounded-2xl shadow-2xl text-foreground z-40"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {activeNode.sanskrit}
                </span>
                <h4 className="font-bold text-base text-foreground">{activeNode.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {activeNode.description}
              </p>
            </div>
            
            <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shrink-0 text-xs px-3">
              <Link href={activeNode.href}>Explore</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
