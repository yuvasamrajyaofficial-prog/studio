import { BackButton } from "@/components/ui/back-button";
import { ScriptureReader } from "@/components/scripture/scripture-reader";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentsSection } from "@/components/community/comments-section";

import { MOCK_CHAPTER } from "@/lib/mock-data";

export default async function ChapterPage({ params }: { params: Promise<{ id: string; chapterId: string }> }) {
  const { id, chapterId } = await params;
  
  // In real app: const chapter = await getChapter(id, chapterId);
  const chapter = chapterId === 'chapter-1' ? MOCK_CHAPTER : null;

  if (!chapter) {
    return notFound();
  }

  return (
    <div className="p-6 md:p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <BackButton label="Back to Book" href={`/scriptures/${id}`} />
      </div>

      <ScriptureReader 
        chapter={chapter} 
        scriptureId={id}
        nextChapterId="chapter-2"
      />
      
      <div className="mt-12">
        <CommentsSection contentId={chapterId} contentType="scripture" />
      </div>
    </div>
  );
}
