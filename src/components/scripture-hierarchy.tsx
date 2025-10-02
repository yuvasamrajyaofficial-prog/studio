"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { scriptures, orderedCategories } from "@/lib/scriptures";
import { ScrollArea } from "./ui/scroll-area";
import { ConstellationIcon } from "./icons/constellation";

export function ScriptureHierarchy() {
  const scripturesByCategory = scriptures.reduce((acc, scripture) => {
    if (!acc[scripture.category]) {
      acc[scripture.category] = [];
    }
    acc[scripture.category].push(scripture);
    return acc;
  }, {} as Record<string, typeof scriptures>);

  return (
    <div className="p-4 rounded-lg bg-card/50 border border-border h-full flex flex-col">
         <div className="flex items-center gap-3 mb-4">
             <ConstellationIcon className="w-8 h-8" />
            <h3 className="font-headline text-lg text-accent">Scripture Hierarchy</h3>
        </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" className="w-full">
          {orderedCategories.map((category) => {
            const categoryScriptures = scripturesByCategory[category];
            if (!categoryScriptures) return null;
            return (
              <AccordionItem value={category} key={category}>
                <AccordionTrigger className="text-sm px-2 hover:no-underline">
                  {category} ({categoryScriptures.length})
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-8 text-xs text-muted-foreground space-y-1 py-2">
                    {categoryScriptures.map((scripture) => (
                      <li key={scripture.id}>{scripture.title}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
