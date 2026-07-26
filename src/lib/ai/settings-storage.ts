import { db } from '../firebase/config';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export type Provider = 'gemini' | 'openai' | 'claude';

export interface AISettings {
  provider: Provider;
  apiKey: string;
  isValid: boolean;
  lastTested?: Date;
}

/**
 * Crypto utility for encrypting API keys
 */
const ENCRYPTION_ALGORITHM = 'AES-GCM';
const SALT = 'malola-cosmic-salt-2026';

async function getCryptoKey(userId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  
  // Create a base key material from user ID and salt
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(userId + SALT),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive an AES-GCM key
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(SALT),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: ENCRYPTION_ALGORITHM, length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

async function encryptKey(key: string, userId: string): Promise<string> {
  if (!key) return key;

  try {
    const cryptoKey = await getCryptoKey(userId);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const enc = new TextEncoder();
    
    const encrypted = await crypto.subtle.encrypt(
      { name: ENCRYPTION_ALGORITHM, iv },
      cryptoKey,
      enc.encode(key)
    );

    // Combine IV and encrypted data, then convert to base64
    const encryptedArray = new Uint8Array(encrypted);
    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv, 0);
    combined.set(encryptedArray, iv.length);
    
    return btoa(String.fromCharCode(...combined));
  } catch (err) {
    console.error('Failed to encrypt key:', err);
    // Fallback to basic obfuscation if Web Crypto fails (e.g. non-HTTPS environment)
    return 'b64::' + btoa(key);
  }
}

async function decryptKey(encrypted: string, userId: string): Promise<string> {
  if (!encrypted) return encrypted;

  try {
    // Check if it's the basic fallback encoding
    if (encrypted.startsWith('b64::')) {
       return atob(encrypted.replace('b64::', ''));
    }
    // Check for legacy encoding (just pure base64 without our new scheme length)
    // A secure base64 string will be much longer. If not AES, fallback to old way.
    
    const combined = new Uint8Array(
      atob(encrypted).split('').map(char => char.charCodeAt(0))
    );

    if (combined.length < 12) {
        // Likely legacy base64 encoding from before migration
        return atob(encrypted);
    }

    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    const cryptoKey = await getCryptoKey(userId);

    const decrypted = await crypto.subtle.decrypt(
      { name: ENCRYPTION_ALGORITHM, iv },
      cryptoKey,
      data
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  } catch (err) {
    console.warn('Failed to decrypt as AES, attempting legacy fallback:', err);
    try {
      return atob(encrypted); // Try legacy plain base64
    } catch {
      return encrypted;
    }
  }
}

/**
 * Save AI settings to Firestore
 */
export async function saveAISettings(
  userId: string,
  settings: AISettings
): Promise<void> {
  const settingsRef = doc(db, `users/${userId}/settings/ai`);
  
  const encryptedApiKey = await encryptKey(settings.apiKey, userId);

  await setDoc(settingsRef, {
    provider: settings.provider,
    apiKey: encryptedApiKey,
    isValid: settings.isValid,
    lastTested: settings.lastTested ? serverTimestamp() : null,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Get AI settings from Firestore
 */
export async function getAISettings(userId: string): Promise<AISettings | null> {
  const settingsRef = doc(db, `users/${userId}/settings/ai`);
  const snapshot = await getDoc(settingsRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  const data = snapshot.data();
  const decryptedApiKey = await decryptKey(data.apiKey, userId);
  
  return {
    provider: data.provider,
    apiKey: decryptedApiKey,
    isValid: data.isValid,
    lastTested: data.lastTested?.toDate(),
  };
}

/**
 * Test API key validity
 */
export async function testAPIKey(
  provider: Provider,
  apiKey: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (provider === 'gemini') {
      // Test Gemini API
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Updated model
      
      // Try a simple test generation
      const result = await model.generateContent('Hello');
      const response = await result.response;
      
      if (response.text()) {
        return { success: true, message: 'Gemini API key is valid!' };
      }
    } else if (provider === 'openai') {
      // Test OpenAI API
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      
      if (response.ok) {
        return { success: true, message: 'OpenAI API key is valid!' };
      } else {
        return { success: false, message: 'Invalid OpenAI API key' };
      }
    } else if (provider === 'claude') {
      // Test Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      });
      
      if (response.ok) {
        return { success: true, message: 'Claude API key is valid!' };
      } else {
        return { success: false, message: 'Invalid Claude API key' };
      }
    }
    
    return { success: false, message: 'Unknown provider' };
  } catch (error: any) {
    console.error('API key test error:', error);
    return {
      success: false,
      message: error.message || 'Failed to test API key',
    };
  }
}

/**
 * Delete AI settings
 */
export async function deleteAISettings(userId: string): Promise<void> {
  const settingsRef = doc(db, `users/${userId}/settings/ai`);
  await setDoc(settingsRef, {
    provider: null,
    apiKey: null,
    isValid: false,
    lastTested: null,
    updatedAt: serverTimestamp(),
  });
}
