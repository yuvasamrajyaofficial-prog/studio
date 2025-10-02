"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Scripture, ScriptureCategory } from '@/lib/scriptures';
import { orderedCategories } from '@/lib/scriptures';
import { Layers } from 'lucide-react';

interface ScriptureHierarchyProps {
  scriptures: Scripture[];
}

export function ScriptureHierarchy({ scriptures }: ScriptureHierarchyProps) {
  const groupedScriptures = useMemo(() => {
    return scriptures.reduce((acc, scripture) => {
      (acc[scripture.category] = acc[scripture.category] || []).push(scripture);
      return acc;
    }, {} as Record<ScriptureCategory, Scripture[]>);
  }, [scriptures]);

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-headline text-xl text-accent/90">
          <Layers className="w-6 h-6" />
          Scripture Hierarchy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48">
          <div className="space-y-4">
            {orderedCategories.map((category) => {
              const categoryScriptures = groupedScriptures[category];
              if (!categoryScriptures || categoryScriptures.length === 0) {
                return null;
              }
              return (
                <div key={category}>
                  <h4 className="font-headline text-md text-accent">{category}</h4>
                  <ul className="pl-4 mt-1 space-y-1">
                    {categoryScriptures.map((scripture) => (
                      <li key={scripture.id} className="text-sm text-foreground/80 leading-tight">
                        {scripture.title}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
