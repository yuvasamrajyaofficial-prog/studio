"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AVATARS = [
  { name: "Matsya", title: "The Fish", symbol: "🐟", era: "Satya Yuga", purpose: "Saved Vedas from the great deluge", bg: "bg-gradient-to-br from-blue-900/70 to-cyan-900/70", border: "border-blue-500/40" },
  { name: "Kurma", title: "The Tortoise", symbol: "🐢", era: "Satya Yuga", purpose: "Supported Mount Mandara during ocean churning", bg: "bg-gradient-to-br from-green-900/70 to-emerald-900/70", border: "border-green-500/40" },
  { name: "Varaha", title: "The Boar", symbol: "🐗", era: "Satya Yuga", purpose: "Rescued Earth from the cosmic ocean", bg: "bg-gradient-to-br from-amber-900/70 to-orange-900/70", border: "border-amber-500/40" },
  { name: "Narasimha", title: "The Man-Lion", symbol: "🦁", era: "Satya Yuga", purpose: "Destroyed Hiranyakashipu, protected Prahlada", bg: "bg-gradient-to-br from-orange-900/70 to-red-900/70", border: "border-orange-500/40" },
  { name: "Vamana", title: "The Dwarf", symbol: "☂️", era: "Treta Yuga", purpose: "Subdued King Bali, restored cosmic balance", bg: "bg-gradient-to-br from-yellow-900/70 to-amber-900/70", border: "border-yellow-500/40" },
  { name: "Parashurama", title: "Rama with Axe", symbol: "🪓", era: "Treta Yuga", purpose: "Destroyed corrupt Kshatriyas 21 times", bg: "bg-gradient-to-br from-red-900/70 to-rose-900/70", border: "border-red-500/40" },
  { name: "Rama", title: "The Ideal King", symbol: "🏹", era: "Treta Yuga", purpose: "Defeated Ravana, established Rama Rajya", bg: "bg-gradient-to-br from-blue-900/70 to-indigo-900/70", border: "border-blue-500/40" },
  { name: "Krishna", title: "Divine Statesman", symbol: "🪈", era: "Dwapara Yuga", purpose: "Delivered Bhagavad Gita, restored Dharma", bg: "bg-gradient-to-br from-indigo-900/70 to-purple-900/70", border: "border-indigo-500/40" },
  { name: "Buddha", title: "The Enlightened", symbol: "🧘", era: "Kali Yuga", purpose: "Taught compassion, ended animal sacrifices", bg: "bg-gradient-to-br from-orange-900/70 to-amber-900/70", border: "border-orange-400/40" },
  { name: "Kalki", title: "The Destroyer", symbol: "🐎", era: "Future", purpose: "Will destroy evil, initiate new Satya Yuga", bg: "bg-gradient-to-br from-slate-800/80 to-gray-800/80", border: "border-slate-400/50" },
];

export default function AvatarsPage() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Dashavatara"
        subtitle="The Ten Incarnations. Divine descents to restore Dharma through the ages."
      >
        <div className="w-full max-w-3xl mx-auto px-4">
          {/* Carousel */}
          <div className="relative mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-6 rounded-2xl ${AVATARS[index].bg} border ${AVATARS[index].border} backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{AVATARS[index].symbol}</div>
                  <div className="flex-1">
                    <div className="text-xs text-slate-400 mb-1">Avatar {index + 1} of 10 • {AVATARS[index].era}</div>
                    <h3 className="text-2xl font-bold text-white">{AVATARS[index].name}</h3>
                    <p className="text-lg text-slate-200">{AVATARS[index].title}</p>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{AVATARS[index].purpose}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setIndex((index - 1 + AVATARS.length) % AVATARS.length)}
                className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex gap-1.5">
                {AVATARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-amber-400" : "w-1.5 bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((index + 1) % AVATARS.length)}
                className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/20 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* All Avatars Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {AVATARS.map((avatar, i) => (
              <button
                key={avatar.name}
                onClick={() => setIndex(i)}
                className={`p-3 rounded-xl text-left transition-all ${avatar.bg} ${avatar.border} backdrop-blur-sm ${
                  i === index
                    ? "ring-2 ring-amber-400/50"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{avatar.symbol}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{avatar.name}</div>
                    <div className="text-xs text-slate-300">{avatar.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-purple-900/40 border border-amber-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-amber-300 mb-3">Divine Descents</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              The Dashavatara represent the ten primary incarnations of Vishnu, descending whenever Dharma declines. 
              The sequence mirrors evolution: aquatic, amphibian, land animal, half-animal, to human forms.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}
