"use server";

import { db } from "@/lib/firebase/config";
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  addDoc
} from "firebase/firestore";
import { scriptureConverter, chapterConverter, verseConverter } from "@/lib/firebase/converters";
import type { Scripture, Chapter, Verse } from "@/types/schema";
import { revalidatePath } from "next/cache";

// --- Scripture Actions ---

export async function createScripture(data: Partial<Scripture>) {
  try {
    const scripturesRef = collection(db, "scriptures").withConverter(scriptureConverter);
    // Use slug as ID if possible, otherwise auto-gen
    const docRef = data.slug 
      ? doc(scripturesRef, data.slug) 
      : doc(scripturesRef);
    
    await setDoc(docRef, data as Scripture);
    revalidatePath("/admin");
    revalidatePath("/scriptures");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating scripture:", error);
    throw new Error("Failed to create scripture");
  }
}

export async function updateScripture(id: string, data: Partial<Scripture>) {
  try {
    const docRef = doc(db, "scriptures", id).withConverter(scriptureConverter);
    await updateDoc(docRef, data);
    revalidatePath("/admin");
    revalidatePath("/scriptures");
    return { success: true };
  } catch (error) {
    console.error("Error updating scripture:", error);
    throw new Error("Failed to update scripture");
  }
}

export async function deleteScripture(id: string) {
  try {
    await deleteDoc(doc(db, "scriptures", id));
    revalidatePath("/admin");
    revalidatePath("/scriptures");
    return { success: true };
  } catch (error) {
    console.error("Error deleting scripture:", error);
    throw new Error("Failed to delete scripture");
  }
}

export async function getScriptures() {
  try {
    const q = query(collection(db, "scriptures"), orderBy("title.en"));
    const snapshot = await getDocs(q.withConverter(scriptureConverter));
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching scriptures:", error);
    return [];
  }
}

// --- Chapter Actions ---

export async function createChapter(data: Partial<Chapter>) {
  try {
    const chaptersRef = collection(db, "chapters").withConverter(chapterConverter);
    // ID format: scriptureId-chapterNumber (e.g., bhagavad-gita-1)
    const id = `${data.scriptureId}-${data.number}`;
    const docRef = doc(chaptersRef, id);
    
    await setDoc(docRef, data as Chapter);
    revalidatePath("/admin");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating chapter:", error);
    throw new Error("Failed to create chapter");
  }
}

export async function deleteChapter(id: string) {
  try {
    await deleteDoc(doc(db, "chapters", id));
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting chapter:", error);
    throw new Error("Failed to delete chapter");
  }
}

export async function getChapters(scriptureId: string) {
  try {
    const q = query(
      collection(db, "chapters"), 
      where("scriptureId", "==", scriptureId),
      orderBy("number")
    );
    const snapshot = await getDocs(q.withConverter(chapterConverter));
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
}

// --- Verse Actions ---

export async function createVerse(data: Partial<Verse>) {
  try {
    const versesRef = collection(db, "verses").withConverter(verseConverter);
    // ID format: scriptureId-chapterNumber-verseNumber
    const id = `${data.scriptureId}-${data.chapterId?.split('-').pop()}-${data.number}`;
    const docRef = doc(versesRef, id);
    
    await setDoc(docRef, data as Verse);
    revalidatePath("/admin");
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating verse:", error);
    throw new Error("Failed to create verse");
  }
}

export async function deleteVerse(id: string) {
  try {
    await deleteDoc(doc(db, "verses", id));
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting verse:", error);
    throw new Error("Failed to delete verse");
  }
}

export async function getVerses(chapterId: string) {
  try {
    const q = query(
      collection(db, "verses"), 
      where("chapterId", "==", chapterId),
      orderBy("number")
    );
    const snapshot = await getDocs(q.withConverter(verseConverter));
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching verses:", error);
    return [];
  }
}
