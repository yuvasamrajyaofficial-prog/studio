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
          {/* Central Wheel Visualization - Simplified */}
          <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
            {/* Rings */}
            {[280, 220, 160, 100].map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-amber-400/30"
                style={{ width: size, height: size }}
              />
            ))}
            
            {/* Central Core */}
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg font-serif">KĀLA</span>
            </div>
            
            {/* Labels */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-xs text-amber-400">60 Samvatsaras</div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-8 text-xs text-pink-400">27 Nakshatras</div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-8 text-xs text-purple-400">12 Masas</div>
            <div className="absolute top-36 left-1/2 -translate-x-1/2 -translate-y-8 text-xs text-blue-400">6 Ritus</div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard title="Cyclical Time" icon="🔄" desc="Time is not linear but cyclical. Creation, preservation, and destruction repeat eternally." />
            <InfoCard title="Micro & Macro" icon="⚛️" desc="As is the atom, so is the universe. The smallest unit mirrors the greatest aeon." />
            <InfoCard title="Karma" icon="⚖️" desc="The wheel turns driven by collective Karma, determining the quality of each age." />
          </div>

          {/* Detailed Sections */}
          <div className="space-y-4">
            <DetailCard title="6 Ritus (Seasons)" desc="Vasanta (Spring), Grīṣma (Summer), Varṣā (Monsoon), Śarad (Autumn), Hemanta (Pre-winter), Śiśira (Winter)." />
            <DetailCard title="12 Masas (Lunar Months)" desc="Chaitra, Vaiśākha, Jyeṣṭha, Āṣāḍha, Śrāvaṇa, Bhādrapada, Āśvina, Kārtika, Mārgaśīrṣa, Pauṣa, Māgha, Phālguna." />
            <DetailCard title="27 Nakshatras" desc="The 27 lunar mansions through which the moon travels, from Aśvinī to Revatī, forming the celestial zodiac." />
            <DetailCard title="60 Samvatsaras" desc="The 60-year Jupiter cycle, with each year having a unique name and quality, from Prabhava to Akṣaya." />
          </div>

          {/* Final Explanation */}
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <h3 className="text-xl font-bold text-amber-300 mb-3">The Eternal Dance</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Kālacakra represents the perpetual motion of time. Each rotation brings new manifestations while preserving the eternal essence. 
              Understanding this cosmic rhythm helps us transcend the bondage of linear time.
            </p>
          </div>
        </div>
      </CosmicLayout>
    </>
  );
}

function InfoCard({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-4 rounded-xl bg-white/5 border border-white/10"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-bold text-amber-400 mb-2">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function DetailCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h4 className="text-base font-bold text-amber-300 mb-2">{title}</h4>
      <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
