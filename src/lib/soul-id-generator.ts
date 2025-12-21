/**
 * Generate a short, unique Soul ID for users
 * Format: @username_xxxx where xxxx is a 4-character unique suffix
 */

import { db } from './firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Generate username from email
 * Example: john.doe@gmail.com → john_doe
 */
function generateUsernameFromEmail(email: string): string {
  const localPart = email.split('@')[0];
  // Remove special characters and replace with underscore
  const cleaned = localPart
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .slice(0, 20); // Limit length
  
  return cleaned;
}

/**
 * Generate a 4-character unique suffix based on user data
 */
function generateUniqueSuffix(email: string, uid: string): string {
  // Combine email and uid for uniqueness
  const combined = `${email}${uid}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to base36 and take 4 characters
  const suffix = Math.abs(hash).toString(36).slice(0, 4);
  
  return suffix.padEnd(4, '0'); // Ensure 4 characters
}

/**
 * Check if a Soul ID already exists in Firestore
 */
async function soulIDExists(soulID: string): Promise<boolean> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('soulID.shortId', '==', soulID));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking Soul ID existence:', error);
    return false;
  }
}

/**
 * Generate a short, unique Soul ID
 * @param email User's email address
 * @param uid User's Firebase UID
 * @returns Short Soul ID in format @username_xxxx
 */
export async function generateShortSoulID(email: string, uid: string): Promise<string> {
  const username = generateUsernameFromEmail(email);
  const suffix = generateUniqueSuffix(email, uid);
  
  let soulID = `@${username}_${suffix}`;
  
  // If collision (rare), increment suffix
  let attempts = 0;
  while (await soulIDExists(soulID) && attempts < 10) {
    attempts++;
    const newSuffix = generateUniqueSuffix(email + attempts, uid);
    soulID = `@${username}_${newSuffix}`;
  }
  
  return soulID;
}

/**
 * Validate Soul ID format
 */
export function isValidSoulID(soulID: string): boolean {
  // Format: @username_xxxx (4-24 chars username + 4 char suffix)
  const regex = /^@[a-z0-9_]{4,24}_[a-z0-9]{4}$/;
  return regex.test(soulID);
}

/**
 * Extract display name from Soul ID
 * @username_1234 → @username
 */
export function getDisplaySoulID(soulID: string): string {
  if (!soulID || !soulID.includes('_')) return soulID;
  const parts = soulID.split('_');
  return parts[0]; // Return @username part
}
