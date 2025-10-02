"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ConstellationIcon } from "@/components/icons/constellation";
import type { Scripture, ScriptureCategory } from "@/lib/scriptures";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ScriptureTreeProps {
  scriptures: Scripture[];
  onSelectScripture: (scripture: Scripture) => void;
  selectedScriptureId: string | null;
}

export function ScriptureTree({ scriptures, onSelectScripture, selectedScriptureId }: ScriptureTreeProps) {
  const groupedScriptures = useMemo(() => {
    return scriptures.reduce((acc, scripture) => {
      (acc[scripture.category] = acc[scripture.category] || []).push(scripture);
      return acc;
    }, {} as Record<ScriptureCategory, Scripture[]>);
  }, [scriptures]);

  const categories = Object.keys(groupedScriptures) as ScriptureCategory[];

  return (
    <div className="w-full">
      <Accordion type="multiple" className="w-full" defaultValue={categories}>
        {categories.map((category) => (
          <AccordionItem value={category} key={category} className="border-b-white/10">
            <AccordionTrigger className="hover:no-underline text-lg font-headline text-accent/90 hover:text-accent">
              <div className="flex items-center gap-3">
                <ConstellationIcon className="w-5 h-5" />
                {category}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pt-2">
                {groupedScriptures[category].map((scripture) => (
                  <Button
                    key={scripture.id}
                    variant="ghost"
                    onClick={() => onSelectScripture(scripture)}
                    className={cn(
                      "justify-start w-full text-left font-body text-base h-auto py-2 px-4 transition-all duration-200",
                      selectedScriptureId === scripture.id
                        ? "bg-accent/20 text-accent border-l-4 border-accent"
                        : "text-foreground/80 hover:bg-primary/50 hover:text-foreground"
                    )}
                  >
                    {scripture.title}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
