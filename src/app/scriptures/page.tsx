"use client";

import { motion } from "framer-motion";

export default function ScriptureLibraryPage() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-12">
      <div className="max-w-2xl space-y-8 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-yellow-500/20 to-transparent border border-yellow-500/30 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-500/40 blur-xl animate-pulse" />
        </motion.div>
        
        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Begin Your Cosmic Journey
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            Select a sacred text from the library to unlock ancient wisdom and explore the depths of consciousness.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
            Awaiting your selection...
          </div>
        </motion.div>
      </div>
    </div>
  );
}
