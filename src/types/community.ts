import { Timestamp } from 'firebase/firestore';

export interface Post {
  id?: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Comment {
  id?: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Like {
  id?: string; // usually userId
  postId: string;
  userId: string;
  createdAt: Timestamp;
}
