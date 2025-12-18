"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const AVATARS = [
  { 
    name: "Matsya", 
    title: "The Fish", 
    symbol: "🐟", 
    image: "/images/avatars/matsya.png",
    era: "Satya Yuga", 
    purpose: "Saved Vedas from the great deluge", 
    bg: "bg-gradient-to-br from-blue-900/80 to-cyan-900/80", 
    border: "border-blue-500/50" 
  },
  { 
    name: "Kurma", 
    title: "The Tortoise", 
    symbol: "🐢", 
    image: "/images/avatars/kurma.png",
    era: "Satya Yuga", 
    purpose: "Supported Mount Mandara during ocean churning", 
    bg: "bg-gradient-to-br from-green-900/80 to-emerald-900/80", 
    border: "border-green-500/50" 
  },
  { 
    name: "Varaha", 
    title: "The Boar", 
    symbol: "🐗", 
    image: "/images/avatars/varaha.png",
    era: "Satya Yuga", 
    purpose: "Rescued Earth from the cosmic ocean", 
    bg: "bg-gradient-to-br from-amber-900/80 to-orange-900/80", 
    border: "border-amber-500/50" 
  },
  { 
    name: "Narasimha", 
    title: "The Man-Lion", 
    symbol: "🦁", 
    image: "/images/avatars/narasimha.png",
    era: "Satya Yuga", 
    purpose: "Destroyed Hiranyakashipu, protected Prahlada", 
    bg: "bg-gradient-to-br from-orange-900/80 to-red-900/80", 
    border: "border-orange-500/50" 
  },
  { 
    name: "Vamana", 
    title: "The Dwarf", 
    symbol: "☂️", 
    image: "/images/avatars/vamana.png",
    era: "Treta Yuga", 
    purpose: "Subdued King Bali, restored cosmic balance", 
    bg: "bg-gradient-to-br from-yellow-900/80 to-amber-900/80", 
    border: "border-yellow-500/50" 
  },
  { 
    name: "Parashurama", 
    title: "Rama with Axe", 
    symbol: "🪓", 
    image: "/images/avatars/parashurama.png",
    era: "Treta Yuga", 
    purpose: "Destroyed corrupt Kshatriyas 21 times", 
    bg: "bg-gradient-to-br from-red-900/80 to-rose-900/80", 
    border: "border-red-500/50" 
  },
  { 
    name: "Rama", 
    title: "The Ideal King", 
    symbol: "🏹", 
    image: "/images/avatars/rama.png",
    era: "Treta Yuga", 
    purpose: "Defeated Ravana, established Rama Rajya", 
    bg: "bg-gradient-to-br from-blue-900/80 to-indigo-900/80", 
    border: "border-blue-500/50" 
  },
  { 
    name: "Krishna", 
    title: "Divine Statesman", 
    symbol: "🪈", 
    image: null,
    era: "Dwapara Yuga", 
    purpose: "Delivered Bhagavad Gita, restored Dharma", 
    bg: "bg-gradient-to-br from-indigo-900/80 to-purple-900/80", 
    border: "border-indigo-500/50" 
  },
  { 
    name: "Buddha", 
    title: "The Enlightened", 
    symbol: "🧘", 
    image: null,
    era: "Kali Yuga", 
    purpose: "Taught compassion, ended animal sacrifices", 
    bg: "bg-gradient-to-br from-orange-900/80 to-amber-900/80", 
    border: "border-orange-400/50" 
  },
  { 
    name: "Kalki", 
    title: "The Destroyer", 
    symbol: "🐎", 
    image: "/images/avatars/kalki.png",
    era: "Future", 
    purpose: "Will destroy evil, initiate new Satya Yuga", 
    bg: "bg-gradient-to-br from-slate-800/90 to-gray-800/90", 
    border: "border-slate-400/60" 
  },
];

export default function AvatarsPage() {
  const [index, setIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (idx: number) => {
    setImageErrors(prev => new Set(prev).add(idx));
  };

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Dashavatara"
        subtitle="The Ten Incarnations. Divine descents to restore Dharma through the ages."
      >
        <div className="w-full max-w-4xl mx-auto px-4">
          {/* 3D Carousel */}
          <div className="relative mb-12 perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-3xl ${AVATARS[index].bg} border ${AVATARS[index].border} backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-3d`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                  {/* Avatar Image Frame */}
                  <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 rounded-2xl bg-black/40 border-2 border-white/20 flex items-center justify-center overflow-hidden shadow-2xl">
                    {AVATARS[index].image && !imageErrors.has(index) ? (
                      <Image
                        src={AVATARS[index].image!}
                        alt={AVATARS[index].name}
                        width={224}
                        height={224}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <span className="text-8xl">{AVATARS[index].symbol}</span>
                    )}
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-sm text-amber-300 font-bold tracking-widest uppercase mb-2">Avatar {index + 1} of 10 • {AVATARS[index].era}</div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{AVATARS[index].name}</h3>
                    <p className="text-2xl text-slate-200 font-light italic">{AVATARS[index].title}</p>
                    <div className="h-1 w-20 bg-white/30 rounded-full my-4 mx-auto md:mx-0" />
                    <p className="text-slate-100 text-lg leading-relaxed">{AVATARS[index].purpose}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 px-4">
              <button
                onClick={() => setIndex((index - 1 + AVATARS.length) % AVATARS.length)}
                className="p-4 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <div className="flex gap-2">
                {AVATARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" : "w-2 bg-slate-600 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((index + 1) % AVATARS.length)}
                className="p-4 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 backdrop-blur-sm shadow-lg transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* All Avatars Grid - Miniatures */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {AVATARS.map((avatar, i) => (
              <button
                key={avatar.name}
                onClick={() => setIndex(i)}
                className={`p-3 rounded-xl text-center transition-all duration-300 ${avatar.bg} ${avatar.border} backdrop-blur-sm ${
                  i === index
                    ? "ring-2 ring-amber-400/80 scale-105 shadow-lg z-10"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <div className="text-3xl mb-1">{avatar.symbol}</div>
                <div className="text-xs font-bold text-white truncate">{avatar.name}</div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-amber-900/40 to-purple-900/40 border border-amber-500/30 backdrop-blur-md shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-4">Divine Descents</h3>
            <p className="text-slate-200 text-base leading-relaxed">
              The Dashavatara represent the ten primary incarnations of Vishnu, descending whenever Dharma declines. 
              The sequence mirrors biological evolution: aquatic (Matsya), amphibian (Kurma), land animal (Varaha), 
              half-animal (Narasimha), dwarf human (Vamana), warrior (Parashurama), ideal king (Rama), 
              statesman (Krishna), sage (Buddha), and future cosmic warrior (Kalki).
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}
