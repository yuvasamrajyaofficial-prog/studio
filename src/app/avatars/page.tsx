"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const AVATARS = [
 {
    name: "Matsya",
    title: "The Fish",
    era: "Satya Yuga",
    purpose: "To save the Vedas and first man (Manu) from the great deluge",
    story: "When the cosmic flood threatened to destroy all life and knowledge, Vishnu incarnated as a gigantic fish. He instructed Manu to build a boat and gather the seven sages, seeds of all plants, and one of every animal. Matsya towed the boat to safety while battling the demon Hayagriva who had stolen the Vedas. He retrieved the sacred texts and delivered them to Brahma.",
    symbol: "🐟",
    weapon: "Conch shell and discus",
    color: "from-blue-400 to-cyan-600",
    significance: "Represents preservation of knowledge and life during cosmic dissolution"
  },
  {
    name: "Kurma",
    title: "The Tortoise",
    era: "Satya Yuga",
    purpose: "To support Mount Mandara during the churning of the ocean",
    story: "Gods and demons joined forces to churn the cosmic ocean for Amrita (nectar of immortality). They used Mount Mandara as the churning rod and Vasuki (serpent king) as the rope. The mountain began sinking into the ocean. Vishnu incarnated as Kurma, a colossal tortoise, and placed the mountain on his back, allowing the churning to continue. This produced fourteen treasures including Amrita, Lakshmi, and the deadly Halahala poison.",
    symbol: "🐢",
    weapon: "Sudarshana Chakra",
    color: "from-green-400 to-emerald-600",
    significance: "Represents the foundation supporting cosmic endeavors and cooperation"
  },
  {
    name: "Varaha",
    title: "The Boar",
    era: "Satya Yuga",
    purpose: "To rescue Earth from the cosmic ocean",
    story: "The demon Hiranyaksha dragged the Earth to the bottom of the cosmic ocean and hid her there. Vishnu took the form of a gigantic boar with a thousand-mile-long body. He dove into the ocean, fought Hiranyaksha for a thousand years, finally killed him, and lifted Earth on his tusks. Placing her gently back in orbit, he restored the balance of creation.",
    symbol: "🐗",
    weapon: "Sudarshana Chakra and Gada (mace)",
    color: "from-amber-600 to-orange-800",
    significance: "Represents the rescue and restoration of Dharma from the depths of ignorance"
  },
  {
    name: "Narasimha",
    title: "The Man-Lion",
    era: "Satya Yuga",
    purpose: "To destroy Hiranyakashipu and protect devotee Prahlada",
    story: "Demon king Hiranyakashipu obtained a boon that he couldn't be killed by man or animal, inside or outside, day or night, on earth or in sky, by any weapon. He tortured his son Prahlada for worshipping Vishnu. To honor both the boon and protect his devotee, Vishnu appeared as Narasimha (half-man, half-lion) at twilight (neither day nor night), on a threshold (neither inside nor outside), placed the demon on his lap (neither earth nor sky), and killed him with his claws (not a weapon).",
    symbol: "🦁",
    weapon: "Divine claws",
    color: "from-orange-500 to-red-700",
    significance: "Represents divine intervention protecting devotion and destroying evil"
  },
  {
    name: "Vamana",
    title: "The Dwarf Brahmin",
    era: "Treta Yuga",
    purpose: "To subdue King Bali and restore Indra's position",
    story: "Demon king Bali, grandson of Prahlada, conquered all three worlds through his righteousness and strength. Indra and the gods were displaced. Vishnu incarnated as Vamana, a dwarf Brahmin, and approached Bali during a yajna. He asked for three paces of land. Bali agreed. Vamana then grew to cosmic proportions—his first step covered Earth, second step the heavens. For the third step, Bali offered his own head. Impressed by his devotion, Vishnu granted him rulership of Sutala (underworld) and blessed him.",
    symbol: "☂️",
    weapon: "None (used cosmic form)",
    color: "from-yellow-400 to-amber-600",
    significance: "Represents humility and the restoration of cosmic balance"
  },
  {
    name: "Parashurama",
    title: "Rama with the Axe",
    era: "Treta Yuga",
    purpose: "To rid the world of corrupt Kshatriyas (warriors)",
    story: "Born as the sixth son of sage Jamadagni, Parashurama was a Brahmin trained in warfare by Shiva. When the arrogant king Kartavirya Arjuna killed his father and stole the celestial cow Kamadhenu, Parashurama vowed revenge. He annihilated all corrupt Kshatriyas from Earth 21 times, only stopping when his grandfather Richika intervened. He later became the teacher of Bhishma, Drona, and Karna.",
    symbol: "🪓",
    weapon: "Divine axe (Parashu) gifted by Shiva",
    color: "from-red-600 to-red-900",
    significance: "Represents the destruction of tyranny and establishment of Dharma through force"
  },
  {
    name: "Rama",
    title: "The Ideal King",
    era: "Treta Yuga",
    purpose: "To destroy Ravana and establish righteous governance",
    story: "Born as the eldest son of King Dasharatha of Ayodhya, Rama exemplified perfect adherence to Dharma. Exiled for 14 years due to palace intrigue, he lived as an ascetic in forest with wife Sita and brother Lakshmana. When Ravana abducted Sita, Rama built an alliance with Sugriva and Hanuman, waged war against Lanka, defeated Ravana, and rescued Sita. Returning to Ayodhya, he established Rama Rajya—the golden age of ideal governance.",
    symbol: "🏹",
    weapon: "Bow and divine arrows",
    color: "from-blue-500 to-indigo-700",
    significance: "Represents the perfect balance of strength, compassion, and duty"
  },
  {
    name: "Krishna",
    title: "The Divine Statesman",
    era: "Dwapara Yuga",
    purpose: "To restore Dharma and deliver the Bhagavad Gita",
    story: "Born in a prison to Devaki and Vasudeva, Krishna was smuggled to safety as an infant. After killing his uncle Kamsa, he became king of Dwarka. During the Mahabharata war, he served as Arjuna's charioteer and delivered the Bhagavad Gita—the supreme scripture of yoga and dharma. His teachings reconciled action with renunciation, showing the path of devotion (Bhakti) as supreme. He departed after the war, marking the end of Dwapara Yuga.",
    symbol: "🪈",
    weapon: "Sudarshana Chakra and flute",
    color: "from-indigo-500 to-purple-700",
    significance: "Represents divine love, wisdom, and the synthesis of all paths to liberation"
  },
  {
    name: "Buddha",
    title: "The Enlightened One",
    era: "Kali Yuga",
    purpose: "To teach compassion and end animal sacrifices",
    story: "Born as Prince Siddhartha, he renounced royal life upon witnessing suffering. After years of asceticism, he attained enlightenment under the Bodhi tree in Bodh Gaya. Buddha taught the Middle Path, Four Noble Truths, and Eightfold Path. In the Puranic tradition, Buddha's teachings of non-violence were meant to end the exploitation of Vedic rituals by corrupt priests, particularly the practice of animal sacrifices. His doctrine of compassion restored the true essence of Dharma.",
    symbol: "🧘",
    weapon: "Dharma (teachings)",
    color: "from-orange-300 to-orange-600",
    significance: "Represents compassion, mindfulness, and the cessation of suffering"
  },
  {
    name: "Kalki",
    title: "The Destroyer of Darkness",
    era: "End of Kali Yuga (Future)",
    purpose: "To destroy evil and initiate a new Satya Yuga",
    story: "Yet to appear at the end of Kali Yuga when chaos, sin, and ignorance reach their peak. Kalki will be born in the village of Sambhala to Brahmin Vishnuyasha. He will ride a white horse named Devadatta, wielding a blazing sword. He will destroy all evil forces, eliminate corrupt leaders, and purify the world. After annihilating the forces of darkness, he will initiate a new Satya Yuga, bringing humanity back to truth and righteousness.",
    symbol: "🐎",
    weapon: "Blazing sword",
    color: "from-slate-100 to-white",
    significance: "Represents the ultimate victory of good over evil and cosmic renewal"
  },
];

