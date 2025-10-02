"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { EraSlider } from '@/components/era-slider';
import { ScriptureTree } from '@/components/scripture-tree';
import { ScriptureDetails } from '@/components/scripture-details';
import { scriptures, type Scripture } from '@/lib/scriptures';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [selectedEra, setSelectedEra] = useState<string>('Kali');
  // Set the first scripture as the default selected one
  const [selectedScripture, setSelectedScripture] = useState<Scripture | null>(
    scriptures.length > 0 ? scriptures[0] : null
  );

  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 sm:p-8">
          <aside className="lg:col-span-1 xl:col-span-1 flex flex-col gap-8">
            <EraSlider selectedEra={selectedEra} onEraChange={setSelectedEra} />
            <ScrollArea className="flex-1 bg-card/50 border border-border rounded-lg p-2 max-h-[60vh] lg:max-h-none">
              <ScriptureTree 
                scriptures={scriptures} 
                onSelectScripture={setSelectedScripture} 
                selectedScriptureId={selectedScripture?.id ?? null}
              />
            </ScrollArea>
          </aside>
          
          <section className="lg:col-span-2 xl:col-span-3">
             <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                <ScriptureDetails 
                    key={selectedScripture?.id} 
                    scripture={selectedScripture} 
                    era={selectedEra} 
                />
             </ScrollArea>
          </section>
        </main>
      </div>
    </div>
  );
}
