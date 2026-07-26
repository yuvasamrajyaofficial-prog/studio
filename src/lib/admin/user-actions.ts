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
import { UserProfile } from '@/types/user';

export async function getAllUsers() {
  try {
    const q = query(collection(db, 'users'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : 'Recent'
      } as UserProfile;
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function updateUserRole(uid: string, role: 'user' | 'moderator' | 'admin') {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    role,
    updatedAt: serverTimestamp(),
  });
}

export async function updateUserStatus(uid: string, status: 'active' | 'suspended') {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}
