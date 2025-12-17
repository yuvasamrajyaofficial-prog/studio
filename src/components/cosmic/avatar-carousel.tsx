"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AVATARS = [
  { id: "matsya", name: "Matsya", title: "The Fish", desc: "Saved the Vedas and the first man, Manu, from the great deluge.", color: "from-blue-400 to-blue-600", icon: "🐟" },
  { id: "kurma", name: "Kurma", title: "The Tortoise", desc: "Supported the mountain Mandara during the churning of the ocean.", color: "from-green-400 to-green-600", icon: "🐢" },
  { id: "varaha", name: "Varaha", title: "The Boar", desc: "Rescued the Earth from the cosmic ocean by lifting it on his tusks.", color: "from-amber-700 to-amber-900", icon: "🐗" },
  { id: "narasimha", name: "Narasimha", title: "The Man-Lion", desc: "Destroyed the demon Hiranyakashipu to protect his devotee Prahlada.", color: "from-orange-500 to-red-600", icon: "🦁" },
  { id: "vamana", name: "Vamana", title: "The Dwarf", desc: "Subdued King Bali and covered the universe in three steps.", color: "from-yellow-400 to-yellow-600", icon: "☂️" },
  { id: "parashurama", name: "Parashurama", title: "The Warrior", desc: "Rid the world of corrupt warriors and established justice.", color: "from-red-700 to-red-900", icon: "🪓" },
  { id: "rama", name: "Rama", title: "The Ideal King", desc: "Defeated Ravana and established the ideal kingdom (Rama Rajya).", color: "from-blue-500 to-indigo-600", icon: "🏹" },
  { id: "krishna", name: "Krishna", title: "The Divine Statesman", desc: "Delivered the Bhagavad Gita and guided the Pandavas in Kurukshetra.", color: "from-indigo-500 to-purple-600", icon: "🪈" },
  { id: "buddha", name: "Buddha", title: "The Enlightened One", desc: "Preached non-violence and compassion to all living beings.", color: "from-orange-300 to-orange-500", icon: "🧘" },
  { id: "kalki", name: "Kalki", title: "The Destroyer", desc: "Prophesied to appear at the end of Kali Yuga to restore Dharma.", color: "from-slate-200 to-white", icon: "🐎" },
];

export function AvatarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextAvatar = () => {
    setCurrentIndex((prev) => (prev + 1) % AVATARS.length);
  };

  const prevAvatar = () => {
    setCurrentIndex((prev) => (prev - 1 + AVATARS.length) % AVATARS.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center">
      {/* Navigation Buttons */}
      <button 
        onClick={prevAvatar}
        className="absolute left-0 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button 
        onClick={nextAvatar}
        className="absolute right-0 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Main Display */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-2xl bg-slate-900/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-8"
          >
            {/* Avatar Visual */}
            <div className={`w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br ${AVATARS[currentIndex].color} flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] shrink-0`}>
              <span className="text-8xl">{AVATARS[currentIndex].icon}</span>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <div className="text-sm font-mono text-white/50 mb-2">AVATAR {currentIndex + 1} OF 10</div>
              <h2 className="text-4xl font-bold text-white mb-2">{AVATARS[currentIndex].name}</h2>
              <h3 className="text-xl text-amber-400 mb-4">{AVATARS[currentIndex].title}</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {AVATARS[currentIndex].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {AVATARS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-amber-400" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
