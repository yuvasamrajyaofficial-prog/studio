"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, Volume2, TextQuote, Settings2 } from "lucide-react";
import type { Chapter } from "@/types/scripture";
import { cn } from "@/lib/utils";

interface ScriptureReaderProps {
  chapter: Chapter;
  scriptureId: string;
  nextChapterId?: string;
  prevChapterId?: string;
}

export function ScriptureReader({ 
  chapter, 
  scriptureId, 
  nextChapterId,
  prevChapterId 
}: ScriptureReaderProps) {
  const [currentVerse, setCurrentVerse] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [showSettings, setShowSettings] = useState(false);

  const fontSizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  };

  const handleTTS = () => {
    // TODO: Implement Text-to-Speech
    const verse = chapter.verses[currentVerse];
    if ('speechSynthesis' in window && verse) {
      const utterance = new SpeechSynthesisUtterance(verse.sanskrit);
      utterance.lang = 'sa-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile-First Book Reader Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-foreground line-clamp-1">
              {chapter.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Verse {currentVerse + 1} of {chapter.verses.length}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="ml-2"
          >
            <Settings2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Font Size:</span>
              <div className="flex gap-1">
                {(["sm", "base", "lg", "xl"] as const).map((size) => (
                  <Button
                    key={size}
                    variant={fontSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFontSize(size)}
                    className="px-2 h-7"
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Reading Area - PDF/Book Style */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Verse Card - Clean, Book-like Design */}
          <Card className="p-6 sm:p-8 md:p-10 bg-card/50 border-border/50 shadow-lg">
            {chapter.verses.map((verse, index) => (
              <div
                key={verse.number}
                className={cn(
                  "transition-all duration-300",
                  index === currentVerse ? "block" : "hidden"
                )}
              >
                {/* Verse Number */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 text-primary font-bold">
                    {verse.number}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Verse {verse.number}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chapter.name}
                    </p>
                  </div>
                </div>

                {/* Sanskrit (Devanagari) */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <TextQuote className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-primary">
                      Sanskrit
                    </h3>
                  </div>
                  <p className={cn(
                    "font-serif leading-relaxed text-foreground",
                    fontSizes[fontSize],
                    fontSize === "xl" && "text-2xl",
                    fontSize === "lg" && "text-xl"
                  )}>
                    {verse.sanskrit}
                  </p>
                </div>

                {/* Transliteration */}
                {verse.transliteration && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                      Transliteration
                    </h3>
                    <p className={cn(
                      "font-mono leading-relaxed text-muted-foreground italic",
                      fontSizes[fontSize]
                    )}>
                      {verse.transliteration}
                    </p>
                  </div>
                )}

                {/* English Translation */}
                <div className="mb-8 p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Translation
                  </h3>
                  <p className={cn(
                    "leading-relaxed text-foreground",
                    fontSizes[fontSize]
                  )}>
                    {verse.english}
                  </p>
                </div>

                {/* Meaning/Commentary */}
                {verse.meaning && (
                  <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h3 className="text-sm font-semibold text-primary mb-3">
                      Meaning
                    </h3>
                    <p className={cn(
                      "leading-relaxed text-foreground/90",
                      fontSizes[fontSize]
                    )}>
                      {verse.meaning}
                    </p>
                  </div>
                )}

                {/* Audio Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTTS}
                    className="gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    Listen to Sanskrit
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Optimized */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border/50 p-4 pb-safe">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={() => setCurrentVerse(Math.max(0, currentVerse - 1))}
            disabled={currentVerse === 0}
            className="flex-1 max-w-[120px]"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="text-center flex-shrink-0">
            <p className="text-sm font-medium text-foreground">
              {currentVerse + 1} / {chapter.verses.length}
            </p>
            <div className="w-32 h-1 bg-muted rounded-full mt-1">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((currentVerse + 1) / chapter.verses.length) * 100}%` }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentVerse(Math.min(chapter.verses.length - 1, currentVerse + 1))}
            disabled={currentVerse === chapter.verses.length - 1}
            className="flex-1 max-w-[120px]"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Chapter Navigation */}
        {(prevChapterId || nextChapterId) && (
          <div className="flex gap-2 mt-4 max-w-4xl mx-auto">
            {prevChapterId && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="flex-1"
              >
                <a href={`/scriptures/${scriptureId}/chapter/${prevChapterId}`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Previous Chapter
                </a>
              </Button>
            )}
            {nextChapterId && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="flex-1"
              >
                <a href={`/scriptures/${scriptureId}/chapter/${nextChapterId}`}>
                  Next Chapter
                  <BookOpen className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
