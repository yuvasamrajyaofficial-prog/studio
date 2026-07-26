import { db } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export interface ModerationReport {
  id: string;
  targetType: 'post' | 'comment';
  targetId: string;
  postId?: string;
  content: string;
  authorName: string;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt?: any;
}

export async function getPendingReports() {
  try {
    const q = query(
      collection(db, 'reports'),
      where('status', '==', 'pending')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ModerationReport));
  } catch (error) {
    console.error('Failed to fetch moderation reports:', error);
    return [];
  }
}

export async function dismissReport(reportId: string) {
  const docRef = doc(db, 'reports', reportId);
  await updateDoc(docRef, {
    status: 'dismissed',
    resolvedAt: serverTimestamp(),
  });
}

export async function resolveReportAndDelete(reportId: string, targetType: 'post' | 'comment', targetId: string, postId?: string) {
  // Delete the reported post or comment
  if (targetType === 'post') {
    await deleteDoc(doc(db, 'posts', targetId));
  } else if (targetType === 'comment' && postId) {
    await deleteDoc(doc(db, 'posts', postId, 'comments', targetId));
  }

  // Update report status
  const docRef = doc(db, 'reports', reportId);
  await updateDoc(docRef, {
    status: 'resolved',
    resolvedAt: serverTimestamp(),
  });
}
