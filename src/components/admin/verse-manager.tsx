"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2, Plus, GripVertical } from "lucide-react";
import type { Verse } from "@/types/schema";

interface VerseManagerProps {
  verses: Verse[];
  onAddVerse: (data: Partial<Verse>) => Promise<void>;
  onDeleteVerse: (id: string) => Promise<void>;
}

export function VerseManager({ verses, onAddVerse, onDeleteVerse }: VerseManagerProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Verses ({verses.length})</h3>
        <Button size="sm" onClick={() => setIsAdding(!isAdding)} variant={isAdding ? "secondary" : "default"}>
          {isAdding ? "Cancel" : "Add Verse"}
        </Button>
      </div>

      {isAdding && (
        <div className="p-4 border rounded-lg bg-muted/30 mb-6">
          <VerseForm 
            onSubmit={async (data) => {
              await onAddVerse(data);
              setIsAdding(false);
            }} 
          />
        </div>
      )}

      <div className="space-y-4">
        {verses.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
            No verses added to this chapter yet.
          </div>
        ) : (
          verses.sort((a, b) => a.number - b.number).map((verse) => (
            <div key={verse.id} className="group relative p-4 border rounded-lg bg-card hover:border-primary/50 transition-colors">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => onDeleteVerse(verse.id!)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  {verse.number}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="font-serif text-lg leading-relaxed">{verse.content.sa}</p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">{verse.transliteration}</p>
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-foreground">{verse.content.en}</p>
                  </div>
                  {verse.meaning?.en && (
                    <div className="bg-muted/30 p-3 rounded text-sm text-muted-foreground">
                      <span className="font-semibold text-xs uppercase tracking-wider block mb-1">Meaning</span>
                      {verse.meaning.en}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function VerseForm({ onSubmit }: { onSubmit: (data: Partial<Verse>) => Promise<void> }) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Partial<Verse>>();

  const onFormSubmit = async (data: Partial<Verse>) => {
    try {
      await onSubmit(data);
      toast.success("Verse added");
      reset();
    } catch (error) {
      toast.error("Failed to add verse");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Verse Number</Label>
          <Input type="number" {...register("number", { required: true, valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label>Audio URL (Optional)</Label>
          <Input {...register("audioUrl")} placeholder="https://..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Sanskrit Text</Label>
        <Textarea 
          {...register("content.sa", { required: true })} 
          className="font-serif text-lg" 
          placeholder="धर्मक्षेत्रे कुरुक्षेत्रे..."
        />
      </div>

      <div className="space-y-2">
        <Label>Transliteration (IAST)</Label>
        <Textarea 
          {...register("transliteration")} 
          className="font-mono text-sm"
          placeholder="dharmakṣetre kurukṣetre..."
        />
      </div>

      <div className="space-y-2">
        <Label>English Translation</Label>
        <Textarea 
          {...register("content.en", { required: true })} 
          placeholder="O Sanjaya, after my sons..."
        />
      </div>

      <div className="space-y-2">
        <Label>Detailed Meaning / Purport (Optional)</Label>
        <Textarea 
          {...register("meaning.en")} 
          className="h-24"
          placeholder="Explanation of the verse..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Adding..." : "Add Verse"}
      </Button>
    </form>
  );
}
