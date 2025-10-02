"use client";

import { TulasiIcon } from "@/components/icons/tulasi";

export function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-8 flex justify-between items-center border-t border-t-white/10">
      <div className="flex items-center gap-2 text-muted-foreground">
        <TulasiIcon className="w-6 h-6" />
        <span className="text-xs">
          Inspired by the timeless wisdom of Sanatana Dharma.
        </span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
         <span className="text-xs">
          Crafted with reverence for ancient traditions.
        </span>
        <TulasiIcon className="w-6 h-6" />
      </div>
    </footer>
  );
}
