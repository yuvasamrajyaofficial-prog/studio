import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { Scripture, Chapter, Verse } from '@/types/scripture';

export async function getScriptures() {
  const q = query(collection(db, 'scriptures'), orderBy('title.en'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Scripture));
}

export async function getScriptureBySlug(slug: string) {
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

export async function recalculateScriptureCounts(scriptureId: string) {
  try {
    const chaptersSnap = await getDocs(collection(db, 'scriptures', scriptureId, 'chapters'));
    const totalChapters = chaptersSnap.size;

    let totalVerses = 0;
    for (const chapterDoc of chaptersSnap.docs) {
      const versesSnap = await getDocs(collection(db, 'scriptures', scriptureId, 'chapters', chapterDoc.id, 'verses'));
      totalVerses += versesSnap.size;
    }

    const scriptureRef = doc(db, 'scriptures', scriptureId);
    await updateDoc(scriptureRef, {
      totalChapters,
      totalVerses,
      updatedAt: serverTimestamp(),
    });

    return { success: true, totalChapters, totalVerses };
  } catch (error) {
    console.error(`Failed to recalculate counts for scripture ${scriptureId}:`, error);
    return { success: false, error };
  }
}
