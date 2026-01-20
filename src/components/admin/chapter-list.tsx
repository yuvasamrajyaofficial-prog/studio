"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Chapter } from "@/types/schema";

interface ChapterListProps {
  chapters: Chapter[];
  onAddChapter: (data: Partial<Chapter>) => Promise<void>;
  onDeleteChapter: (id: string) => Promise<void>;
  onSelectChapter: (chapter: Chapter) => void;
  selectedChapterId?: string;
}

export function ChapterList({ 
  chapters, 
  onAddChapter, 
  onDeleteChapter, 
  onSelectChapter,
  selectedChapterId 
}: ChapterListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Chapters</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Chapter</DialogTitle>
            </DialogHeader>
            <ChapterForm 
              onSubmit={async (data) => {
                await onAddChapter(data);
                setIsDialogOpen(false);
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg divide-y">
        {chapters.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No chapters added yet.
          </div>
        ) : (
          chapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer ${selectedChapterId === chapter.id ? 'bg-muted' : ''}`}
              onClick={() => onSelectChapter(chapter)}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground w-8">
                  #{chapter.number}
                </span>
                <div>
                  <p className="font-medium">{chapter.title.en}</p>
                  <p className="text-xs text-muted-foreground">{chapter.title.sa}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChapter(chapter.id!);
                  }}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ChapterForm({ onSubmit }: { onSubmit: (data: Partial<Chapter>) => Promise<void> }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Partial<Chapter>>();

  const onFormSubmit = async (data: Partial<Chapter>) => {
    try {
      await onSubmit(data);
      toast.success("Chapter added");
    } catch (error) {
      toast.error("Failed to add chapter");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Chapter Number</Label>
          <Input type="number" {...register("number", { required: true, valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input {...register("slug", { required: true })} placeholder="chapter-1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Title (English)</Label>
        <Input {...register("title.en", { required: true })} />
      </div>

      <div className="space-y-2">
        <Label>Title (Sanskrit)</Label>
        <Input {...register("title.sa", { required: true })} />
      </div>

      <div className="space-y-2">
        <Label>Summary (Optional)</Label>
        <Textarea {...register("summary.en")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Adding..." : "Add Chapter"}
      </Button>
    </form>
  );
}
