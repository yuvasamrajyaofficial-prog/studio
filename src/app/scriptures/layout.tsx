'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { ResizableHandle } from '@/components/ui/resizable-handle';
import { EraSlider } from '@/components/era-slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScriptureTree } from '@/components/scripture-tree';
import { ScriptureHierarchy } from '@/components/scripture-hierarchy';
import { scriptures } from '@/lib/scriptures';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ScriptureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedEra, setSelectedEra] = useState('Kali');
  const pathname = usePathname();

  // Filter scriptures based on selected Era
  const filteredScriptures = scriptures;

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
        <PanelGroup direction="horizontal" className="flex-1">
          {/* Sidebar Panel */}
          <Panel 
            defaultSize={25} 
            minSize={20} 
            maxSize={40}
            className="p-6 flex flex-col gap-6 bg-card/10 backdrop-blur-sm border-r border-white/5"
          >
            <EraSlider selectedEra={selectedEra} onEraChange={setSelectedEra} />

            <Tabs defaultValue="library" className="flex-1 flex flex-col min-h-0">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl">
                <TabsTrigger value="library" className="rounded-lg data-[state=active]:bg-white/10">Cosmic Library</TabsTrigger>
                <TabsTrigger value="hierarchy" className="rounded-lg data-[state=active]:bg-white/10">Hierarchy</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto mt-4 border border-white/10 rounded-2xl bg-black/20 p-2 scrollbar-hide">
                <TabsContent value="library" className="mt-0 h-full">
                  <ScriptureTree scriptures={filteredScriptures} />
                </TabsContent>
                <TabsContent value="hierarchy" className="mt-0 h-full">
                  <ScriptureHierarchy />
                </TabsContent>
              </div>
            </Tabs>
          </Panel>

          <ResizableHandle withHandle />

          {/* Main Content Panel */}
          <Panel defaultSize={75} className="relative">
            <div className="absolute inset-0 bg-[#050505] overflow-y-auto">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-900/10 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-full w-full"
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}
