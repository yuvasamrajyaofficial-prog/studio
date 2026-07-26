"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  BookOpen, Download 
} from "lucide-react";
import type { Chapter } from "@/types/scripture";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/social/share-button";
import { VerseViewer } from "./verse-viewer";

interface ScriptureReaderProps {
  chapter: Chapter | any;
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
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToolbar, setShowToolbar] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapterTitle = chapter.title?.en || chapter.name || `Chapter ${chapter.number}`;
  const chapterSummary = chapter.summary?.en || chapter.summary || '';
  const verseList = chapter.verses || [];

  const versesPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(verseList.length / versesPerPage));

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setShowToolbar(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowToolbar(false), 2000);
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 10));
  const handleZoomOut = () => setZoom(prev => Math.max(50, prev - 10));

  const getCurrentPageVerses = () => {
    const start = (currentPage - 1) * versesPerPage;
    const end = start + versesPerPage;
    return verseList.slice(start, end);
  };

  return (
    <div className="h-screen bg-muted/30 flex flex-col overflow-hidden">
      {/* Reader Toolbar */}
      <div className={cn(
        "bg-background/95 backdrop-blur-sm border-b border-border/50 transition-all duration-300",
        showToolbar ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Chapter Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-foreground truncate">
                {chapterTitle}
              </h1>
              <p className="text-xs text-muted-foreground">
                {verseList.length} verses
              </p>
            </div>
          </div>

          {/* Center: Zoom Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-16 text-center">
              {zoom}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <ShareButton
              title={chapterTitle}
              text={`Read ${chapterTitle}`}
              hashtags={["Scripture", "Wisdom"]}
              className="hidden sm:flex"
            />
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-center gap-4 px-4 py-2 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Page</span>
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
              className="w-12 h-7 text-center text-sm border border-border rounded bg-background"
              min={1}
              max={totalPages}
            />
            <span className="text-sm text-muted-foreground">of {totalPages}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Reader Document View */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto bg-muted/50 p-4 md:p-8"
        onClick={() => setShowToolbar(true)}
      >
        <div className="max-w-4xl mx-auto">
          <div 
            className="transition-all duration-200"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: '100%',
            }}
          >
            {/* Header */}
            <div className="border-b border-border/50 pb-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {chapterTitle}
              </h2>
              {chapterSummary && (
                <p className="text-sm text-muted-foreground mt-2">
                  Chapter {chapter.number} • {chapterSummary}
                </p>
              )}
            </div>

            {/* Verses List */}
            <div className="space-y-6">
              {getCurrentPageVerses().map((verseItem: any, idx: number) => {
                const formattedVerse = {
                  id: verseItem.id || `v-${verseItem.number || idx + 1}`,
                  scriptureId,
                  chapterId: chapter.id || 'ch-1',
                  number: verseItem.number || idx + 1,
                  text: {
                    original: verseItem.text?.original || verseItem.sanskrit || '',
                    transliteration: verseItem.text?.transliteration || verseItem.transliteration || '',
                  },
                  translations: {
                    en: verseItem.translations?.en || verseItem.english || verseItem.meaning || '',
                    hi: verseItem.translations?.hi || '',
                    sa: verseItem.translations?.sa || '',
                  },
                  commentary: {
                    en: verseItem.commentary?.en || verseItem.meaning || '',
                    hi: verseItem.commentary?.hi || '',
                  },
                  audioUrl: verseItem.audioUrl || '',
                };

                return (
                  <VerseViewer 
                    key={formattedVerse.id || idx} 
                    verse={formattedVerse} 
                    showAudio={true}
                  />
                );
              })}
            </div>

            {/* Navigation Buttons */}
            {(prevChapterId || nextChapterId) && (
              <div className="mt-12 flex gap-4 justify-center">
                {prevChapterId && (
                  <Button asChild variant="outline" className="flex-1 max-w-xs">
                    <a href={`/scriptures/${scriptureId}/chapter/${prevChapterId}`}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous Chapter
                    </a>
                  </Button>
                )}
                {nextChapterId && (
                  <Button asChild variant="outline" className="flex-1 max-w-xs">
                    <a href={`/scriptures/${scriptureId}/chapter/${nextChapterId}`}>
                      Next Chapter
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
