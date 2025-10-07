import { scriptures, type Scripture } from '@/lib/scriptures';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScriptureDetails } from '@/components/scripture-details';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

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

  const selectedEra = scripture.yuga === 'Timeless' ? 'Kali' : scripture.yuga; // A default for display

  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 container mx-auto p-4 sm:p-8">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Library
              </Link>
            </Button>
          </div>

          <section>
             <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
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
