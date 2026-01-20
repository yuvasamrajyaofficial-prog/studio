"use client";

// Accordion imports removed
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
    <div className="w-full space-y-6">
      {availableCategories.map((category) => {
        const categoryScriptures = scripturesByCategory[category];
        if (!categoryScriptures || categoryScriptures.length === 0) {
          return null;
        }
        return (
          <div key={category} className="space-y-2">
            <h3 className="px-2 text-sm font-headline font-bold text-primary uppercase tracking-wider opacity-80">
              {category}
            </h3>
            <div className="flex flex-col gap-1 pl-2 border-l-2 border-primary/10 ml-2">
              {categoryScriptures.map((scripture) => (
                <Button
                  key={scripture.id}
                  variant="ghost"
                  asChild
                  className={cn(
                    "justify-start text-left font-body font-normal h-auto py-2 px-3 rounded-lg transition-all",
                    selectedScriptureId === scripture.id
                      ? "bg-primary/10 text-primary font-medium translate-x-1"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                  )}
                >
                  <Link href={`/scriptures/${scripture.id}`}>
                    {scripture.title}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
