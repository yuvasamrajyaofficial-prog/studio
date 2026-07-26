import { db } from '@/lib/firebase/config';
import { doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

export const KARMA_REWARDS = {
  SADHANA_COMPLETE: 25,
  SCRIPTURE_CHAPTER_READ: 50,
  POST_CREATED: 15,
  COMMENT_CREATED: 10,
  SOUL_ID_GENERATED: 100,
};

export async function awardKarmaPoints(userId: string, points: number, reason: string) {
  if (!userId || points <= 0) return;

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      karma: increment(points),
      'karmaMeter.points': increment(points),
      updatedAt: serverTimestamp(),
    });
    return { success: true, pointsAwarded: points, reason };
  } catch (error) {
    console.error(`Failed to award karma to ${userId}:`, error);
    return { success: false, error };
  }
}
