"use client";

import { Chapter } from "@/types/scripture";
import { CosmicReader } from "./cosmic-reader";
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
  
  // Transform existing verse data to match CosmicReader's Verse interface
  const cosmicVerses = chapter.verses.map(v => ({
    id: v.id,
    number: v.number,
    text: {
      original: v.text,
      transliteration: v.transliteration
    },
    translations: {
      en: v.translation,
      // Add other languages if available in your data model
    }
  }));

  return (
    <div className="max-w-5xl mx-auto pb-24">
      
      {/* Cosmic Reader Integration */}
      <CosmicReader 
        mode="verse"
        content={{
          title: chapter.title,
          verses: cosmicVerses
        }}
      />

      {/* Navigation Footer */}
      <div className="flex justify-between mt-12 pt-8 border-t border-white/10 max-w-4xl mx-auto">
        {prevChapterId ? (
          <Button variant="outline" asChild className="border-white/10 hover:bg-white/5 text-white">
            <Link href={`/scriptures/${scriptureId}/chapter/${prevChapterId}`}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextChapterId ? (
          <Button asChild className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white border-0">
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
