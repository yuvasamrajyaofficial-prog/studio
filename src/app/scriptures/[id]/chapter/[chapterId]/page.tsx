import { BackButton } from "@/components/ui/back-button";
import { ScriptureReader } from "@/components/scripture/scripture-reader";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock Data - In real app, fetch from Firestore
const MOCK_CHAPTER = {
  id: "chapter-1",
  number: 1,
  title: "Arjuna Vishada Yoga",
  description: "The Yoga of Despondency",
  verses: [
    {
      id: "1.1",
      number: 1,
      originalText: "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||1||",
      translations: [
        {
          language: "English",
          text: "Dhritarashtra said: O Sanjay, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?"
        }
      ],
      audioUrl: "https://example.com/audio/1.1.mp3", // Placeholder
      meaning: "The first verse sets the scene. Dhritarashtra, the blind King, asks his secretary Sanjay about the events on the battlefield. The word 'Dharmakshetra' implies that Kurukshetra is not just a physical ground but a field where Dharma (righteousness) will be tested."
    },
    {
      id: "1.2",
      number: 2,
      originalText: "सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ||2||",
      translations: [
        {
          language: "English",
          text: "Sanjay said: On observing the Pandava army standing in military formation, King Duryodhana approached his teacher Dronacharya and spoke the following words."
        }
      ]
    }
  ]
};

import { BackButton } from "@/components/ui/back-button";

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
    </div>
  );
}
