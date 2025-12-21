import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Upload user profile picture to Firebase Storage
 */
export async function uploadProfilePicture(userId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `profile-pictures/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Upload Soul ID card image to Firebase Storage
 */
export async function uploadSoulIDCard(userId: string, imageBlob: Blob): Promise<string> {
  const storageRef = ref(storage, `soul-id-cards/${userId}.png`);
  await uploadBytes(storageRef, imageBlob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Delete a file from Firebase Storage
 */
export async function deleteFile(filePath: string): Promise<void> {
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef);
}

/**
 * Get download URL for a file
 */
export async function getFileURL(filePath: string): Promise<string> {
  const storageRef = ref(storage, filePath);
  return await getDownloadURL(storageRef);
}
