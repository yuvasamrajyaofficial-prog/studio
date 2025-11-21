"use client";

export function AIChatBubble() {
  const handleClick = () => {
    // This will eventually open the AI modal
    console.log("AI Chat Bubble clicked!");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center ai-chat-bubble text-3xl text-white z-50 transition-transform hover:scale-110"
      title="Ask Lola AI"
    >
      🌺
    </button>
  );
}
