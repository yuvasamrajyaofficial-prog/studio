"use client";

import Image from 'next/image';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { SudharshanaChakraIcon } from "./icons/sudharshana-chakra";
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface EraSliderProps {
  selectedEra: string;
  onEraChange: (era: string) => void;
}

const eras = ["Satya", "Treta", "Dvapara", "Kali"];

export function EraSlider({ selectedEra, onEraChange }: EraSliderProps) {
  const selectedIndex = eras.indexOf(selectedEra);

  const handleValueChange = (value: number[]) => {
    onEraChange(eras[value[0]]);
  };
  
  const shankhaImage = PlaceHolderImages.find(img => img.id === 'shankha');
  const padmaImage = PlaceHolderImages.find(img => img.id === 'padma');

  return (
    <div className="p-4 rounded-lg bg-card/50 border border-border">
      <div className="flex justify-around items-center mb-4">
        {shankhaImage && (
            <Image 
                src={shankhaImage.imageUrl}
                alt={shankhaImage.description}
                width={64}
                height={64}
                data-ai-hint={shankhaImage.imageHint}
                className="w-16 h-16 object-contain"
            />
        )}
        <SudharshanaChakraIcon className="w-16 h-16 animate-spin-slow" />
        {padmaImage && (
            <Image 
                src={padmaImage.imageUrl}
                alt={padmaImage.description}
                width={64}
                height={64}
                data-ai-hint={padmaImage.imageHint}
                className="w-16 h-16 object-contain"
            />
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <Label htmlFor="era-slider" className="text-lg font-headline text-accent">
          Select Era
        </Label>
        <span className="font-bold text-foreground text-lg">{selectedEra} Yuga</span>
      </div>
      <Slider
        id="era-slider"
        min={0}
        max={eras.length - 1}
        step={1}
        value={[selectedIndex]}
        onValueChange={handleValueChange}
        aria-label={`Selected Era: ${selectedEra}`}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {eras.map((era) => (
          <span key={era}>{era}</span>
        ))}
      </div>
    </div>
  );
}
