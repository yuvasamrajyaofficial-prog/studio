"use client";

import { Chapter } from "@/types/scripture";
import { VerseViewer } from "./verse-viewer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ScriptureReaderProps {
  chapter: Chapter;
  scriptureId: string;
  prevChapterId?: string;
  nextChapterId?: string;
}

export function ScriptureReader({ 
  chapter, 
  scriptureId, 
  prevChapterId, 
  nextChapterId 
}: ScriptureReaderProps) {
  return (
    <div className="max-w-3xl mx-auto pb-24">
      <div className="mb-8 text-center space-y-2">
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Chapter {chapter.number}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          {chapter.title}
        </h1>
        {chapter.description && (
          <p className="text-muted-foreground max-w-xl mx-auto">
            {chapter.description}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {chapter.verses.map((verse) => (
          <VerseViewer key={verse.id} verse={verse} />
        ))}
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t">
        {prevChapterId ? (
          <Button variant="outline" asChild>
            <Link href={`/scriptures/${scriptureId}/chapter/${prevChapterId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextChapterId ? (
          <Button asChild>
            <Link href={`/scriptures/${scriptureId}/chapter/${nextChapterId}`}>
              Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
