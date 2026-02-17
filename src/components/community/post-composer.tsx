"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/community/actions";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { Loader2, Tag, Send } from "lucide-react";

export function PostComposer() {
  const { user, userProfile } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("General");

  const topics = ["General", "Scriptures", "Meditation", "Life Advice", "Philosophy"];

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to post");
      return;
    }
    
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await createPost(
        user.uid,
        { 
          name: userProfile?.displayName || user.displayName || "Anonymous",
          photo: userProfile?.photoURL || user.photoURL || undefined
        },
        content,
        [selectedTopic]
      );
      
      setContent("");
      toast.success("Post created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 mb-6 bg-card/50 border-border/50">
      <div className="space-y-4">
        <Textarea
          placeholder="Share your spiritual journey..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] bg-background/50 resize-none border-none focus-visible:ring-0"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {topics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  selectedTopic === topic 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !content.trim()}
            size="sm"
            className="gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
}
