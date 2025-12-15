"use client";

import { Verse } from "@/types/scripture";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { AudioPlayer } from "./audio-player";
import { cn } from "@/lib/utils";

interface VerseViewerProps {
  verse: Verse;
  showAudio?: boolean;
}

export function VerseViewer({ verse, showAudio = true }: VerseViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <Card className="mb-6 border-l-4 border-l-primary/50 hover:border-l-primary transition-colors">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
            Verse {verse.number}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/90 whitespace-pre-line">
            {verse.originalText}
          </p>
        </div>

        <div className="space-y-4">
          {verse.translations.map((trans, idx) => (
            <div key={idx} className="bg-muted/30 p-4 rounded-lg">
              <p className="text-lg text-foreground/80 font-medium">
                {trans.text}
              </p>
              <p className="text-xs text-muted-foreground mt-2 text-right">
                — {trans.language}
              </p>
            </div>
          ))}
        </div>

        {verse.meaning && (
          <div className="mt-4">
            <Button 
              variant="link" 
              className="px-0 text-primary"
              onClick={() => setShowMeaning(!showMeaning)}
            >
              {showMeaning ? "Hide Purport" : "Read Purport"}
            </Button>
            {showMeaning && (
              <div className="mt-2 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2">
                {verse.meaning}
              </div>
            )}
          </div>
        )}

        {showAudio && verse.audioUrl && (
          <div className="mt-6 pt-4 border-t">
            {!isPlaying ? (
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsPlaying(true)}
              >
                <PlayCircle className="h-4 w-4" />
                Listen to Verse
              </Button>
            ) : (
              <AudioPlayer 
                src={verse.audioUrl} 
                title={`Verse ${verse.number}`}
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
