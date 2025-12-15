import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, BookOpen, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Mock Data - In real app, fetch from Firestore
const MOCK_SCRIPTURE = {
  id: "bhagavad-gita",
  title: "Srimad Bhagavad Gita",
  author: "Vyasa",
  region: "India",
  religion: "Hinduism",
  era: "DVAPARA_YUGA",
  language: "Sanskrit",
  description: "The Srimad Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It is set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna.",
  coverImageUrl: "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=800&auto=format&fit=crop",
  tags: ["Yoga", "Dharma", "Karma", "Bhakti", "Jnana"],
  chapters: Array.from({ length: 18 }, (_, i) => ({
    id: `chapter-${i + 1}`,
    number: i + 1,
    title: `Chapter ${i + 1}`,
    description: "The Yoga of Despondency",
    verses: []
  })),
  isPublic: true
};

export default async function ScriptureDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // In real app: const scripture = await getScripture(id);
  const scripture = id === 'bhagavad-gita' ? MOCK_SCRIPTURE : null;

  if (!scripture) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2 transition-all">
        <Link href="/scriptures">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Library
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar / Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
            {scripture.coverImageUrl ? (
              <Image
                src={scripture.coverImageUrl}
                alt={scripture.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {scripture.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {scripture.region}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {scripture.era?.replace('_', ' ')}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> {scripture.language}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline mb-4">{scripture.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {scripture.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-headline">Chapters</h2>
            <div className="grid gap-4">
              {scripture.chapters.map((chapter) => (
                <Link 
                  key={chapter.id} 
                  href={`/scriptures/${scripture.id}/chapter/${chapter.id}`}
                  className="block group"
                >
                  <div className="border rounded-lg p-4 hover:bg-accent transition-colors flex items-center justify-between">
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        Chapter {chapter.number}: {chapter.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chapter.description}
                      </div>
                    </div>
                    <ChevronLeft className="h-5 w-5 rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
