"use client";

import { useAIState } from "./ai-actions";

export function AIChatBubble() {
  const { setOpen } = useAIState();

  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center ai-chat-bubble text-3xl text-white z-50 transition-transform hover:scale-110"
      title="Ask Lola AI"
    >
      🌺
    </button>
  );
}
