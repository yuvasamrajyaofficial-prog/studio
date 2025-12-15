"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface VerseDraft {
  id: string;
  number: number;
  originalText: string;
  translation: string;
  meaning: string;
}

export function ChapterEditor() {
  const [chapterTitle, setChapterTitle] = useState("");
  const [verses, setVerses] = useState<VerseDraft[]>([
    { id: "1", number: 1, originalText: "", translation: "", meaning: "" }
  ]);

  const addVerse = () => {
    const newVerse = {
      id: Date.now().toString(),
      number: verses.length + 1,
      originalText: "",
      translation: "",
      meaning: ""
    };
    setVerses([...verses, newVerse]);
  };

  const updateVerse = (id: string, field: keyof VerseDraft, value: string) => {
    setVerses(verses.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVerse = (id: string) => {
    setVerses(verses.filter(v => v.id !== id));
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Chapter Content</CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Save className="h-4 w-4" /> Save Draft
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Chapter Title</Label>
          <Input 
            placeholder="e.g. Arjuna Vishada Yoga" 
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Verses</Label>
            <Button onClick={addVerse} size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Verse
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {verses.map((verse, index) => (
              <AccordionItem key={verse.id} value={verse.id} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <span className="font-medium">Verse {verse.number}</span>
                    <span className="text-sm text-muted-foreground truncate max-w-xs font-normal">
                      {verse.originalText || "(Empty verse)"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Original Text (Sanskrit/Source)</Label>
                    <Textarea 
                      placeholder="Enter original text..." 
                      className="font-serif text-lg"
                      value={verse.originalText}
                      onChange={(e) => updateVerse(verse.id, "originalText", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>English Translation</Label>
                    <Textarea 
                      placeholder="Enter translation..." 
                      value={verse.translation}
                      onChange={(e) => updateVerse(verse.id, "translation", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Purport / Meaning</Label>
                    <Textarea 
                      placeholder="Enter detailed meaning..." 
                      className="min-h-[100px]"
                      value={verse.meaning}
                      onChange={(e) => updateVerse(verse.id, "meaning", e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeVerse(verse.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" /> Remove Verse
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
