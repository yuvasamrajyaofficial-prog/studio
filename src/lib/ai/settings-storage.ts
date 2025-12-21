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
 * Simple encryption for API keys (basic obfuscation)
 * For production, use Web Crypto API for stronger encryption
 */
function encryptKey(key: string): string {
  // Base64 encode for basic obfuscation
  // TODO: Implement proper encryption with Web Crypto API
  return btoa(key);
}

function decryptKey(encrypted: string): string {
  try {
    return atob(encrypted);
  } catch {
    return encrypted;
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
  
  await setDoc(settingsRef, {
    provider: settings.provider,
    apiKey: encryptKey(settings.apiKey), // Encrypt before storing
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
  
  return {
    provider: data.provider,
    apiKey: decryptKey(data.apiKey), // Decrypt when retrieving
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
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
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
