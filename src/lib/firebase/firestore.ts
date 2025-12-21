import { doc, getDoc, setDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import type { UserProfile, SoulID } from '@/types/user';

/**
 * Create a new user profile in Firestore
 */
export async function createUserProfile(userId: string, data: Partial<UserProfile>) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
}

/**
 * Update user's Soul ID in Firestore
 */
export async function updateSoulID(userId: string, soulID: SoulID) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    soulID,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/**
 * Save registration data to user profile
 */
export async function saveRegistrationData(userId: string, registrationData: any) {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, {
    registration: registrationData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/**
 * Update user profile fields
 */
export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
