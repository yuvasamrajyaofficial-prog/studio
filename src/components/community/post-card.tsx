"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Share2, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types/community";
import { likePost } from "@/lib/community/actions";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false); // TODO: check initial state
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like posts");
      return;
    }
    
    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : prev - 1);

    try {
      // Note: server action currently toggles up only in our simple implementation
      // for a real app we'd need robust toggle logic in the action
      const result = await likePost(post.id!, user.uid);
      if (!result.success) {
          // Revert if failed (or if already liked and action rejected duplicate)
           setIsLiked(!newLikedState);
           setLikes(prev => newLikedState ? prev - 1 : prev + 1);
      }
    } catch (error) {
      // Revert on error
      setIsLiked(!newLikedState);
       setLikes(prev => newLikedState ? prev - 1 : prev + 1);
      toast.error("Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={post.authorPhoto} />
          <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-sm">{post.authorName}</h4>
              <p className="text-xs text-muted-foreground">
                {post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-6 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("gap-2 px-0 hover:bg-transparent", isLiked && "text-red-500")}
              onClick={handleLike}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              <span className="text-xs">{likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-2 px-0 hover:bg-transparent">
              <MessageSquare className="w-4 h-4" />
              <span className="text-xs">{post.commentsCount || 0}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-2 px-0 hover:bg-transparent ml-auto">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
