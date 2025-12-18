"use client";

import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { EnhancedStarfield } from "@/components/cosmic/enhanced-starfield";
import { motion } from "framer-motion";

const YUGAS = [
  {
    id: "satya",
    name: "Satya Yuga",
    title: "The Golden Age",
    duration: "1,728,000 Years",
    virtue: "100%",
    color: "from-yellow-200 via-yellow-400 to-yellow-600",
    glowColor: "rgba(250, 204, 21, 0.4)",
    icon: "✨",
    description: "The Age of Truth and perfection. Humanity lives in complete harmony with the divine. People communicate through thought alone, possess supernatural powers, and live for thousands of years. Dharma stands on all four legs, and there is no need for temples or rituals as God is directly perceived.",
    characteristics: [
      "Average human lifespan: 100,000 years",
      "No disease, discord, or suffering",
      "Natural telepathic abilities",
      "Perfect moral and spiritual virtue",
      "Direct communion with the divine"
    ]
  },
  {
    id: "treta",
    name: "Treta Yuga",
    title: "The Silver Age",
    duration: "1,296,000 Years",
    virtue: "75%",
    color: "from-gray-100 via-gray-300 to-gray-500",
    glowColor: "rgba(156, 163, 175, 0.4)",
    icon: "🔥",
    description: "The age of ritual and sacrifice. Virtue diminishes slightly as humanity moves away from direct divine perception. Great emperors rise to establish Dharma through conquest. Yajñas (fire sacrifices) become the primary means of spiritual connection. The Treta Yuga sees the avatars of Vamana, Parashurama, and Rama.",
    characteristics: [
      "Average lifespan: 10,000 years",
      "Dharma stands on three legs",
      "Rise of kingdoms and warfare",
      "Yajñas establish divine connection",
      "Introduction of the caste system"
    ]
  },
  {
    id: "dwapara",
    name: "Dwapara Yuga",
    title: "The Bronze Age",
    duration: "864,000 Years",
    virtue: "50%",
    color: "from-amber-500 via-amber-700 to-amber-900",
    glowColor: "rgba(217, 119, 6, 0.4)",
    icon: "⚖️",
    description: "The age of division and doubt. The Vedas are split into four parts as people can no longer comprehend the complete knowledge. Disease, death, and natural disasters become common. Society becomes competitive and pleasure-seeking. Krishna's avatar marks the end of this age with the Mahabharata war.",
    characteristics: [
      "Average lifespan: 1,000 years",
      "Dharma stands on two legs",
      "Division of Vedic knowledge",
      "Increased materialism",
      "Balance between light and darkness"
    ]
  },
  {
    id: "kali",
    name: "Kali Yuga",
    title: "The Iron Age",
    duration: "432,000 Years",
    virtue: "25%",
    color: "from-slate-600 via-slate-800 to-slate-950",
    glowColor: "rgba(71, 85, 105, 0.4)",
    icon: "⚔️",
    description: "The current age of darkness and strife. Dharma stands on one leg, barely maintaining balance. Hypocrisy, quarrel, and ignorance dominate. However, spiritual liberation is easiest to attain through the simple practice of chanting the divine names. We are currently approximately 5,000 years into this 432,000-year age.",
    characteristics: [
      "Average lifespan: 100 years (and decreasing)",
      "Dharma stands on one leg",
      "Rampant materialism and spiritual ignorance",
      "Easy path to liberation through devotion",
      "Prophesied appearance of Kalki avatar at the end"
    ]
  },
];

export default function YugaTimelinePage() {
  return (
    <>
      <EnhancedStarfield />
      <CosmicLayout
        title="Yuga Timeline"
        subtitle="The Four Ages of Dharma. Witness the cosmic progression from golden perfection to iron reality, and back again in eternal recursion."
      >
        {/* Timeline visualization */}
        <div className="w-full max-w-7xl mx-auto relative">
          {/* Flowing timeline path */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-gray-400 via-amber-700 to-slate-800 opacity-40 -translate-x-1/2" />
          
          {/* Yuga cards */}
          <div className="space-y-32 md:space-y-56 py-20">
            {YUGAS.map((yuga, index) => (
              <YugaOrb key={yuga.id} yuga={yuga} index={index} />
            ))}
          </div>
        </div>

        {/* Cycle explanation */}
        <div className="w-full max-w-6xl mt-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-purple-500/10 border border-amber-500/20 backdrop-blur-xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-amber-300 mb-6 font-serif">The Eternal Cycle</h3>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                The four Yugas together form one Mahayuga (Great Age), lasting 4,320,000 years. One thousand Mahayugas equal one day of Brahma (Kalpa), 
                and at the end of Brahma's day, the universe undergoes partial dissolution (Pralaya).
              </p>
              <p>
                After 100 Brahma years (311 trillion human years), complete dissolution (Mahapralaya) occurs, and the entire cosmos returns to the 
                unmanifest state. From this void, a new Brahma is born, and the eternal dance of creation begins anew.
              </p>
              <p>
                We are currently in the 28th Mahayuga of the current Kalpa, which is called the Varaha Kalpa (the age when Vishnu took the boar avatar). 
                This perspective reveals the incomprehensible vastness of cosmic time and our infinitesimal place within it.
              </p>
            </div>
          </motion.div>
        </div>
      </CosmicLayout>
    </>
  );
}

function YugaOrb({ yuga, index }: { yuga: typeof YUGAS[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
        isEven ? "md:flex-row-reverse" : ""
      } pl-16 md:pl-0`}
    >
      {/* Timeline node with 3D orb */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${yuga.color} flex items-center justify-center text-3xl md:text-5xl shadow-2xl`}
          whileHover={{ scale: 1.1 }}
          animate={{
            boxShadow: [
              `0 0 30px ${yuga.glowColor}`,
              `0 0 50px ${yuga.glowColor}`,
              `0 0 30px ${yuga.glowColor}`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {yuga.icon}
          
          {/* Orbital ring */}
          <motion.div
            className="absolute inset-[-8px] border-2 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Content card with 3D depth */}
      <div className="w-full md:w-[calc(50%-4rem)]">
        <motion.div
          whileHover={{ scale: 1.02, rotateY: isEven ? -2 : 2 }}
          className={`p-8 md:p-12 rounded-3xl bg-gradient-to-br ${yuga.color} bg-opacity-10 backdrop-blur-2xl border border-white/10 shadow-2xl perspective-[1000px]`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg font-serif">{yuga.name}</h3>
              <p className="text-xl md:text-2xl text-white/80 mt-2">{yuga.title}</p>
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base font-mono text-white/70">{yuga.duration}</p>
              <div className="mt-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <p className="text-sm font-bold text-white">{yuga.virtue} Dharma</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
            {yuga.description}
          </p>

          {/* Characteristics */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider">Key Characteristics:</h4>
            <ul className="space-y-2">
              {yuga.characteristics.map((char, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm md:text-base text-white/80"
                >
                  <span className="text-amber-400 mt-1">•</span>
                  <span>{char}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Virtue bar */}
          <div className="mt-8">
            <div className="w-full bg-black/30 h-4 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: yuga.virtue }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${yuga.color} shadow-[0_0_20px_rgba(255,255,255,0.5)]`}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Empty space for balance */}
      <div className="hidden md:block w-[calc(50%-4rem)]" />
    </motion.div>
  );
}
