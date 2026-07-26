"use client";

import { Verse } from "@/types/scripture";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Share2, Bookmark, BookOpen, Languages } from "lucide-react";
import { useState } from "react";
import { AudioPlayer } from "./audio-player";
import { ShareButton } from "@/components/social/share-button";

interface VerseViewerProps {
  verse: Verse;
  showAudio?: boolean;
}

export function VerseViewer({ verse, showAudio = true }: VerseViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'sa'>('en');

  const originalText = verse.text?.original || '';
  const transliteration = verse.text?.transliteration || '';
  const translationText = verse.translations?.[selectedLang] || verse.translations?.en || verse.meaning || '';
  const commentaryText = verse.commentary?.[selectedLang] || verse.commentary?.en || '';

  return (
    <Card className="mb-6 border-l-4 border-l-primary/50 hover:border-l-primary transition-colors bg-card/60 border-border/50">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Verse {verse.number}
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/50 text-xs">
              <Languages className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
              <button 
                onClick={() => setSelectedLang('en')}
                className={`px-2 py-0.5 rounded ${selectedLang === 'en' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setSelectedLang('hi')}
                className={`px-2 py-0.5 rounded ${selectedLang === 'hi' ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                HI
              </button>
            </div>

            <ShareButton 
              title={`Verse ${verse.number}`}
              text={originalText}
              hashtags={["Verse", "AncientWisdom"]}
            />
          </div>
        </div>

        {/* Original Shloka */}
        <div className="text-center mb-6 py-4 px-6 bg-muted/20 rounded-xl border border-border/30">
          <p className="text-xl md:text-2xl font-serif font-bold leading-relaxed text-foreground/90 font-devanagari">
            {originalText}
          </p>
          {transliteration && (
            <p className="text-sm italic text-muted-foreground mt-3 font-mono">
              {transliteration}
            </p>
          )}
        </div>

        {/* Translation */}
        {translationText && (
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mb-4">
            <p className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider text-[10px]">Translation</p>
            <p className="text-base text-foreground/90 leading-relaxed font-sans">
              {translationText}
            </p>
          </div>
        )}

        {/* Purport / Commentary Toggle */}
        {commentaryText && (
          <div className="mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 text-xs border-border/50 text-muted-foreground hover:text-foreground"
              onClick={() => setShowMeaning(!showMeaning)}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              {showMeaning ? "Hide Purport & Commentary" : "Read Purport & Commentary"}
            </Button>

            {showMeaning && (
              <div className="mt-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-muted-foreground leading-relaxed text-sm animate-in fade-in slide-in-from-top-2">
                <p className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wider">Philosophical Commentary (Bhashya)</p>
                {commentaryText}
              </div>
            )}
          </div>
        )}

        {/* Audio Player */}
        {showAudio && verse.audioUrl && (
          <div className="mt-6 pt-4 border-t border-border/40">
            {!isPlaying ? (
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2 text-xs border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => setIsPlaying(true)}
              >
                <PlayCircle className="h-4 w-4" />
                Listen to Recitation
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
