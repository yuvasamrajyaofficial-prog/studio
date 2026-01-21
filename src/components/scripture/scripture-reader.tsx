"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Maximize2, Settings2, BookOpen, Download, Share2
} from "lucide-react";
import type { Chapter } from "@/types/scripture";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/social/share-button";

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
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToolbar, setShowToolbar] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate pages (group verses for pagination)
  const versesPerPage = 10;
  const totalPages = Math.ceil(chapter.verses.length / versesPerPage);

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
    return chapter.verses.slice(start, end);
  };

  return (
    <div className="h-screen bg-muted/30 flex flex-col overflow-hidden">
      {/* PDF Viewer Toolbar */}
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
                {chapter.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {chapter.verses.length} verses
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
              title={chapter.name}
              text={`Read ${chapter.name}`}
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

      {/* PDF Document Viewer */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto bg-muted/50 p-4 md:p-8"
        onClick={() => setShowToolbar(true)}
      >
        <div className="max-w-5xl mx-auto">
          {/* PDF-style Page */}
          <div 
            className="bg-white shadow-2xl rounded-sm mx-auto transition-all duration-200"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: '100%',
              maxWidth: '210mm', // A4 width
            }}
          >
            {/* Page Header */}
            <div className="border-b border-gray-200 px-8 md:px-12 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                    {chapter.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Chapter {chapter.number} • {chapter.summary}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">Page {currentPage}</p>
                  <p className="text-xs text-gray-400">{totalPages} pages</p>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="px-8 md:px-12 py-8 space-y-8">
              {getCurrentPageVerses().map((verse, idx) => (
                <div 
                  key={verse.number}
                  className="pb-8 border-b border-gray-100 last:border-0"
                >
                  {/* Verse Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                      {verse.number}
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      Verse {verse.number}
                    </span>
                  </div>

                  {/* Sanskrit Text */}
                  <div className="mb-6">
                    <p className="text-lg md:text-xl font-serif leading-relaxed text-gray-900">
                      {verse.sanskrit}
                    </p>
                  </div>

                  {/* Transliteration */}
                  {verse.transliteration && (
                    <div className="mb-6">
                      <p className="text-sm italic text-gray-600 font-mono">
                        {verse.transliteration}
                      </p>
                    </div>
                  )}

                  {/* Translation */}
                  <div className="mb-6 pl-4 border-l-4 border-indigo-200">
                    <p className="text-base leading-relaxed text-gray-700">
                      {verse.english}
                    </p>
                  </div>

                  {/* Meaning/Commentary */}
                  {verse.meaning && (
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-amber-900 mb-2">
                        Meaning:
                      </p>
                      <p className="text-sm leading-relaxed text-amber-800">
                        {verse.meaning}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Page Footer */}
            <div className="border-t border-gray-200 px-8 md:px-12 py-4 flex items-center justify-between text-xs text-gray-500">
              <span>{chapter.name}</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          {/* Chapter Navigation at Bottom */}
          {(prevChapterId || nextChapterId) && (
            <div className="mt-8 flex gap-4 justify-center max-w-4xl mx-auto">
              {prevChapterId && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 max-w-xs"
                >
                  <a href={`/scriptures/${scriptureId}/chapter/${prevChapterId}`}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous Chapter
                  </a>
                </Button>
              )}
              {nextChapterId && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 max-w-xs"
                >
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
  );
}
