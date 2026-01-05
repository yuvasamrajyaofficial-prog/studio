import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query,
  orderBy,
  where
} from 'firebase/firestore';
import { BlogPost } from '@/lib/admin/blog-actions';

export async function getBlogs() {
  const q = query(
    collection(db, 'blogs'), 
    where('published', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export async function getBlogBySlug(slug: string) {
  // Try to find by slug field first
  const q = query(collection(db, 'blogs'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
  }

  // Fallback: try to find by ID (if slug matches ID)
  const docRef = doc(db, 'blogs', slug);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as BlogPost;
  }
  
  return null;
}
