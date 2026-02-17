"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { BlogPost } from "@/lib/admin/blog-actions";
import { X } from "lucide-react";

interface BlogFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function BlogForm({ initialData, onSubmit, onCancel, isSubmitting = false }: BlogFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Partial<BlogPost>>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      coverImage: "",
      tags: [],
      published: false,
      ...initialData,
    },
  });

  const [tagInput, setTagInput] = useState("");
  const currentTags = watch("tags") || [];

  const handleAddTag = () => {
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  const onFormSubmit = async (data: Partial<BlogPost>) => {
    try {
      await onSubmit(data);
      toast.success("Blog post saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save blog post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{initialData?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
        <Button variant="ghost" size="sm" onClick={onCancel} type="button">
          Cancel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            {...register("title", { required: "Title is required" })} 
            placeholder="e.g. The Art of Meditation"
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL-friendly)</Label>
          <Input 
            id="slug" 
            {...register("slug", { required: "Slug is required" })} 
            placeholder="e.g. art-of-meditation"
          />
           {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input 
            id="author" 
            {...register("author", { required: "Author is required" })} 
            placeholder="e.g. John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input 
            id="coverImage" 
            {...register("coverImage")} 
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea 
          id="excerpt" 
          {...register("excerpt", { required: "Excerpt is required" })} 
          placeholder="Brief summary..."
          className="h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown supported)</Label>
        <Textarea 
          id="content" 
          {...register("content", { required: "Content is required" })} 
          placeholder="Write your blog post here..."
          className="h-96 font-mono"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {currentTags.map(tag => (
            <div key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
              {tag}
              <button onClick={() => removeTag(tag)} type="button" className="hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
             </div>
          ))}
        </div>
        <div className="flex gap-2">
            <Input 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                    }
                }}
            />
            <Button type="button" onClick={handleAddTag} variant="secondary">Add</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 border rounded-lg bg-muted/20">
        <Switch 
          id="published" 
          onCheckedChange={(checked) => setValue("published", checked)}
          defaultChecked={initialData?.published}
        />
        <Label htmlFor="published" className="font-medium cursor-pointer">Publish immediately?</Label>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Saving..." : "Save Blog Post"}
        </Button>
        <Button variant="outline" onClick={onCancel} type="button" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
