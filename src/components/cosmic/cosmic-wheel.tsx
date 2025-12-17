"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHEEL_LAYERS = [
  { id: "seconds", label: "Kshana", segments: 12, color: "border-blue-500/30", speed: 10 },
  { id: "minutes", label: "Pala", segments: 60, color: "border-purple-500/30", speed: 20 },
  { id: "hours", label: "Ghatika", segments: 24, color: "border-pink-500/30", speed: 40 },
  { id: "yugas", label: "Yuga", segments: 4, color: "border-amber-500/50", speed: 100 },
];

export function CosmicWheel() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      {/* Center Sun/Core */}
      <div className="absolute z-50 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 shadow-[0_0_50px_rgba(255,165,0,0.6)] flex items-center justify-center">
        <span className="text-black font-bold text-xl">KAALA</span>
      </div>

      {/* Rotating Layers */}
      {WHEEL_LAYERS.map((layer, index) => (
        <WheelLayer
          key={layer.id}
          radius={100 + index * 60}
          speed={layer.speed}
          color={layer.color}
          segments={layer.segments}
          isActive={activeLayer === layer.id}
          onHover={() => setActiveLayer(layer.id)}
          onLeave={() => setActiveLayer(null)}
          label={layer.label}
        />
      ))}

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {activeLayer && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute -right-64 top-1/2 -translate-y-1/2 w-60 bg-slate-900/90 border border-slate-700 p-4 rounded-lg backdrop-blur-md shadow-xl"
          >
            <h3 className="text-xl font-bold text-amber-400 mb-2">
              {WHEEL_LAYERS.find((l) => l.id === activeLayer)?.label}
            </h3>
            <p className="text-sm text-slate-300">
              A unit of time in the cosmic cycle. The wheel turns eternally, marking the passage from creation to dissolution.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface WheelLayerProps {
  radius: number;
  speed: number;
  color: string;
  segments: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  label: string;
}

function WheelLayer({ radius, speed, color, segments, isActive, onHover, onLeave, label }: WheelLayerProps) {
  return (
    <motion.div
      className={`absolute rounded-full border-2 ${color} ${isActive ? "border-opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "border-opacity-30"}`}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Segments/Ticks */}
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-1/2 w-0.5 h-2 bg-current -translate-x-1/2 origin-bottom"
          style={{
            transform: `rotate(${(360 / segments) * i}deg) translateY(-${radius - 4}px)`,
            backgroundColor: isActive ? "white" : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
      
      {/* Label on the ring (optional, just one to show identity) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </div>
    </motion.div>
  );
}
