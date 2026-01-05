'use client';

import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface FilterState {
  search: string;
  traditions: string[];
  languages: string[];
  era: string;
}

interface ScriptureFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
}

const TRADITIONS = ['Hinduism', 'Buddhism', 'Jainism', 'Sikhism', 'Taoism'];
const LANGUAGES = ['Sanskrit', 'Pali', 'Tamil', 'Hindi', 'English', 'Tibetan'];
const ERAS = ['All', 'Vedic', 'Upanishadic', 'Puranic', 'Modern'];

export function ScriptureFilters({ filters, setFilters, className }: ScriptureFiltersProps) {
  
  const handleTraditionChange = (tradition: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      traditions: checked 
        ? [...prev.traditions, tradition]
        : prev.traditions.filter(t => t !== tradition)
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      languages: checked
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }));
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Search</Label>
        <Input 
          placeholder="Search titles..." 
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-amber-500/50"
        />
      </div>

      {/* Traditions */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tradition</Label>
        <div className="space-y-2">
          {TRADITIONS.map((tradition) => (
            <div key={tradition} className="flex items-center space-x-2">
              <Checkbox 
                id={`tradition-${tradition}`} 
                checked={filters.traditions.includes(tradition)}
                onCheckedChange={(checked) => handleTraditionChange(tradition, checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <label
                htmlFor={`tradition-${tradition}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300 hover:text-white cursor-pointer"
              >
                {tradition}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Language</Label>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox 
                id={`lang-${language}`} 
                checked={filters.languages.includes(language)}
                onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
              />
              <label
                htmlFor={`lang-${language}`}
                className="text-sm font-medium leading-none text-gray-300 hover:text-white cursor-pointer"
              >
                {language}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Era */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Era</Label>
        <RadioGroup 
          value={filters.era} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, era: value }))}
        >
          {ERAS.map((era) => (
            <div key={era} className="flex items-center space-x-2">
              <RadioGroupItem value={era} id={`era-${era}`} className="border-white/20 text-amber-500" />
              <Label htmlFor={`era-${era}`} className="text-gray-300 cursor-pointer">{era}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Reset Button */}
      <Button 
        variant="outline" 
        className="w-full border-white/10 hover:bg-white/10 text-gray-400 hover:text-white"
        onClick={() => setFilters({ search: '', traditions: [], languages: [], era: 'All' })}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block w-72 shrink-0 pr-8 border-r border-white/5", className)}>
        <div className="sticky top-24">
          <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mb-6">
            Library Filters
          </h2>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full border-white/10 bg-[#0f0518]/80 text-amber-400 hover:bg-white/10 hover:text-amber-300">
              <Filter className="w-4 h-4 mr-2" />
              Filters & Search
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-[#0f0518] border-white/10 text-white p-0">
            <SheetHeader className="p-6 border-b border-white/10 text-left">
              <SheetTitle className="text-xl font-serif font-bold text-amber-400">Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] p-6">
              <FilterContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
