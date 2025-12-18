"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Layer {
  id: string;
  label: string;
  radius: number;
  speed: number;
  segments: number;
  color: string;
}

const LAYERS: Layer[] = [
  { id: "ritu", label: "6 Ritus", radius: 150, speed: 60, segments: 6, color: "border-blue-400/40" },
  { id: "masa", label: "12 Masas", radius: 220, speed: 40, segments: 12, color: "border-purple-400/40" },
  { id: "nakshatra", label: "27 Nakshatras", radius: 290, speed: 25, segments: 27, color: "border-pink-400/40" },
  { id: "samvatsara", label: "60 Samvatsaras", radius: 360, speed: 15, segments: 60, color: "border-amber-400/50" },
];

export function KalacakraWheel3D() {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="relative w-full max-w-[800px] lg:max-w-[900px] aspect-square mx-auto">
      {/* Central glowing core */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center will-change-transform"
          style={{ transform: "translateZ(0)" }}
          animate={!isMobile ? {
            boxShadow: [
              "0 0 30px rgba(255, 165, 0, 0.5)",
              "0 0 50px rgba(255, 165, 0, 0.7)",
              "0 0 30px rgba(255, 165, 0, 0.5)",
            ],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-black font-bold text-lg md:text-2xl lg:text-3xl font-serif relative z-10">KĀLA</span>
          
          {/* Particle emission - only on desktop */}
          {!isMobile && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-300/60 rounded-full will-change-transform"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-60px) translateZ(0)`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
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
          isMobile={isMobile}
        />
      ))}

      {/* Info tooltip */}
      {hoveredLayer && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-md z-50"
        >
          <p className="text-amber-400 font-bold text-sm">
            {LAYERS.find(l => l.id === hoveredLayer)?.label}
          </p>
          <p className="text-slate-300 text-xs mt-1">
            {hoveredLayer === "ritu" && "The six seasons of the year"}
            {hoveredLayer === "masa" && "The twelve lunar months"}
            {hoveredLayer === "nakshatra" && "The 27 lunar mansions"}
            {hoveredLayer === "samvatsara" && "The 60-year cosmic cycle"}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function WheelLayer({ layer, isHovered, onHover, onLeave, isMobile }: {
  layer: Layer;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
}) {
  // Reduce segments on mobile for performance
  const segments = isMobile ? Math.min(layer.segments, 12) : layer.segments;
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        className={`absolute rounded-full border-2 ${layer.color} ${
          isHovered ? "border-opacity-100" : "border-opacity-30"
        } pointer-events-auto cursor-pointer transition-all duration-300 will-change-transform`}
        style={{
          width: layer.radius * 2,
          height: layer.radius * 2,
          transform: "translateZ(0)", // GPU acceleration
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
        {/* Segment markers - reduced on mobile */}
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 left-1/2 w-0.5 -translate-x-1/2 origin-bottom transition-all ${
              isHovered ? "h-3 md:h-4 bg-white" : "h-2 bg-white/30"
            }`}
            style={{
              transform: `translateX(-50%) rotate(${(360 / segments) * i}deg) translateY(-${layer.radius - 6}px) translateZ(0)`,
            }}
          />
        ))}

        {/* Layer label */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] uppercase tracking-widest text-white/50 font-mono whitespace-nowrap">
          {layer.label}
        </div>
      </motion.div>
    </motion.div>
  );
}
