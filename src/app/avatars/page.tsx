"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AVATARS = [
  { name: "Matsya", title: "The Fish", symbol: "🐟", era: "Satya Yuga", purpose: "Saved Vedas from the great deluge", color: "from-blue-400 to-cyan-600" },
  { name: "Kurma", title: "The Tortoise", symbol: "🐢", era: "Satya Yuga", purpose: "Supported Mount Mandara during ocean churning", color: "from-green-400 to-emerald-600" },
  { name: "Varaha", title: "The Boar", symbol: "🐗", era: "Satya Yuga", purpose: "Rescued Earth from the cosmic ocean", color: "from-amber-600 to-orange-800" },
  { name: "Narasimha", title: "The Man-Lion", symbol: "🦁", era: "Satya Yuga", purpose: "Destroyed Hiranyakashipu, protected Prahlada", color: "from-orange-500 to-red-700" },
  { name: "Vamana", title: "The Dwarf", symbol: "☂️", era: "Treta Yuga", purpose: "Subdued King Bali, restored cosmic balance", color: "from-yellow-400 to-amber-600" },
  { name: "Parashurama", title: "Rama with Axe", symbol: "🪓", era: "Treta Yuga", purpose: "Destroyed corrupt Kshatriyas 21 times", color: "from-red-600 to-red-900" },
  { name: "Rama", title: "The Ideal King", symbol: "🏹", era: "Treta Yuga", purpose: "Defeated Ravana, established Rama Rajya", color: "from-blue-500 to-indigo-700" },
  { name: "Krishna", title: "Divine Statesman", symbol: "🪈", era: "Dwapara Yuga", purpose: "Delivered Bhagavad Gita, restored Dharma", color: "from-indigo-500 to-purple-700" },
  { name: "Buddha", title: "The Enlightened", symbol: "🧘", era: "Kali Yuga", purpose: "Taught compassion, ended animal sacrifices", color: "from-orange-300 to-orange-600" },
  { name: "Kalki", title: "The Destroyer", symbol: "🐎", era: "Future", purpose: "Will destroy evil, initiate new Satya Yuga", color: "from-slate-100 to-white" },
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
                className={`p-6 rounded-2xl bg-gradient-to-br ${AVATARS[index].color} bg-opacity-15 border border-white/20`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{AVATARS[index].symbol}</div>
                  <div className="flex-1">
                    <div className="text-xs text-white/60 mb-1">Avatar {index + 1} of 10 • {AVATARS[index].era}</div>
                    <h3 className="text-2xl font-bold text-white">{AVATARS[index].name}</h3>
                    <p className="text-lg text-white/80">{AVATARS[index].title}</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">{AVATARS[index].purpose}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setIndex((index - 1 + AVATARS.length) % AVATARS.length)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex gap-1.5">
                {AVATARS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-amber-400" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIndex((index + 1) % AVATARS.length)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* All Avatars List */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {AVATARS.map((avatar, i) => (
              <button
                key={avatar.name}
                onClick={() => setIndex(i)}
                className={`p-3 rounded-xl text-left transition-all ${
                  i === index
                    ? "bg-white/20 border border-white/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{avatar.symbol}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{avatar.name}</div>
                    <div className="text-xs text-white/60">{avatar.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <h3 className="text-xl font-bold text-amber-300 mb-3">Divine Descents</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Dashavatara represent the ten primary incarnations of Vishnu, descending whenever Dharma declines. 
              The sequence mirrors evolution: aquatic, amphibian, land animal, half-animal, to human forms.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}
