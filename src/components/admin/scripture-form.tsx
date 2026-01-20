"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { orderedCategories } from "@/lib/scriptures";
import type { Scripture, ScriptureCategory, Yuga } from "@/types/schema";

interface ScriptureFormProps {
  initialData?: Partial<Scripture>;
  onSubmit: (data: Partial<Scripture>) => Promise<void>;
  isSubmitting?: boolean;
}

export function ScriptureForm({ initialData, onSubmit, isSubmitting = false }: ScriptureFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Partial<Scripture>>({
    defaultValues: {
      title: { en: "", sa: "" },
      description: { en: "" },
      isPublished: false,
      tags: [],
      ...initialData,
    },
  });

  const category = watch("category");
  const yuga = watch("yuga");

  const onFormSubmit = async (data: Partial<Scripture>) => {
    try {
      await onSubmit(data);
      toast.success("Scripture saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save scripture");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title-en">Title (English)</Label>
          <Input 
            id="title-en" 
            {...register("title.en", { required: "English title is required" })} 
            placeholder="e.g. Bhagavad Gita"
          />
          {errors.title?.en && <p className="text-sm text-destructive">{errors.title.en.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title-sa">Title (Sanskrit)</Label>
          <Input 
            id="title-sa" 
            {...register("title.sa", { required: "Sanskrit title is required" })} 
            placeholder="e.g. भगवद्गीता"
          />
          {errors.title?.sa && <p className="text-sm text-destructive">{errors.title.sa.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL-friendly ID)</Label>
          <Input 
            id="slug" 
            {...register("slug", { required: "Slug is required" })} 
            placeholder="e.g. bhagavad-gita"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author / Rishi</Label>
          <Input 
            id="author" 
            {...register("author")} 
            placeholder="e.g. Vyasa"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            onValueChange={(val) => setValue("category", val as ScriptureCategory)} 
            defaultValue={initialData?.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {orderedCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Yuga (Era)</Label>
          <Select 
            onValueChange={(val) => setValue("yuga", val as Yuga)} 
            defaultValue={initialData?.yuga}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Yuga" />
            </SelectTrigger>
            <SelectContent>
              {['Satya', 'Treta', 'Dvapara', 'Kali', 'Timeless'].map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (English)</Label>
        <Textarea 
          id="description" 
          {...register("description.en", { required: "Description is required" })} 
          placeholder="Brief summary of the scripture..."
          className="h-32"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input 
          id="coverImage" 
          {...register("coverImage")} 
          placeholder="https://..."
        />
        <p className="text-xs text-muted-foreground">Paste a direct image link for now.</p>
      </div>

      <div className="flex items-center gap-2">
        <Switch 
          id="isPublished" 
          onCheckedChange={(checked) => setValue("isPublished", checked)}
          defaultChecked={initialData?.isPublished}
        />
        <Label htmlFor="isPublished">Publish immediately?</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Save Scripture"}
      </Button>
    </form>
  );
}
