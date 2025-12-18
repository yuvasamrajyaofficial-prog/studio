"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function KalacakraPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Kālacakra"
        subtitle="The Eternal Wheel of Time. Witness the cyclical nature of the universe."
      >
        <div ref={containerRef} className="w-full max-w-5xl mx-auto px-4 space-y-16 perspective-1000">
          {/* 3D Wheel Visualization */}
          <motion.div 
            style={{ rotateX: 20, scale }}
            className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center my-8 transform-style-3d"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-3xl animate-pulse-slow" />
            
            {/* Rings with 3D Rotation */}
            <div className="relative w-full h-full animate-spin-slow transform-style-3d">
              {/* Ring 1: Samvatsaras */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)] border-dashed" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-amber-400 bg-black/50 px-2 rounded backdrop-blur-sm">
                60 Samvatsaras
              </div>
              
              {/* Ring 2: Nakshatras */}
              <div className="absolute inset-[15%] rounded-full border-2 border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.3)] border-dotted animate-spin-reverse-slower" />
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-sm font-bold text-pink-400 bg-black/50 px-2 rounded backdrop-blur-sm">
                27 Nakshatras
              </div>
              
              {/* Ring 3: Masas */}
              <div className="absolute inset-[30%] rounded-full border-2 border-purple-400/60 shadow-[0_0_15px_rgba(192,132,252,0.3)] border-double animate-spin-slow" />
              <div className="absolute top-[25%] left-1/2 -translate-x-1/2 text-sm font-bold text-purple-400 bg-black/50 px-2 rounded backdrop-blur-sm">
                12 Masas
              </div>
              
              {/* Ring 4: Ritus */}
              <div className="absolute inset-[45%] rounded-full border-2 border-blue-400/60 shadow-[0_0_15px_rgba(96,165,250,0.3)] animate-spin-reverse-slow" />
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 text-sm font-bold text-blue-400 bg-black/50 px-2 rounded backdrop-blur-sm">
                6 Ritus
              </div>
            </div>
            
            {/* Central Core - Floating 3D Orb */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.8)] z-10 animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/40" />
              <span className="text-black font-bold text-xl font-serif relative z-10 drop-shadow-md">KĀLA</span>
            </div>
          </motion.div>

          {/* Info Cards - 3D Tilt Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="Cyclical Time" icon="🔄" desc="Time is not linear but cyclical. Creation, preservation, and destruction repeat eternally." bg="bg-slate-800/80" delay={0.1} />
            <InfoCard title="Micro & Macro" icon="⚛️" desc="As is the atom, so is the universe. The smallest unit mirrors the greatest aeon." bg="bg-slate-800/80" delay={0.2} />
            <InfoCard title="Karma" icon="⚖️" desc="The wheel turns driven by collective Karma, determining the quality of each age." bg="bg-slate-800/80" delay={0.3} />
          </div>

          {/* Detailed Sections - Staggered Entry */}
          <div className="space-y-6">
            <DetailCard title="6 Ritus (Seasons)" desc="Vasanta (Spring), Grīṣma (Summer), Varṣā (Monsoon), Śarad (Autumn), Hemanta (Pre-winter), Śiśira (Winter)." color="text-blue-300" delay={0.4} />
            <DetailCard title="12 Masas (Lunar Months)" desc="Chaitra, Vaiśākha, Jyeṣṭha, Āṣāḍha, Śrāvaṇa, Bhādrapada, Āśvina, Kārtika, Mārgaśīrṣa, Pauṣa, Māgha, Phālguna." color="text-purple-300" delay={0.5} />
            <DetailCard title="27 Nakshatras" desc="The 27 lunar mansions through which the moon travels, from Aśvinī to Revatī, forming the celestial zodiac." color="text-pink-300" delay={0.6} />
            <DetailCard title="60 Samvatsaras" desc="The 60-year Jupiter cycle, with each year having a unique name and quality, from Prabhava to Akṣaya." color="text-amber-300" delay={0.7} />
          </div>

          {/* Final Explanation - Glass Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/30 backdrop-blur-md shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-amber-300 mb-4">The Eternal Dance</h3>
            <p className="text-slate-200 text-base leading-relaxed">
              Kālacakra represents the perpetual motion of time. Each rotation brings new manifestations while preserving the eternal essence. 
              Understanding this cosmic rhythm helps us transcend the bondage of linear time and realize our true nature beyond temporal existence.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function InfoCard({ title, icon, desc, bg, delay }: { title: string; icon: string; desc: string; bg: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`p-6 rounded-2xl ${bg} border border-amber-500/30 backdrop-blur-sm shadow-xl`}
    >
      <div className="text-4xl mb-4 filter drop-shadow-lg">{icon}</div>
      <h3 className="text-xl font-bold text-amber-400 mb-3">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function DetailCard({ title, desc, color, delay }: { title: string; desc: string; color: string; delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-6 rounded-2xl bg-slate-800/60 border border-white/10 backdrop-blur-sm hover:bg-slate-800/80 transition-colors"
    >
      <h4 className={`text-lg font-bold ${color} mb-2`}>{title}</h4>
      <p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
