"use client";

import React from "react";
import { motion } from "framer-motion";

const URDHVA_LOKAS = [
  { id: "satya", name: "Satya Loka", desc: "Abode of Brahma. The realm of ultimate truth.", color: "bg-yellow-100" },
  { id: "tapa", name: "Tapa Loka", desc: "Realm of penance and great ascetics.", color: "bg-yellow-200" },
  { id: "jana", name: "Jana Loka", desc: "Realm of the sons of Brahma.", color: "bg-amber-100" },
  { id: "mahar", name: "Mahar Loka", desc: "Abode of great sages and saints.", color: "bg-amber-200" },
  { id: "svar", name: "Svar Loka", desc: "Heaven (Indra's realm). Home of the Devas.", color: "bg-blue-200" },
  { id: "bhuvar", name: "Bhuvar Loka", desc: "Space between earth and sun. Realm of semi-divine beings.", color: "bg-blue-300" },
  { id: "bhu", name: "Bhu Loka", desc: "Earth. The realm of mortals.", color: "bg-green-300" },
];

const ADHO_LOKAS = [
  { id: "atala", name: "Atala", desc: "Ruled by Bala. A place of seduction and pleasure.", color: "bg-red-300" },
  { id: "vitala", name: "Vitala", desc: "Ruled by Hara-Bhava. A realm of gold and riches.", color: "bg-red-400" },
  { id: "sutala", name: "Sutala", desc: "Ruled by Bali. More opulent than heaven itself.", color: "bg-red-500" },
  { id: "talatala", name: "Talatala", desc: "Realm of Maya (illusion) and wizardry.", color: "bg-red-600" },
  { id: "mahatala", name: "Mahatala", desc: "Abode of the great Nagas (serpents).", color: "bg-red-700" },
  { id: "rasatala", name: "Rasatala", desc: "Home of the Danavas and Daityas.", color: "bg-red-800" },
  { id: "patala", name: "Patala", desc: "The lowest realm. Ruled by Vasuki. Filled with jewels.", color: "bg-red-900" },
];

export function LokaStack() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 flex flex-col items-center gap-1 px-4">
      {/* Upper Worlds */}
      <div className="w-full flex flex-col-reverse items-center gap-1">
        {URDHVA_LOKAS.map((loka, index) => (
          <LokaCard key={loka.id} loka={loka} type="upper" index={index} />
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-1 bg-white/20 my-4" />

      {/* Lower Worlds */}
      <div className="w-full flex flex-col items-center gap-1">
        {ADHO_LOKAS.map((loka, index) => (
          <LokaCard key={loka.id} loka={loka} type="lower" index={index} />
        ))}
      </div>
    </div>
  );
}

function LokaCard({ loka, type, index }: { loka: any; type: "upper" | "lower"; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: type === "upper" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative w-full p-4 rounded-lg backdrop-blur-sm border border-white/10 overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer`}
      style={{
        backgroundColor: type === "upper" 
          ? `rgba(255, 255, 255, ${0.05 + index * 0.02})` 
          : `rgba(255, 0, 0, ${0.05 + index * 0.05})`
      }}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${loka.color}`} />
      
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h3 className={`text-xl font-bold ${type === "upper" ? "text-amber-200" : "text-red-300"}`}>
            {loka.name}
          </h3>
          <p className="text-sm text-slate-300">{loka.desc}</p>
        </div>
        <div className="text-2xl opacity-50">
          {type === "upper" ? "⬆️" : "⬇️"}
        </div>
      </div>
    </motion.div>
  );
}
