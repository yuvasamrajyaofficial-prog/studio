import { db } from './config';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  serverTimestamp
} from 'firebase/firestore';

export interface MediaItem {
  id?: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'video';
  fileName: string;
  orderIndex: number;
  scriptureId?: string;
  storagePath?: string;
  uploadedAt?: any;
}

/**
 * Fetch all media items ordered by orderIndex ascending, then uploadedAt descending
 */
export async function getMediaItems(): Promise<MediaItem[]> {
  try {
    const q = query(
      collection(db, 'media'),
      orderBy('orderIndex', 'asc'),
      orderBy('uploadedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MediaItem[];
  } catch (error) {
    console.error('Error fetching media items:', error);
    // Fallback: If uploadedAt index is not ready yet, try a simple query first
    try {
      const qSimple = query(collection(db, 'media'), orderBy('orderIndex', 'asc'));
      const snapshotSimple = await getDocs(qSimple);
      return snapshotSimple.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaItem[];
    } catch (innerError) {
      console.error('Fallback fetching media failed:', innerError);
      return [];
    }
  }
}

/**
 * Fetch media items for a specific scripture ordered by orderIndex ascending
 */
export async function getMediaItemsByScripture(scriptureId: string): Promise<MediaItem[]> {
  try {
    const q = query(
      collection(db, 'media'),
      where('scriptureId', '==', scriptureId),
      orderBy('orderIndex', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MediaItem[];
  } catch (error) {
    console.error('Error fetching media items by scripture:', error);
    // Fallback: try querying without orderIndex filter if indexes are not active yet
    try {
      const qSimple = query(collection(db, 'media'), where('scriptureId', '==', scriptureId));
      const snapshotSimple = await getDocs(qSimple);
      const items = snapshotSimple.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MediaItem[];
      return items.sort((a,b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    } catch (innerError) {
      console.error('Fallback fetching media by scripture failed:', innerError);
      return [];
    }
  }
}

/**
 * Create a new media entry in Firestore
 */
export async function createMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>): Promise<string> {
  try {
    const mediaRef = collection(db, 'media');
    const docRef = doc(mediaRef);
    await setDoc(docRef, {
      ...item,
      uploadedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating media item:', error);
    throw new Error('Failed to create media item record');
  }
}

/**
 * Update media metadata
 */
export async function updateMediaItem(id: string, updates: Partial<MediaItem>): Promise<void> {
  try {
    const docRef = doc(db, 'media', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    throw new Error('Failed to update media item');
  }
}

/**
 * Delete media item record from Firestore
 */
export async function deleteMediaItem(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'media', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting media item:', error);
    throw new Error('Failed to delete media item');
  }
}
