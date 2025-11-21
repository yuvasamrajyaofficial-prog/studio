

"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getScriptureSummaryAction } from "@/app/actions";
import type { Scripture } from "@/lib/scriptures";
import { BookOpen, AlertTriangle, Atom, Route } from "lucide-react";
import { Button } from "./ui/button";

interface ScriptureDetailsProps {
  scripture: Scripture | null;
  era: string;
}

type SummaryData = {
  summary: string | null;
  biasContext: string | null;
  error?: string | null;
};

function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    </div>
  );
}

export function ScriptureDetails({ scripture, era }: ScriptureDetailsProps) {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (scripture) {
      startTransition(() => {
        setSummaryData(null);
        getScriptureSummaryAction({
          scriptureContent: scripture.description,
          era: era,
          category: scripture.category,
        }).then(setSummaryData);
      });
    } else {
      setSummaryData(null); // Clear data if no scripture is selected
    }
  }, [scripture, era]);

  if (!scripture) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-foreground/60">
        <BookOpen className="w-16 h-16 mb-4 text-accent/50" />
        <h2 className="font-headline text-2xl text-foreground/80">Select a Scripture</h2>
        <p className="mt-2 max-w-sm">Choose a text from the cosmic library to reveal its summary and contextual analysis.</p>
      </div>
    );
  }

  return (
    <div className="p-1">
      <h2 className="font-headline text-3xl md:text-4xl text-accent mb-6">{scripture.title}</h2>
      
      {isPending || !summaryData ? (
        <DetailsSkeleton />
      ) : summaryData?.error ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{summaryData.error}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <Card className="bg-card/70 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl text-accent/90">
                <Atom className="w-6 h-6" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed font-body text-base">{summaryData.summary}</p>
            </CardContent>
          </Card>
          
          {scripture.roadmap && scripture.roadmap.length > 0 && (
            <Card className="bg-card/70 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline text-2xl text-accent/90">
                  <Route className="w-6 h-6" />
                  Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {scripture.roadmap.map((item, index) => (
                  <Button key={index} variant="outline" size="sm">
                    {item}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="bg-card/70 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-headline text-2xl text-accent/90">
                <AlertTriangle className="w-6 h-6" />
                Bias Context
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed font-body text-base">{summaryData.biasContext}</p>
            </CardContent>
          </Card>
        </div>
      ) }
    </div>
  );
}