export default function AvatarsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % AVATARS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + AVATARS.length) % AVATARS.length);

  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Dashavatara"
        subtitle="The Ten Incarnations. Divine descents through the ages to restore Dharma and guide humanity toward enlightenment."
      >
        {/* 3D Carousel */}
        <div className="w-full max-w-7xl mx-auto min-h-[700px] md:min-h-[650px] flex items-center justify-center px-4 py-12 relative">
          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-8 z-20 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-110"
          >
            <span className="text-white text-2xl">←</span>
          </button>
          <button
            onClick={next}
            className="absolute right-2 md:right-8 z-20 p-3 md:p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-110"
          >
            <span className="text-white text-2xl">→</span>
          </button>

          {/* Main Display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full max-w-5xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`p-8 md:p-16 rounded-3xl bg-gradient-to-br ${AVATARS[currentIndex].color} bg-opacity-15 backdrop-blur-2xl border border-white/20 shadow-2xl`}>
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                    {/* Avatar Visual */}
                    <motion.div
                      className={`w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br ${AVATARS[currentIndex].color} flex items-center justify-center shadow-2xl shrink-0 relative`}
                      animate={{
                        boxShadow: [
                          "0 0 40px rgba(255,255,255,0.2)",
                          "0 0 60px rgba(255,255,255,0.4)",
                          "0 0 40px rgba(255,255,255,0.2)",
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-8xl md:text-9xl">{AVATARS[currentIndex].symbol}</span>
                      
                      {/* Orbital rings */}
                      <motion.div
                        className="absolute inset-[-12px] border-2 border-white/30 rounded-3xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-[-24px] border border-white/20 rounded-3xl"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="mb-4">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                          <span className="text-xs md:text-sm font-mono text-white/60 uppercase tracking-wider">
                            Avatar {currentIndex + 1} of 10
                          </span>
                          <span className="text-xs md:text-sm px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white/80">
                            {AVATARS[currentIndex].era}
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">
                          {AVATARS[currentIndex].name}
                        </h2>
                        <h3 className="text-2xl md:text-3xl text-amber-300 mb-4">
                          {AVATARS[currentIndex].title}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-bold text-white/70 uppercase tracking-wider mb-1">Purpose</p>
                          <p className="text-white/90 text-base md:text-lg">
                            {AVATARS[currentIndex].purpose}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-white/70 uppercase tracking-wider mb-1">The Story</p>
                          <p className="text-white/80 text-sm md:text-base leading-relaxed">
                            {AVATARS[currentIndex].story}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-white/60 uppercase text-xs mb-1">Weapon</p>
                            <p className="text-white">{AVATARS[currentIndex].weapon}</p>
                          </div>
                          <div>
                            <p className="text-white/60 uppercase text-xs mb-1">Significance</p>
                            <p className="text-white">{AVATARS[currentIndex].significance}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {AVATARS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-amber-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="w-full max-w-5xl mt-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold text-amber-300 mb-4 font-serif">The Divine Descents</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              The Dashavatara represent the ten primary incarnations of Lord Vishnu, who descends to Earth 
              whenever Dharma (cosmic order) declines and Adharma (chaos) rises. Each avatar appears in a 
              specific cosmic age (Yuga) to restore balance and guide evolution—both material and spiritual.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Interestingly, the sequence of avatars mirrors the theory of evolution: from aquatic life (Matsya), 
              to amphibian (Kurma), to land animal (Varaha), to half-animal (Narasimha), to dwarf human (Vamana), 
              to warrior humans (Parashurama, Rama), to the perfect human (Krishna), to the enlightened sage (Buddha), 
              and finally to the cosmic warrior (Kalki) who will usher in a new golden age.
            </p>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}
