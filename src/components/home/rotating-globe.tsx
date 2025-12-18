"use client";

import { motion } from "framer-motion";

export function RotatingGlobe() {
  return (
    <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
      {/* Globe Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        
        {/* The Rotating Globe Sphere */}
        <div 
          className="absolute inset-0 rounded-full bg-black overflow-hidden"
          style={{
            boxShadow: "inset 20px 0 50px 10px rgba(0,0,0,0.9), inset -5px 0 20px rgba(255,255,255,0.1)"
          }}
        >
          {/* Map Texture */}
          <div 
            className="absolute inset-0 w-[200%] h-full opacity-80"
            style={{
              backgroundImage: "url('/images/world-map.png')",
              backgroundSize: "cover",
              backgroundRepeat: "repeat-x",
              animation: "globe-rotate 25s linear infinite"
            }}
          />
          
          {/* Atmosphere Glow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(251,191,36,0.2)]" />
        </div>

        {/* Orbital Ring 1 */}
        <div className="absolute inset-[-20px] rounded-full border border-amber-500/10 animate-spin-slow-reverse" />
        
        {/* Orbital Ring 2 */}
        <div className="absolute inset-[-40px] rounded-full border border-dashed border-amber-500/10 animate-spin-slower" />

        {/* Stats Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              10+
            </div>
            <div className="text-xs md:text-sm text-amber-300 font-bold tracking-[0.2em] uppercase drop-shadow-md">
              Countries
            </div>
          </motion.div>
          
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-4" />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              1000+
            </div>
            <div className="text-xs md:text-sm text-amber-300 font-bold tracking-[0.2em] uppercase drop-shadow-md">
              Scriptures
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes globe-rotate {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
