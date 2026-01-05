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
  onClose
}: ScriptureSidebarProps) {

  const handleEraChange = (value: number[]) => {
    const eraIndex = value[0];
    if (eraIndex >= 0 && eraIndex < ERAS.length) {
      onSelectEra(ERAS[eraIndex]);
    }
  };

  const currentEraIndex = ERAS.indexOf(selectedEra) !== -1 ? ERAS.indexOf(selectedEra) : 3; // Default to Kali
  const [activeTab, setActiveTab] = React.useState<'library' | 'hierarchy'>('library');

  return (
    <div className={cn("flex flex-col h-full bg-[#0a0118] border-r border-white/5", className)}>
      
      {/* Header / Logo Area */}
      <div className="p-6 flex items-center justify-between">
         {/* Logo Placeholder */}
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-purple-600 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
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

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="space-y-8">
          
          {/* Era Slider Card */}
          <div className="p-5 rounded-2xl bg-[#1a0b2e] border border-white/5 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-pink-300/80 font-medium tracking-wide">Select Era</span>
                <span className="text-sm font-bold text-white">{selectedEra} Yuga</span>
              </div>
              
              <Slider
                defaultValue={[3]}
                value={[currentEraIndex]}
                max={3}
                step={1}
                onValueChange={handleEraChange}
                className="py-2 mb-4"
              />
              
              <div className="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                <span className={cn(selectedEra === 'Satya' ? 'text-amber-400' : '')}>Satya</span>
                <span className={cn(selectedEra === 'Treta' ? 'text-amber-400' : '')}>Treta</span>
                <span className={cn(selectedEra === 'Dvapara' ? 'text-amber-400' : '')}>Dvapara</span>
                <span className={cn(selectedEra === 'Kali' ? 'text-amber-400' : '')}>Kali</span>
              </div>
            </div>
          </div>

          {/* Custom Tabs */}
          <div className="bg-[#1a0b2e] p-1 rounded-xl flex border border-white/5">
            <button
              onClick={() => setActiveTab('library')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                activeTab === 'library' 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              Cosmic Library
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                activeTab === 'hierarchy' 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              Hierarchy
            </button>
          </div>
            
          {activeTab === 'library' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <Input 
                  placeholder="Search scriptures..." 
                  className="pl-10 bg-[#1a0b2e] border-white/5 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 h-10 rounded-xl transition-all"
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
                            onClick={() => onSelectCategory(item === selectedCategory ? null : item)}
                          >
                            {item}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="p-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <div className="w-6 h-6 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin" />
              </div>
              <p className="text-gray-500 text-sm">Loading Hierarchy...</p>
            </div>
          )}

        </div>
      </ScrollArea>
      
      {/* Footer / Reset */}
      <div className="p-6 border-t border-white/5 bg-[#0a0118]/50 backdrop-blur-sm">
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
