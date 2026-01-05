import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: any;
  updatedAt: any;
}

export async function getAllBlogs() {
  const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export async function getBlogById(id: string) {
  const docRef = doc(db, 'blogs', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as BlogPost;
  }
  return null;
}

export async function createBlog(data: Partial<BlogPost>) {
  // Use slug as ID if available, else auto-gen
  const id = data.slug || doc(collection(db, 'blogs')).id;
  const docRef = doc(db, 'blogs', id);
  
  await setDoc(docRef, {
    ...data,
    id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}

export async function updateBlog(id: string, data: Partial<BlogPost>) {
  const docRef = doc(db, 'blogs', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlog(id: string) {
  await deleteDoc(doc(db, 'blogs', id));
}
