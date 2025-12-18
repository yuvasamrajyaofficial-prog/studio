"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { KalacakraWheel3D } from "@/components/cosmic/kalacakra-wheel-3d";
import { motion } from "framer-motion";

export default function KalacakraPage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Kālacakra"
        subtitle="The Eternal Wheel of Time. Witness the cyclical nature of the universe, from the blink of an eye to the age of Brahma."
      >
        {/* Main wheel visualization */}
        <div className="mb-16 md:mb-24">
          <KalacakraWheel3D />
        </div>

        {/* Information cards */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
          <InfoCard
            title="Cyclical Time"
            description="Time is not linear but cyclical. Creation, preservation, and destruction repeat eternally in an infinite cosmic dance."
            icon="🔄"
          />
          <InfoCard
            title="Micro & Macro"
            description="As is the atom, so is the universe. The smallest unit of time mirrors the greatest aeon in perfect cosmic symmetry."
            icon="⚛️"
          />
          <InfoCard
            title="Karma"
            description="The wheel turns driven by the collective Karma of all beings, determining the quality and duration of each age."
            icon="⚖️"
          />
        </div>

        {/* Detailed explanation section */}
        <div className="w-full max-w-6xl mt-16 md:mt-24 px-4">
          <DetailSection />
        </div>
      </CosmicLayout>
    </>
  );
}

function InfoCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 shadow-lg"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold text-amber-400 mb-3 font-serif">{title}</h3>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed">{description}</p>
    </motion.div>
  );
}

function DetailSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-6 font-serif">The Layers of Time</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-amber-300 mb-3">6 Ritus (Seasons)</h3>
            <p className="text-sm leading-relaxed">
              Vasanta (Spring), Grīṣma (Summer), Varṣā (Monsoon), Śarad (Autumn), Hemanta (Pre-winter), Śiśira (Winter). 
              Each season lasting two months, creating the annual cycle of nature.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-amber-300 mb-3">12 Masas (Lunar Months)</h3>
            <p className="text-sm leading-relaxed">
              Chaitra, Vaiśākha, Jyeṣṭha, Āṣāḍha, Śrāvaṇa, Bhādrapada, Āśvina, Kārtika, Mārgaśīrṣa, Pauṣa, Māgha, Phālguna. 
              The twelve moons marking the passage of the year.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-amber-300 mb-3">27 Nakshatras (Lunar Mansions)</h3>
            <p className="text-sm leading-relaxed">
              The 27 constellations through which the moon travels, each governing specific cosmic energies. 
              From Aśvinī to Revatī, they form the celestial zodiac of Vedic astrology.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-amber-300 mb-3">60 Samvatsaras (Year Cycle)</h3>
            <p className="text-sm leading-relaxed">
              The 60-year Jupiter cycle, with each year having a unique name and quality. 
              From Prabhava to Akṣaya, completing the grand cycle of time measurement.
            </p>
          </div>
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <h3 className="text-2xl font-bold text-amber-300 mb-4">The Eternal Dance</h3>
          <p className="text-slate-300 leading-relaxed">
            Kālacakra represents the perpetual motion of time, where beginnings and endings are illusions. 
            Each rotation of the wheel brings new manifestations while preserving the eternal essence. 
            Understanding this cosmic rhythm helps us transcend the bondage of linear time and realize our true nature beyond temporal existence.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
