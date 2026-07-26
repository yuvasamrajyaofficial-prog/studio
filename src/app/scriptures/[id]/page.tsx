import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShareButton } from "@/components/social/share-button";
import { JsonLd } from "@/components/seo/json-ld";
import { BookOpen, Clock, Star, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { scriptureConverter, chapterConverter } from "@/lib/firebase/converters";
import type { Scripture, Chapter } from "@/types/schema";

export default async function ScriptureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch from Firestore
  const scriptureDocRef = doc(db, "scriptures", id).withConverter(scriptureConverter);
  const scriptureSnap = await getDoc(scriptureDocRef);
  
  if (!scriptureSnap.exists()) {
    return notFound();
  }

  const scriptureData = scriptureSnap.data() as any;

  // Fetch chapters
  const chaptersQuery = query(
    collection(db, "chapters"),
    where("scriptureId", "==", id),
    orderBy("number")
  ).withConverter(chapterConverter);
  
  const chaptersSnap = await getDocs(chaptersQuery);
  const chapters = chaptersSnap.docs.map(d => Object.assign({ id: d.id }, d.data()));

  // Fetch media items (PDFs, images)
  const mediaQuery = query(
    collection(db, "media"),
    where("scriptureId", "==", id)
  );
  const mediaSnap = await getDocs(mediaQuery);
  const mediaItems = mediaSnap.docs
    .map(d => ({ id: d.id, ...d.data() } as any))
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  // Fetch published blogs related to this scripture
  const blogsQuery = query(
    collection(db, "blogs"),
    where("scriptureId", "==", id),
    where("published", "==", true)
  );
  const blogsSnap = await getDocs(blogsQuery);
  const blogs = blogsSnap.docs
    .map(d => ({ id: d.id, ...d.data() } as any))
    .sort((a, b) => {
      const orderA = a.orderIndex !== undefined ? a.orderIndex : 999999;
      const orderB = b.orderIndex !== undefined ? b.orderIndex : 999999;
      if (orderA !== orderB) return orderA - orderB;
      // Secondary sort: createdAt desc
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });

  const scripture = {
    ...scriptureData,
    title: scriptureData.title?.en || "Unknown Title",
    description: scriptureData.description?.en || "No description available",
    author: scriptureData.metadata?.author || scriptureData.author || "Unknown",
    coverImage: scriptureData.metadata?.coverImage || scriptureData.coverImage || "https://placehold.co/600x900/6D28D9/FCD34D/png?text=Scripture",
    totalChapters: chapters.length,
    totalVerses: scriptureData.verses || 0,
    yuga: scriptureData.yuga,
    chapters: chapters.map((c: any) => ({
      id: c.id,
      number: c.number,
      name: c.title?.en || "Chapter",
      summary: c.summary?.en || "Chapter summary...",
      verses: c.versesCount || 0
    }))
  };

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

      <div className="min-h-screen bg-background text-foreground">
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

        {/* content Area with tabs */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <Tabs defaultValue="chapters" className="w-full">
            <TabsList className="bg-muted/20 border-b border-border/50 mb-8 w-full justify-start overflow-x-auto h-auto p-1 gap-2 flex">
              <TabsTrigger 
                value="chapters" 
                className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary border border-transparent rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:bg-muted/30"
              >
                Chapters ({scripture.totalChapters})
              </TabsTrigger>
              <TabsTrigger 
                value="media" 
                className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary border border-transparent rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:bg-muted/30"
              >
                Sacred PDF Vault ({mediaItems.length})
              </TabsTrigger>
              <TabsTrigger 
                value="blogs" 
                className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary border border-transparent rounded-lg px-4 py-2.5 text-sm font-semibold transition-all hover:bg-muted/30"
              >
                Related Commentary & Blogs ({blogs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chapters" className="space-y-4 outline-none">
              <div className="grid grid-cols-1 gap-4">
                {scripture.chapters.map((chapter: any) => (
                  <Link
                    key={chapter.id}
                    href={`/scriptures/${id}/chapter/${chapter.id}`}
                  >
                    <Card className="p-4 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group bg-card/50 border-border/50">
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
                          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-border/50">
                            Read Now
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
                
                {scripture.chapters.length === 0 && (
                  <div className="text-center py-16 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/40">
                    <p className="text-lg font-medium mb-1">No chapters available.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="media" className="outline-none space-y-4">
              {mediaItems.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/40">
                  <p className="text-lg font-medium mb-1">No PDFs or media attachments available yet.</p>
                  <p className="text-sm">Check back later for supplementary documents regarding this scripture.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mediaItems.map((item: any) => (
                    <Card key={item.id} className="p-5 hover:border-primary/50 hover:shadow-lg transition-all border-border/50 bg-card/50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-primary/10 text-primary uppercase">
                            {item.fileType || "PDF"}
                          </span>
                          <span className="text-xs text-muted-foreground">Order #{item.orderIndex || 0}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-1 hover:text-primary transition-colors text-foreground">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                        <span className="text-xs font-medium text-muted-foreground truncate max-w-[200px] font-mono flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-muted-foreground/75" />
                          {item.fileName}
                        </span>
                        <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                            Open File
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="blogs" className="outline-none space-y-4">
              {blogs.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/40">
                  <p className="text-lg font-medium mb-1">No commentary or articles linked yet.</p>
                  <p className="text-sm">We are preparing reflections and commentaries. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blogItem: any) => (
                    <Card key={blogItem.id} className="overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all border-border/50 bg-card/50 flex flex-col">
                      {blogItem.coverImage && (
                        <div className="relative aspect-video w-full overflow-hidden border-b border-border/40">
                          <img
                            src={blogItem.coverImage}
                            alt={blogItem.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                              {blogItem.format || "markdown"}
                            </span>
                            {blogItem.tags && blogItem.tags.slice(0, 2).map((t: string) => (
                              <span key={t} className="text-xs text-muted-foreground">#{t}</span>
                            ))}
                          </div>
                          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors text-foreground">
                            <Link href={`/blogs/${blogItem.slug || blogItem.id}`}>
                              {blogItem.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                            {blogItem.excerpt}
                          </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground">
                            By {blogItem.author || "Admin"}
                          </span>
                          <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary/90 p-0">
                            <Link href={`/blogs/${blogItem.slug || blogItem.id}`}>
                              Read Article →
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
