import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp 
} from 'firebase/firestore';

export interface WisdomEntry {
  id: string;
  quote: string;
  author?: string;
  source?: string;
  sadhana?: string;
  publishDate: string; // ISO Date YYYY-MM-DD
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export async function getAllWisdomEntries() {
  try {
    const q = query(collection(db, 'wisdom'), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WisdomEntry));
  } catch (error) {
    console.error('Failed to get wisdom entries:', error);
    return [];
  }
}

export async function getWisdomByDate(dateStr: string) {
  try {
    const q = query(
      collection(db, 'wisdom'), 
      where('publishDate', '==', dateStr),
      where('published', '==', true)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const firstDoc = snapshot.docs[0];
      return { id: firstDoc.id, ...firstDoc.data() } as WisdomEntry;
    }
    return null;
  } catch (error) {
    console.error('Failed to get wisdom for date:', error);
    return null;
  }
}

export async function createWisdomEntry(data: Partial<WisdomEntry>) {
  const collectionRef = collection(db, 'wisdom');
  const newDocRef = doc(collectionRef);
  const id = newDocRef.id;

  await setDoc(newDocRef, {
    ...data,
    id,
    published: data.published ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}

export async function updateWisdomEntry(id: string, data: Partial<WisdomEntry>) {
  const docRef = doc(db, 'wisdom', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteWisdomEntry(id: string) {
  await deleteDoc(doc(db, 'wisdom', id));
}
