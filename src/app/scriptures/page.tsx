"use client";

import { useState } from "react";
import { EraSlider } from "@/components/era-slider";
import { ScriptureHierarchy } from "@/components/scripture-hierarchy";
import { ScriptureTree } from "@/components/scripture-tree";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scriptures } from "@/lib/scriptures";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";

export default function ScriptureLibraryPage() {
  const [selectedEra, setSelectedEra] = useState("Kali");

  // Filter scriptures based on selected Era (mock logic for now)
  // In a real app, we would filter `scriptures` by `yuga`
  const filteredScriptures = scriptures; 

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
            <div className="flex items-center gap-2 px-2">
              <SudharshanaChakraIcon className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg">Back to Home</span>
            </div>

            <EraSlider selectedEra={selectedEra} onEraChange={setSelectedEra} />

            <Tabs defaultValue="library" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="library">Cosmic Library</TabsTrigger>
                <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto mt-2 border rounded-lg bg-card/30 p-2">
                <TabsContent value="library" className="mt-0 h-full">
                  <ScriptureTree scriptures={filteredScriptures} />
                </TabsContent>
                <TabsContent value="hierarchy" className="mt-0 h-full">
                  <ScriptureHierarchy />
                </TabsContent>
              </div>
            </Tabs>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 rounded-xl border border-border/50 bg-card/20 relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
            {/* Background decorative elements could go here */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            
            <div className="max-w-md space-y-4 z-10">
              <p className="text-muted-foreground text-lg">
                Select a scripture from the library to begin your journey.
              </p>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
