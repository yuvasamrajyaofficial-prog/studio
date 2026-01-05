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
import { Scripture, Chapter, Verse } from '@/types/scripture';

// --- Scriptures ---

export async function getAllScriptures() {
  const q = query(collection(db, 'scriptures'), orderBy('title.en'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Scripture));
}

export async function getScriptureById(id: string) {
  const docRef = doc(db, 'scriptures', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Scripture;
  }
  return null;
}

export async function createScripture(data: Partial<Scripture>) {
  // If ID is provided (slug), use it, otherwise auto-gen
  const id = data.slug || doc(collection(db, 'scriptures')).id;
  const docRef = doc(db, 'scriptures', id);
  
  await setDoc(docRef, {
    ...data,
    id,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return id;
}

export async function updateScripture(id: string, data: Partial<Scripture>) {
  const docRef = doc(db, 'scriptures', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteScripture(id: string) {
  await deleteDoc(doc(db, 'scriptures', id));
}

// --- Chapters ---

export async function getChapters(scriptureId: string) {
  const q = query(
    collection(db, 'scriptures', scriptureId, 'chapters'), 
    orderBy('number')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
}

export async function createChapter(scriptureId: string, data: Partial<Chapter>) {
  const collectionRef = collection(db, 'scriptures', scriptureId, 'chapters');
  const docRef = await addDoc(collectionRef, {
    ...data,
    scriptureId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateChapter(scriptureId: string, chapterId: string, data: Partial<Chapter>) {
  const docRef = doc(db, 'scriptures', scriptureId, 'chapters', chapterId);
  await updateDoc(docRef, data);
}

export async function deleteChapter(scriptureId: string, chapterId: string) {
  await deleteDoc(doc(db, 'scriptures', scriptureId, 'chapters', chapterId));
}

// --- Verses ---

export async function getVerses(scriptureId: string, chapterId: string) {
  const q = query(
    collection(db, 'scriptures', scriptureId, 'chapters', chapterId, 'verses'), 
    orderBy('number')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Verse));
}

export async function createVerse(scriptureId: string, chapterId: string, data: Partial<Verse>) {
  const collectionRef = collection(db, 'scriptures', scriptureId, 'chapters', chapterId, 'verses');
  const docRef = await addDoc(collectionRef, {
    ...data,
    scriptureId,
    chapterId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateVerse(scriptureId: string, chapterId: string, verseId: string, data: Partial<Verse>) {
  const docRef = doc(db, 'scriptures', scriptureId, 'chapters', chapterId, 'verses', verseId);
  await updateDoc(docRef, data);
}

export async function deleteVerse(scriptureId: string, chapterId: string, verseId: string) {
  await deleteDoc(doc(db, 'scriptures', scriptureId, 'chapters', chapterId, 'verses', verseId));
}
