import { scriptures, type Scripture } from '@/lib/scriptures';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScriptureDetails } from '@/components/scripture-details';
import { EraSlider } from '@/components/era-slider';
import { ScriptureTree } from '@/components/scripture-tree';
import { ScriptureHierarchy } from '@/components/scripture-hierarchy';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, Telescope } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export async function generateStaticParams() {
  return scriptures.map((scripture) => ({
    id: scripture.id,
  }));
}

function getScripture(id: string): Scripture | undefined {
  return scriptures.find((s) => s.id === id);
}

export default function ScripturePage({ params }: { params: { id: string } }) {
  const scripture = getScripture(params.id);

  if (!scripture) {
    notFound();
  }

  // For now, we are not filtering scriptures on this page, but you might want to add logic here
  // based on era or other criteria if needed. The main page handles era filtering.
  const allScriptures = scriptures;
  const selectedEra = scripture.yuga === 'Timeless' ? 'Kali' : scripture.yuga; // A default for display

  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-8">
          <aside className="lg:col-span-1 flex flex-col gap-8">
            <div className="p-4 rounded-lg bg-card/50 border border-border">
                <Button asChild variant="outline" className="w-full">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Library
                    </Link>
                </Button>
            </div>
            <Tabs defaultValue="library" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="library">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Cosmic Library
                  </TabsTrigger>
                <TabsTrigger value="hierarchy">
                  <Telescope className="mr-2 h-4 w-4" />
                  Hierarchy
                  </TabsTrigger>
              </TabsList>
               <ScrollArea className="mt-4 flex-1 bg-card/50 border border-border rounded-lg h-0 min-h-[400px]">
                <TabsContent value="library" className="p-2">
                    <ScriptureTree 
                      scriptures={allScriptures} 
                    />
                </TabsContent>
                <TabsContent value="hierarchy">
                    <ScriptureHierarchy />
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </aside>
          
          <section className="lg:col-span-2">
             <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                <ScriptureDetails 
                    key={scripture.id} 
                    scripture={scripture} 
                    era={selectedEra} 
                />
             </ScrollArea>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
