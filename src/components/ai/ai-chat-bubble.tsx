"use client";

import { useAIState } from "./ai-actions";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";

export function AIChatBubble() {
  const { setOpen } = useAIState();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30 z-50 transition-transform hover:scale-110 animate-pulse-slow"
      title="Ask Lola AI"
    >
      <SudharshanaChakraIcon className="w-8 h-8 md:w-10 md:h-10 text-white animate-spin-slow" />
    </button>
  );
}
