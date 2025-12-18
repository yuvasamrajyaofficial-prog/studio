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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full text-center">
          <InfoCard 
            title="Cyclical Time" 
            desc="Time is not linear but cyclical. Creation, preservation, and destruction repeat eternally." 
          />
          <InfoCard 
            title="Micro & Macro" 
            desc="As is the atom, so is the universe. The smallest unit of time mirrors the greatest aeon." 
          />
          <InfoCard 
            title="Karma" 
            desc="The wheel turns driven by the collective Karma of all beings, determining the quality of the age." 
          />
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
