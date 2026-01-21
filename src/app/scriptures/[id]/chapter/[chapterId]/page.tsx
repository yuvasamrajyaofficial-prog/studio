import { BackButton } from "@/components/ui/back-button";
import { ScriptureReader } from "@/components/scripture/scripture-reader";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentsSection } from "@/components/community/comments-section";
import { ShareButton } from "@/components/social/share-button";
import { JsonLd } from "@/components/seo/json-ld";

import { MOCK_CHAPTER } from "@/lib/mock-data";

export default async function ChapterPage({ params }: { params: Promise<{ id: string; chapterId: string }> }) {
  const { id, chapterId } = await params;
  
  // In real app: const chapter = await getChapter(id, chapterId);
  const chapter = chapterId === 'chapter-1' ? MOCK_CHAPTER : null;

  if (!chapter) {
    return notFound();
  }

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: `${chapter.name} - Scripture Chapter`,
          description: chapter.summary || `Read ${chapter.name} from ancient scriptures`,
          datePublished: new Date().toISOString(),
          inLanguage: ["sa", "en"],
        }}
      />
      
      <div className="p-6 md:p-8 lg:p-12 max-w-5xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <BackButton label="Back to Book" href={`/scriptures/${id}`} />
          <ShareButton
            title={chapter.name}
            text={`Read ${chapter.name} on MALOLA`}
            hashtags={["Spirituality", "AncientWisdom"]}
          />
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
    </>
  );
}
