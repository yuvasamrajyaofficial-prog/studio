import { collection, getDocs, query, orderBy, limit, where, getCountFromServer, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { UserProfile } from '@/types/user';

export async function getAllUsers() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as UserProfile));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const usersColl = collection(db, 'users');
    const usersSnapshot = await getCountFromServer(usersColl);
    
    // Placeholder for other stats until we have real collections
    return {
      totalUsers: usersSnapshot.data().count,
      activeSouls: Math.floor(usersSnapshot.data().count * 0.7), // Estimated
      aiMessages: 12500, // Placeholder
      systemAlerts: 0
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      totalUsers: 0,
      activeSouls: 0,
      aiMessages: 0,
      systemAlerts: 0
    };
  }
}

export async function updateUserRole(userId: string, role: 'user' | 'admin' | 'moderator') {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { role });
}
