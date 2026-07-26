"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface Layer {
  id: string;
  label: string;
  radius: number;
  speed: number;
  segments: number;
  color: string;
  eraId: string;
  eraColor: string;
}

const LAYERS: Layer[] = [
  { id: "satya", label: "Satya Yuga", radius: 150, speed: 80, segments: 6, color: "border-yellow-400/50", eraId: "satya", eraColor: "#FFD700" },
  { id: "treta", label: "Treta Yuga", radius: 220, speed: 55, segments: 8, color: "border-slate-300/40", eraId: "treta", eraColor: "#C0C0C0" },
  { id: "dwapara", label: "Dwapara Yuga", radius: 295, speed: 35, segments: 10, color: "border-amber-500/40", eraId: "dwapara", eraColor: "#CD7F32" },
  { id: "kali", label: "Kali Yuga", radius: 370, speed: 20, segments: 12, color: "border-violet-500/40", eraId: "kali", eraColor: "#9B59B6" },
];

const ERA_SCRIPTURES: Record<string, string[]> = {
  satya: ["Vedas", "Upanishads", "Rig Veda", "Atharva", "Brahman"],
  treta: ["Ramayana", "Yoga Sutras", "Rigveda", "Arthashastra", "Manusmriti", "Sama"],
  dwapara: ["Gita", "Mahabharata", "Puranas", "Vishnu", "Brahma", "Buddha", "Confucius", "Quran"],
  kali: ["Bible", "Talmud", "Hadith", "Tao", "Stoics", "Ubuntu", "Zen", "Sufi", "Kabbalah", "Spinoza"],
};

export function KalacakraWheel3D({
  activeEra,
  onSelectEra,
}: {
  activeEra?: string;
  onSelectEra?: (era: string) => void;
}) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full max-w-[800px] lg:max-w-[900px] aspect-square mx-auto select-none">
      {/* Starfield background */}
      {!isMobile && [...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* Central glowing KĀLA core */}
      <div className="absolute inset-0 flex items-center justify-center z-50">
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center will-change-transform cursor-pointer"
          style={{ transform: "translateZ(0)" }}
          animate={!isMobile ? {
            boxShadow: [
              "0 0 30px rgba(255, 165, 0, 0.5)",
              "0 0 60px rgba(255, 165, 0, 0.8)",
              "0 0 30px rgba(255, 165, 0, 0.5)",
            ],
          } : {}}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-black font-bold text-lg md:text-2xl lg:text-3xl font-serif relative z-10">
            KĀLA
          </span>

          {/* Emission particles */}
          {!isMobile && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-300/70 rounded-full will-change-transform"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-70px) translateZ(0)`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Rotating era rings */}
      {LAYERS.map((layer) => (
        <EraRing
          key={layer.id}
          layer={layer}
          isHovered={hoveredLayer === layer.id}
          isActive={activeEra === layer.eraId}
          onHover={() => setHoveredLayer(layer.id)}
          onLeave={() => setHoveredLayer(null)}
          onClick={() => onSelectEra?.(layer.eraId)}
          isMobile={isMobile}
          scriptures={ERA_SCRIPTURES[layer.eraId] || []}
        />
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredLayer && !isMobile && (
          <motion.div
            key={hoveredLayer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-md z-50 text-center"
          >
            {LAYERS.filter((l) => l.id === hoveredLayer).map((layer) => (
              <div key={layer.id}>
                <p className="text-amber-400 font-bold text-sm mb-1">{layer.label}</p>
                <p className="text-slate-300 text-xs">
                  {ERA_SCRIPTURES[layer.eraId]?.join(" · ")}
                </p>
                <p className="text-slate-500 text-[10px] mt-2">Click to filter scriptures</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EraRing({
  layer,
  isHovered,
  isActive,
  onHover,
  onLeave,
  onClick,
  isMobile,
  scriptures,
}: {
  layer: Layer;
  isHovered: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isMobile: boolean;
  scriptures: string[];
}) {
  const segments = isMobile ? Math.min(layer.segments, 8) : layer.segments;
  const ringSize = isMobile ? layer.radius * 1.6 : layer.radius * 2;

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className={`absolute rounded-full border-2 ${layer.color} pointer-events-auto cursor-pointer transition-all duration-500 will-change-transform`}
        style={{
          width: ringSize,
          height: ringSize,
          transform: "translateZ(0)",
          boxShadow: isActive
            ? `0 0 25px ${layer.eraColor}60, inset 0 0 15px ${layer.eraColor}20`
            : isHovered
            ? `0 0 15px ${layer.eraColor}40`
            : "none",
          borderColor: isActive
            ? layer.eraColor
            : isHovered
            ? `${layer.eraColor}80`
            : undefined,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: layer.speed, repeat: Infinity, ease: "linear" }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {/* Tick marks */}
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`absolute top-0 left-1/2 w-0.5 -translate-x-1/2 origin-bottom transition-all ${
              isActive || isHovered ? "h-4 opacity-90" : "h-2 opacity-30"
            }`}
            style={{
              backgroundColor: isActive || isHovered ? layer.eraColor : "white",
              transform: `translateX(-50%) rotate(${(360 / segments) * i}deg) translateY(-${ringSize / 2 - 8}px) translateZ(0)`,
            }}
          />
        ))}

        {/* Scripture node labels — shown on active ring */}
        {(isActive || isHovered) && !isMobile && scriptures.slice(0, Math.min(segments, scriptures.length)).map((scripture, i) => {
          const angle = (360 / Math.min(segments, scriptures.length)) * i;
          const rad = (angle - 90) * (Math.PI / 180);
          const r = ringSize / 2 - 2;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <motion.div
              key={scripture}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              className="absolute text-[9px] font-mono font-bold whitespace-nowrap"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-angle}deg)`,
                color: layer.eraColor,
                textShadow: `0 0 8px ${layer.eraColor}`,
              }}
            >
              {scripture}
            </motion.div>
          );
        })}

        {/* Era label */}
        <div
          className={`absolute top-2 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] uppercase tracking-widest font-mono whitespace-nowrap transition-all duration-300 ${
            isActive ? "opacity-100 font-bold" : "opacity-40"
          }`}
          style={{ color: isActive ? layer.eraColor : "white" }}
        >
          {layer.label}
        </div>
      </motion.div>
    </motion.div>
  );
}
