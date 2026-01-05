import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  query,
  orderBy
} from 'firebase/firestore';
import { Scripture, Chapter, Verse } from '@/types/scripture';

export async function getScriptures() {
  const q = query(collection(db, 'scriptures'), orderBy('title.en'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Scripture));
}

export async function getScriptureBySlug(slug: string) {
  // Assuming slug is the ID for now, or we query by slug field
  // In our createScripture, we used slug as ID if provided.
  const docRef = doc(db, 'scriptures', slug);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Scripture;
  }
  return null;
}

export async function getChapters(scriptureId: string) {
  const q = query(
    collection(db, 'scriptures', scriptureId, 'chapters'), 
    orderBy('number')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
}

export async function getVerses(scriptureId: string, chapterId: string) {
  const q = query(
    collection(db, 'scriptures', scriptureId, 'chapters', chapterId, 'verses'), 
    orderBy('number')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Verse));
}
