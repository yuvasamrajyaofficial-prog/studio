"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Scripture } from "@/lib/scriptures";
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

  const defaultOpenCategories = orderedCategories.filter(
    (category) => scripturesByCategory[category]?.length > 0
  );

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
      defaultValue={defaultOpenCategories}
      className="w-full"
    >
      {orderedCategories.map((category) => {
        const categoryScriptures = scripturesByCategory[category];
        if (!categoryScriptures || categoryScriptures.length === 0) {
          return null;
        }
        return (
          <AccordionItem value={category} key={category}>
            <AccordionTrigger className="px-2 py-2 text-sm font-medium text-accent hover:no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 pl-4 border-l border-border ml-2">
                {categoryScriptures.map((scripture) => (
                  <Button
                    key={scripture.id}
                    variant="ghost"
                    asChild
                    className={cn(
                      "justify-start text-left font-normal h-auto py-1 px-2",
                      selectedScriptureId === scripture.id
                        ? "bg-primary/20 text-primary"
                        : "text-foreground/80 hover:bg-primary/10 hover:text-foreground"
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
