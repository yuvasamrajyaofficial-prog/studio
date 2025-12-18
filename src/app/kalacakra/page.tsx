"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

export default function KalacakraPage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Kālacakra"
        subtitle="The Eternal Wheel of Time. Witness the cyclical nature of the universe."
      >
        <div className="w-full max-w-4xl mx-auto px-4 space-y-12">
          {/* Enhanced Wheel Visualization */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center my-8">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-3xl" />
            
            {/* Rings with labels */}
            <div className="absolute" style={{ width: 360, height: 360 }}>
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400">
                60 Samvatsaras
              </div>
            </div>
            
            <div className="absolute" style={{ width: 290, height: 290 }}>
              <div className="absolute inset-0 rounded-full border-2 border-pink-400/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-pink-400">
                27 Nakshatras
              </div>
            </div>
            
            <div className="absolute" style={{ width: 220, height: 220 }}>
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/60 shadow-[0_0_15px_rgba(192,132,252,0.3)]" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-400">
                12 Masas
              </div>
            </div>
            
            <div className="absolute" style={{ width: 150, height: 150 }}>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/60 shadow-[0_0_15px_rgba(96,165,250,0.3)]" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-blue-400">
                6 Ritus
              </div>
            </div>
            
            {/* Central Core - Enhanced */}
            <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.6)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/20" />
              <span className="text-black font-bold text-xl font-serif relative z-10">KĀLA</span>
            </div>
          </div>

          {/* Info Cards - Better Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard title="Cyclical Time" icon="🔄" desc="Time is not linear but cyclical. Creation, preservation, and destruction repeat eternally." bg="bg-slate-800/80" />
            <InfoCard title="Micro & Macro" icon="⚛️" desc="As is the atom, so is the universe. The smallest unit mirrors the greatest aeon." bg="bg-slate-800/80" />
            <InfoCard title="Karma" icon="⚖️" desc="The wheel turns driven by collective Karma, determining the quality of each age." bg="bg-slate-800/80" />
          </div>

          {/* Detailed Sections - Better Visibility */}
          <div className="space-y-4">
            <DetailCard title="6 Ritus (Seasons)" desc="Vasanta (Spring), Grīṣma (Summer), Varṣā (Monsoon), Śarad (Autumn), Hemanta (Pre-winter), Śiśira (Winter)." color="text-blue-300" />
            <DetailCard title="12 Masas (Lunar Months)" desc="Chaitra, Vaiśākha, Jyeṣṭha, Āṣāḍha, Śrāvaṇa, Bhādrapada, Āśvina, Kārtika, Mārgaśīrṣa, Pauṣa, Māgha, Phālguna." color="text-purple-300" />
            <DetailCard title="27 Nakshatras" desc="The 27 lunar mansions through which the moon travels, from Aśvinī to Revatī, forming the celestial zodiac." color="text-pink-300" />
            <DetailCard title="60 Samvatsaras" desc="The 60-year Jupiter cycle, with each year having a unique name and quality, from Prabhava to Akṣaya." color="text-amber-300" />
          </div>

          {/* Final Explanation */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Eternal Dance</h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              Kālacakra represents the perpetual motion of time. Each rotation brings new manifestations while preserving the eternal essence. 
              Understanding this cosmic rhythm helps us transcend the bondage of linear time.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}

function InfoCard({ title, icon, desc, bg }: { title: string; icon: string; desc: string; bg: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-4 rounded-xl ${bg} border border-amber-500/30 backdrop-blur-sm`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold text-amber-400 mb-2">{title}</h3>
      <p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function DetailCard({ title, desc, color }: { title: string; desc: string; color: string }) {
  return (
    <div className="p-4 rounded-xl bg-slate-800/60 border border-white/20 backdrop-blur-sm">
      <h4 className={`text-base font-bold ${color} mb-2`}>{title}</h4>
      <p className="text-slate-200 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
