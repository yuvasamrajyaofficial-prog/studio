"use server";

import { db } from "@/lib/firebase/config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  doc,
  updateDoc,
  deleteDoc,
  increment,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { Post, Comment } from "@/types/community";
import { revalidatePath } from "next/cache";

// --- Posts ---

export async function createPost(userId: string, userData: { name: string, photo?: string }, content: string, tags: string[]) {
  try {
    const postsRef = collection(db, "posts");
    const newPost: Partial<Post> = {
      authorId: userId,
      authorName: userData.name,
      authorPhoto: userData.photo,
      content,
      tags,
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    await addDoc(postsRef, newPost);
    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
}

export async function getPosts(max: number = 20, tag?: string) {
  try {
    const postsRef = collection(db, "posts");
    let q = query(postsRef, orderBy("createdAt", "desc"), limit(max));
    
    if (tag && tag !== "All") {
      q = query(postsRef, where("tags", "array-contains", tag), orderBy("createdAt", "desc"), limit(max));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// --- Likes (Full Toggle Logic) ---

export async function likePost(postId: string, userId: string) {
  try {
    const likeRef = doc(db, "users", userId, "likes", postId);
    const likeSnap = await getDoc(likeRef);
    
    if (likeSnap.exists()) {
      // Unlike post
      await deleteDoc(likeRef);
      await updateDoc(doc(db, "posts", postId), {
        likesCount: increment(-1)
      });
      revalidatePath("/community");
      return { success: true, liked: false }; 
    }
    
    // Like post
    await setDoc(likeRef, {
      postId,
      userId,
      createdAt: serverTimestamp()
    });
    
    await updateDoc(doc(db, "posts", postId), {
      likesCount: increment(1)
    });
    
    revalidatePath("/community");
    return { success: true, liked: true };
  } catch (error) {
    console.error("Error toggling like on post:", error);
    throw new Error("Failed to toggle like on post");
  }
}

export async function hasUserLiked(postId: string, userId: string) {
  if (!userId) return false;
  try {
    const likeRef = doc(db, "users", userId, "likes", postId);
    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
}

// --- Moderation Reporting ---

export async function reportPost(
  postId: string, 
  userId: string, 
  reason: string, 
  content: string, 
  authorName: string
) {
  try {
    const reportsRef = collection(db, "reports");
    await addDoc(reportsRef, {
      targetType: "post",
      targetId: postId,
      postId,
      content: content.substring(0, 150),
      authorName,
      reportedBy: userId,
      reason,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error reporting post:", error);
    throw new Error("Failed to submit report");
  }
}

// --- Comments ---

export async function createComment(postId: string, userId: string, userData: { name: string, photo?: string }, content: string) {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const newComment: Partial<Comment> = {
      postId,
      authorId: userId,
      authorName: userData.name,
      authorPhoto: userData.photo,
      content,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    };
    
    await addDoc(commentsRef, newComment);
    
    // Increment comment count
    await updateDoc(doc(db, "posts", postId), {
      commentsCount: increment(1)
    });
    
    revalidatePath("/community");
    return { success: true };
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
}

export async function getComments(postId: string) {
  try {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}
