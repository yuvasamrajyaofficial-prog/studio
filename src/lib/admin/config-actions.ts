import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface SystemConfig {
  maintenanceMode: boolean;
  registrationOpen: boolean;
  aiEnabled: boolean;
  sessionTimeoutMinutes: number;
  updatedAt?: any;
}

const CONFIG_DOC_PATH = 'system_config';
const CONFIG_DOC_ID = 'global';

export async function getSystemConfig(): Promise<SystemConfig> {
  try {
    const docRef = doc(db, CONFIG_DOC_PATH, CONFIG_DOC_ID);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as SystemConfig;
    }
  } catch (error) {
    console.error('Failed to get system config:', error);
  }

  // Default fallback
  return {
    maintenanceMode: false,
    registrationOpen: true,
    aiEnabled: true,
    sessionTimeoutMinutes: 60,
  };
}

export async function updateSystemConfig(data: Partial<SystemConfig>) {
  const docRef = doc(db, CONFIG_DOC_PATH, CONFIG_DOC_ID);
  await setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
