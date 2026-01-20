"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userImage?: string;
  createdAt: any;
}

interface CommentsSectionProps {
  contentId: string; // ID of the scripture or blog post
  contentType: "scripture" | "blog";
}

export function CommentsSection({ contentId, contentType }: CommentsSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contentId) return;

    const q = query(
      collection(db, "comments"),
      where("contentId", "==", contentId),
      where("contentType", "==", contentType),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [contentId, contentType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        text: newComment.trim(),
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        userImage: user.photoURL,
        contentId,
        contentType,
        createdAt: serverTimestamp(),
      });
      setNewComment("");
      toast.success("Comment posted!");
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-8 border-t border-border/50">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold font-headline">Community Discussion</h3>
        <span className="text-sm text-muted-foreground ml-2">({comments.length})</span>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.photoURL || undefined} />
            <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="min-h-[80px] bg-card/50"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={loading || !newComment.trim()} size="sm">
                {loading ? "Posting..." : <><Send className="w-4 h-4 mr-2" /> Post Comment</>}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-muted-foreground mb-2">Please log in to join the discussion.</p>
          <Button variant="outline" asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-card/30 border border-border/30">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.userImage} />
              <AvatarFallback>{comment.userName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">
                  {comment.createdAt?.toDate ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : "Just now"}
                </span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{comment.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-8 italic">No comments yet. Be the first to share your wisdom!</p>
        )}
      </div>
    </div>
  );
}
