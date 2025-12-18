"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Layer {
  id: string;
  label: string;
  radius: number;
  speed: number;
  segments: number;
  color: string;
}

const LAYERS: Layer[] = [
  { id: "ritu", label: "6 Ritus (Seasons)", radius: 150, speed: 60, segments: 6, color: "border-blue-400/40" },
  { id: "masa", label: "12 Masas (Months)", radius: 220, speed: 40, segments: 12, color: "border-purple-400/40" },
  { id: "nakshatra", label: "27 Nakshatras", radius: 290, speed: 25, segments: 27, color: "border-pink-400/40" },
  { id: "samvatsara", label: "60 Samvatsaras", radius: 360, speed: 15, segments: 60, color: "border-amber-400/50" },
];

export function KalacakraWheel3D() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[900px] aspect-square mx-auto perspective-[2000px]">
      {/* Central glowing core */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 40px rgba(255, 165, 0, 0.6), 0 0 80px rgba(255, 165, 0, 0.4)",
              "0 0 60px rgba(255, 165, 0, 0.8), 0 0 120px rgba(255, 165, 0, 0.6)",
              "0 0 40px rgba(255, 165, 0, 0.6), 0 0 80px rgba(255, 165, 0, 0.4)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-black font-bold text-xl md:text-3xl font-serif relative z-10">KĀLA</span>
          
          {/* Particle emission effect */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-300/60 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-80px)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Rotating layers */}
      {LAYERS.map((layer, index) => (
        <WheelLayer
          key={layer.id}
          layer={layer}
          isHovered={hoveredLayer === layer.id}
          onHover={() => setHoveredLayer(layer.id)}
          onLeave={() => setHoveredLayer(null)}
          depth={index}
        />
      ))}

      {/* Info tooltip */}
      {hoveredLayer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-md z-50"
        >
          <p className="text-amber-400 font-bold text-sm">
            {LAYERS.find(l => l.id === hoveredLayer)?.label}
          </p>
          <p className="text-slate-300 text-xs mt-1">
            {hoveredLayer === "ritu" && "The six seasons of the year, each lasting 2 months"}
            {hoveredLayer === "masa" && "The twelve lunar months marking the passage of time"}
            {hoveredLayer === "nakshatra" && "The 27 lunar mansions guiding cosmic rhythms"}
            {hoveredLayer === "samvatsara" && "The 60-year cycle completing the cosmic calendar"}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function WheelLayer({ layer, isHovered, onHover, onLeave, depth }: {
  layer: Layer;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  depth: number;
}) {
  return (
    <motion.div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none`}
      style={{
        transform: `translateZ(${depth * 20}px)`,
      }}
    >
      <motion.div
        className={`absolute rounded-full border-2 ${layer.color} ${
          isHovered ? "border-opacity-100 shadow-[0_0_40px_rgba(255,255,255,0.3)]" : "border-opacity-30"
        } pointer-events-auto cursor-pointer transition-all duration-300`}
        style={{
          width: layer.radius * 2,
          height: layer.radius * 2,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: layer.speed,
          repeat: Infinity,
          ease: "linear",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Glow effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-white/5" />
        )}

        {/* Segment markers */}
        {Array.from({ length: layer.segments }).map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 left-1/2 w-0.5 -translate-x-1/2 origin-bottom transition-all ${
              isHovered ? "h-4 bg-white shadow-[0_0_8px_white]" : "h-2 bg-white/30"
            }`}
            style={{
              transform: `translateX(-50%) rotate(${(360 / layer.segments) * i}deg) translateY(-${layer.radius - 8}px)`,
            }}
          />
        ))}

        {/* Layer label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/50 font-mono whitespace-nowrap">
          {layer.label}
        </div>
      </motion.div>
    </motion.div>
  );
}
