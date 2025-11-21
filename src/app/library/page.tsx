"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { EraSlider } from "@/components/era-slider";
import { ScriptureTree } from "@/components/scripture-tree";
import { ScriptureHierarchy } from "@/components/scripture-hierarchy";
import { scriptures, type Scripture, type Yuga } from "@/lib/scriptures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function LibraryPage() {
  const [selectedEra, setSelectedEra] = useState<Yuga>("Kali");

  const filteredScriptures = scriptures.filter(
    (s) => s.yuga === selectedEra || s.yuga === "Timeless"
  );

  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto p-4 sm:p-8">
            <div className="mb-4">
                <Button asChild variant="outline">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 space-y-8">
              <EraSlider selectedEra={selectedEra} onEraChange={setSelectedEra} />
              <Tabs defaultValue="library" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="library">Cosmic Library</TabsTrigger>
                  <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
                </TabsList>
                <TabsContent value="library">
                  <ScrollArea className="h-[500px] pr-4">
                    <ScriptureTree scriptures={filteredScriptures} />
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="hierarchy">
                   <ScrollArea className="h-[500px] pr-4">
                      <ScriptureHierarchy />
                   </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
            <div className="md:col-span-3">
              {/* The content for the selected scripture will be shown on a different page */}
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-foreground/60 rounded-lg bg-card/30 border border-border">
                <p>Select a scripture from the library to begin your journey.</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
