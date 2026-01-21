import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShareButton } from "@/components/social/share-button";
import { JsonLd } from "@/components/seo/json-ld";
import { BookOpen, Clock, Star } from "lucide-react";

// Mock data - replace with Firestore fetch
const MOCK_SCRIPTURE = {
  id: "bhagavad-gita",
  title: "Bhagavad Gita",
  author: "Vyasa",
  description: "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a conversation between Prince Arjuna and Krishna on the battlefield of Kurukshetra.",
  coverImage: "https://placehold.co/600x900/6D28D9/FCD34D/png?text=Bhagavad+Gita",
  totalChapters: 18,
  totalVerses: 700,
  yuga: "Dvapara Yuga",
  chapters: [
    { id: "chapter-1", number: 1, name: "Arjuna Vishada Yoga", summary: "The Yoga of Arjuna's Dejection", verses: 47 },
    { id: "chapter-2", number: 2, name: "Sankhya Yoga", summary: "The Yoga of Knowledge", verses: 72 },
    { id: "chapter-3", number: 3, name: "Karma Yoga", summary: "The Yoga of Action", verses: 43 },
    { id: "chapter-4", number: 4, name: "Jnana Yoga", summary: "The Yoga of Wisdom", verses: 42 },
    { id: "chapter-5", number: 5, name: "Karma Sanyasa Yoga", summary: "The Yoga of Renunciation", verses: 29 },
  ]
};

export default async function ScriptureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // TODO: Fetch from Firestore
  const scripture = id === "bhagavad-gita" ? MOCK_SCRIPTURE : null;

  if (!scripture) {
    return notFound();
  }

  return (
    <>
      <JsonLd
        type="Book"
        data={{
          title: scripture.title,
          author: scripture.author,
          description: scripture.description,
          datePublished: "300 BCE",
          inLanguage: ["sa", "en"],
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cover Image */}
              <div className="lg:col-span-1">
                <div className="relative aspect-[2/3] w-full max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={scripture.coverImage}
                    alt={scripture.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              {/* Scripture Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline mb-3">
                    {scripture.title}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-2">
                    By {scripture.author}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    {scripture.yuga}
                  </p>
                </div>

                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {scripture.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{scripture.totalChapters}</p>
                      <p className="text-xs text-muted-foreground">Chapters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{scripture.totalVerses}</p>
                      <p className="text-xs text-muted-foreground">Verses</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href={`/scriptures/${id}/chapter/chapter-1`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Reading
                    </Link>
                  </Button>
                  
                  <ShareButton
                    title={scripture.title}
                    text={`Read ${scripture.title} on MALOLA`}
                    hashtags={["Spirituality", scripture.title.replace(/\s+/g, "")]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters List */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Chapters
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {scripture.chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/scriptures/${id}/chapter/${chapter.id}`}
              >
                <Card className="p-4 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {chapter.number}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                        {chapter.name}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        {chapter.summary}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {chapter.verses} verses
                      </p>
                    </div>

                    <div className="flex-shrink-0 self-end sm:self-center">
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Read Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
