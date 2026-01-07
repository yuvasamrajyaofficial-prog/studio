'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
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
  const [activeTab, setActiveTab] = useState('library');
  const pathname = usePathname();

  // Filter scriptures based on selected Era
  const filteredScriptures = scriptures;

  const isMainPage = pathname === '/scriptures';

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <main className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden relative">
        {/* Sidebar with independent sliding */}
        <motion.aside 
          initial={{ x: -320, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            display: !isMainPage ? 'none' : 'flex' // Hide on mobile if not main page
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full lg:w-80 p-6 flex flex-col gap-6 bg-card/10 backdrop-blur-sm border-r border-white/5 shrink-0 z-20",
            !isMainPage && "hidden lg:flex" // Desktop always shows, mobile only on main page
          )}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <EraSlider selectedEra={selectedEra} onEraChange={setSelectedEra} />
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl">
              <TabsTrigger value="library" className="rounded-lg data-[state=active]:bg-white/10">
                Cosmic Library
              </TabsTrigger>
              <TabsTrigger value="hierarchy" className="rounded-lg data-[state=active]:bg-white/10">
                Hierarchy
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-hidden mt-4 border border-white/10 rounded-2xl bg-black/20 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 overflow-y-auto p-2 scrollbar-hide"
                >
                  {activeTab === 'library' ? (
                    <ScriptureTree scriptures={filteredScriptures} />
                  ) : (
                    <ScriptureHierarchy />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.aside>

        {/* Main Content with independent sliding */}
        <div className={cn(
          "flex-1 relative bg-[#050505] overflow-hidden",
          isMainPage && "hidden lg:block" // Hide grid on mobile main page to show only list
        )}>
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-900/10 pointer-events-none" />
          
          <div className="absolute inset-0 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-full w-full relative"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
