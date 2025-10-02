"use client";

import { Button } from "@/components/ui/button";
import type { Scripture } from "@/lib/scriptures";
import { cn } from "@/lib/utils";
import { PeepalLeafIcon } from "./icons/peepal-leaf";
import { motion } from "framer-motion";

interface CosmicTreeProps {
  scriptures: Scripture[];
  onSelectScripture: (scripture: Scripture) => void;
  selectedScriptureId: string | null;
}

export function CosmicTree({ scriptures, onSelectScripture, selectedScriptureId }: CosmicTreeProps) {

  if (!scriptures.length) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-foreground/60">
            <p>No scriptures available for this era.</p>
        </div>
    );
  }

  return (
    <div className="w-full p-4">
        <div className="text-center mb-4">
            <h3 className="font-headline text-lg text-accent">The Cosmic Tree is growing...</h3>
            <p className="text-xs text-muted-foreground">Select a leaf to read a scripture</p>
        </div>
      <div className="flex flex-col gap-2">
        {scriptures.map((scripture, i) => (
          <motion.div
            key={scripture.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Button
              variant="ghost"
              onClick={() => onSelectScripture(scripture)}
              className={cn(
                "justify-start w-full text-left font-body text-base h-auto py-2 px-4 transition-all duration-200",
                selectedScriptureId === scripture.id
                  ? "bg-accent/20 text-accent border-l-4 border-accent"
                  : "text-foreground/80 hover:bg-primary/50 hover:text-foreground"
              )}
            >
              <PeepalLeafIcon className="w-5 h-5 mr-3 flex-shrink-0 text-accent/70" />
              {scripture.title}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
