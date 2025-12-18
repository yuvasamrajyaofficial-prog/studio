"use client";

import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { CosmicWheel } from "@/components/cosmic/cosmic-wheel";
import { motion } from "framer-motion";

export default function KalacakraPage() {
  return (
    <CosmicLayout
      title="Kālacakra"
      subtitle="The Eternal Wheel of Time. Witness the cyclical nature of the universe, from the blink of an eye to the age of Brahma."
    >
      <div className="flex flex-col items-center gap-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <CosmicWheel />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-colors">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">The 6 Spokes: Ritus (Seasons)</h2>
            <p className="text-slate-300 leading-relaxed">
              In Hindu cosmology, the Kālacakra is often visualized with six spokes, representing the six seasons (Ritus) that make up a year. These are Vasant (Spring), Grishma (Summer), Varsha (Monsoon), Sharad (Autumn), Hemant (Pre-winter), and Shishir (Winter). This cycle governs the rhythm of life on Earth.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-colors">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">The 12 Masas (Months)</h2>
            <p className="text-slate-300 leading-relaxed">
              The year is further divided into 12 lunar months (Masas), each aligned with the movement of the Sun into a new Rashi (Zodiac sign). This layer connects the macrocosmic movement of celestial bodies with the microcosmic passage of time in human life.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-purple-400/50 transition-colors">
            <h2 className="text-2xl font-bold text-purple-400 mb-4">27 Nakshatras (Constellations)</h2>
            <p className="text-slate-300 leading-relaxed">
              The Moon travels through 27 Nakshatras (lunar mansions) in a month. These stars are the wives of Chandra (Moon) and influence the mental and emotional state of beings. They are the subtle markers of time used in Vedic astrology.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-slate-400/50 transition-colors">
            <h2 className="text-2xl font-bold text-slate-400 mb-4">60 Samvatsaras (Jovian Cycle)</h2>
            <p className="text-slate-300 leading-relaxed">
              The outermost cycle consists of 60 Samvatsaras (years), determined by the relative positions of Jupiter (Brihaspati) and Saturn (Shani). Each year has a unique name and specific prediction, repeating every 60 years.
            </p>
          </div>
        </div>
      </div>
    </CosmicLayout>
  );
}

function InfoCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm"
    >
      <h3 className="text-lg font-semibold text-amber-300 mb-2">{title}</h3>
      <p className="text-sm text-slate-300 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
