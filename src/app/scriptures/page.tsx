import { ScriptureCard } from "@/components/scripture/scripture-card";
import { Scripture } from "@/types/scripture";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock Data - In real app, fetch from Firestore
const MOCK_SCRIPTURES: Scripture[] = [
  {
    id: "bhagavad-gita",
    title: "Srimad Bhagavad Gita",
    author: "Vyasa",
    region: "India",
    religion: "Hinduism",
    era: "DVAPARA_YUGA",
    language: "Sanskrit",
    description: "The divine conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra, revealing the essence of Vedic wisdom.",
    coverImageUrl: "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?q=80&w=800&auto=format&fit=crop",
    tags: ["Yoga", "Dharma", "Karma"],
    chapters: [],
    isPublic: true
  },
  {
    id: "yoga-sutras",
    title: "Patanjali Yoga Sutras",
    author: "Patanjali",
    region: "India",
    religion: "Hinduism",
    era: "UNKNOWN",
    language: "Sanskrit",
    description: "The foundational text of Yoga philosophy, outlining the eight limbs of yoga for spiritual liberation.",
    tags: ["Meditation", "Mind", "Philosophy"],
    chapters: [],
    isPublic: true
  },
  {
    id: "dhammapada",
    title: "The Dhammapada",
    region: "India",
    religion: "Buddhism",
    era: "UNKNOWN",
    language: "Pali",
    description: "A collection of sayings of the Buddha in verse form and one of the most widely read and best known Buddhist scriptures.",
    tags: ["Buddhism", "Ethics", "Mindfulness"],
    chapters: [],
    isPublic: true
  }
];

export default function ScriptureLibraryPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <h1 className="text-4xl font-bold font-headline">Scripture Library</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore the timeless wisdom of ancient texts. Read, listen, and reflect on verses that have guided civilizations for millennia.
        </p>
        
        <div className="relative w-full max-w-md mt-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search scriptures, authors, or topics..." 
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SCRIPTURES.map((scripture) => (
          <ScriptureCard key={scripture.id} scripture={scripture} />
        ))}
      </div>
    </div>
  );
}
