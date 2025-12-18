"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function EnhancedStarfield() {
  const [stars, setStars] = useState<{x: number; y: number; size: number}[]>([]);

  useEffect(() => {
    // Simple starfield - 30 stars for all devices
    const newStars = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-[#0f0518]" />
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>
    </div>
  );
}
