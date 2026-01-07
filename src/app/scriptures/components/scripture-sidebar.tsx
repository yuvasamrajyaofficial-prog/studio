'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ScriptureSidebarProps {
  className?: string;
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedEra: string;
  onSelectEra: (era: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  onScriptureSelect?: (scriptureName: string) => void; // New prop for direct selection
}

const ERAS = ['Satya', 'Treta', 'Dvapara', 'Kali'];

const CATEGORIES = [
  {
    name: 'Darshanas (Philosophy)',
    items: ['Nyaya', 'Vaisheshika', 'Samkhya', 'Yoga', 'Mimamsa', 'Vedanta']
  },
  {
    name: 'Agamas & Tantras',
    items: ['Shaiva Agamas', 'Vaishnava Agamas', 'Shakta Tantras']
  },
  {
    name: 'Niti, Artha & Psychology',
    items: ['Chanakya Niti', 'Vidura Niti', 'Arthashastra', 'Kama Sutra']
  },
  {
    name: 'Bhakti Texts',
    items: ['Narada Bhakti Sutra', 'Bhagavad Gita', 'Ramcharitmanas']
  },
  {
    name: 'Yoga & Sadhana',
    items: ['Patanjali Yoga Sutras', 'Hatha Yoga Pradipika', 'Gheranda Samhita']
  },
  {
    name: 'Acharya Bhashyas (Commentaries)',
    items: ['Shankara Bhashya', 'Ramanuja Bhashya', 'Madhva Bhashya']
  },
  {
    name: 'Advanced Vedanta',
    items: ['Brahma Sutras', 'Yoga Vasistha', 'Ashtavakra Gita']
  }
];

export function ScriptureSidebar({ 
  className, 
  selectedCategory, 
  onSelectCategory,
  selectedEra,
  onSelectEra,
  onClose,
  onScriptureSelect
}: ScriptureSidebarProps) {

  const handleEraChange = (value: number[]) => {
    const eraIndex = value[0];
    if (eraIndex >= 0 && eraIndex < ERAS.length) {
      onSelectEra(ERAS[eraIndex]);
    }
  };

  const currentEraIndex = ERAS.indexOf(selectedEra) !== -1 ? ERAS.indexOf(selectedEra) : 3; // Default to Kali

  const handleItemClick = (item: string) => {
    onSelectCategory(item === selectedCategory ? null : item);
    if (onScriptureSelect) {
      onScriptureSelect(item);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-[#0a0118] border-r border-white/5", className)}>
      
      {/* Header / Logo Area */}
      <div className="p-6 flex items-center justify-between border-b border-white/5">
         <div className="flex items-center gap-3">
           {/* Simple Logo Placeholder */}
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 animate-pulse" />
           <span className="font-serif text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 tracking-wide">
             MALOLA
           </span>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 px-6 py-6">
        <div className="space-y-8">
          
          {/* Era Slider - Simple Design */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400 font-medium">Select Era</span>
              <span className="text-sm font-bold text-amber-400">{selectedEra} Yuga</span>
            </div>
            <Slider
              defaultValue={[3]}
              value={[currentEraIndex]}
              max={3}
              step={1}
              onValueChange={handleEraChange}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-widest">
              <span>Satya</span>
              <span>Treta</span>
              <span>Dvapara</span>
              <span>Kali</span>
            </div>
          </div>

          {/* Standard Tabs */}
          <Tabs defaultValue="library" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-white/5 border border-white/10">
              <TabsTrigger value="library" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Cosmic Library</TabsTrigger>
              <TabsTrigger value="hierarchy" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Hierarchy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="library" className="mt-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  placeholder="Search scriptures..." 
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 h-10"
                />
              </div>

              {/* Accordion Menu */}
              <Accordion type="single" collapsible className="w-full space-y-1">
                {CATEGORIES.map((category) => (
                  <AccordionItem key={category.name} value={category.name} className="border-none">
                    <AccordionTrigger className="px-3 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white data-[state=open]:text-amber-400 transition-all text-sm font-medium">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 pb-2 px-3">
                      <div className="flex flex-col space-y-1 ml-2 border-l border-white/10 pl-3">
                        {category.items.map((item) => (
                          <Button
                            key={item}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "justify-start h-8 font-normal text-gray-500 hover:text-white hover:bg-transparent pl-2 border-l-2 border-transparent hover:border-purple-500 transition-all text-sm",
                              selectedCategory === item ? "text-amber-400 border-amber-400 bg-white/5" : ""
                            )}
                            onClick={() => handleItemClick(item)}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            
            <TabsContent value="hierarchy">
              <div className="p-8 text-center">
                <p className="text-gray-500 text-sm">Hierarchy view coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </ScrollArea>
      
      {/* Footer / Reset */}
      <div className="p-6 border-t border-white/5">
        <Button 
          variant="outline" 
          className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
          onClick={() => {
            onSelectCategory(null);
            onSelectEra('Kali');
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
