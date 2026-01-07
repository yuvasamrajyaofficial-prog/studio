import { Button } from "@/components/ui/badge"; // Using badge for tags
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

import { BackButton } from "@/components/ui/back-button";

export default async function ScriptureDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // In real app: const scripture = await getScripture(id);
  const scripture = id === 'bhagavad-gita' ? MOCK_SCRIPTURE : null;

  if (!scripture) {
    return notFound();
  }

  return (
    <div className="p-6 md:p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-6">
        <BackButton label="Back to Library" href="/scriptures" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar / Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            {scripture.coverImageUrl ? (
              <Image
                src={scripture.coverImageUrl}
                alt={scripture.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white/20" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {scripture.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-white/5 border-white/10 text-gray-400">{tag}</Badge>
              ))}
            </div>
            
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-yellow-500/50" /> {scripture.region}
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-500/50" /> {scripture.era?.replace('_', ' ')}
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-yellow-500/50" /> {scripture.language}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              {scripture.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {scripture.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-500/50" />
              Chapters
            </h2>
            <div className="grid gap-3">
              {scripture.chapters.map((chapter) => (
                <Link 
                  key={chapter.id} 
                  href={`/scriptures/${scripture.id}/chapter/${chapter.id}`}
                  className="block group"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
                        Chapter {chapter.number}: {chapter.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {chapter.description}
                      </div>
                    </div>
                    <ChevronLeft className="h-5 w-5 rotate-180 text-gray-600 group-hover:text-yellow-500 transition-all transform group-hover:translate-x-1" />
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
