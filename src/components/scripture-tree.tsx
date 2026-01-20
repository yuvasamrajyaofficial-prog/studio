"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Scripture, ScriptureCategory } from "@/lib/scriptures";
import { orderedCategories } from "@/lib/scriptures";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ScriptureTreeProps {
  scriptures: Scripture[];
}

export function ScriptureTree({
  scriptures,
}: ScriptureTreeProps) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const selectedScriptureId = pathSegments.length > 2 ? pathSegments[pathSegments.length - 1] : null;


  const scripturesByCategory = scriptures.reduce((acc, scripture) => {
    if (!acc[scripture.category]) {
      acc[scripture.category] = [];
    }
    acc[scripture.category].push(scripture);
    return acc;
  }, {} as Record<string, Scripture[]>);
  
  const availableCategories = orderedCategories.filter(category => scripturesByCategory[category]);

  const defaultOpenCategories = availableCategories;

  if (!scriptures.length) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-foreground/60">
            <p>No scriptures available for this era.</p>
        </div>
    );
  }

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={availableCategories}
    >
      {availableCategories.map((category) => {
        const categoryScriptures = scripturesByCategory[category];
        if (!categoryScriptures || categoryScriptures.length === 0) {
          return null;
        }
        return (
          <AccordionItem value={category} key={category} className="border-border/50">
            <AccordionTrigger className="px-2 py-2 text-sm font-headline font-bold text-primary hover:no-underline hover:text-primary/80">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pl-4 border-l border-border/50 ml-2">
                {categoryScriptures.map((scripture) => (
                  <Button
                    key={scripture.id}
                    variant="ghost"
                    asChild
                    className={cn(
                      "justify-start text-left font-body font-normal h-auto py-1.5 px-2",
                      selectedScriptureId === scripture.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                  >
                    <Link href={`/scriptures/${scripture.id}`}>
                      {scripture.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
