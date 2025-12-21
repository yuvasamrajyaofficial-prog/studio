import { db } from '../firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokens?: number;
  model?: string;
}

export interface Chat {
  id: string;
  title: string;
  preview: string;
  provider: 'gemini' | 'openai' | 'claude';
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  messages: Message[];
}

/**
 * Create a new chat
 */
export async function createChat(userId: string, provider: string): Promise<Chat> {
  const chatId = `chat_${Date.now()}`;
  const chatRef = doc(db, `users/${userId}/chatHistory/${chatId}`);
  
  const newChat: Omit<Chat, 'messages'> & { messages: never[] } = {
    id: chatId,
    title: 'New Conversation',
    preview: 'Start a new spiritual conversation',
    provider: provider as any,
    createdAt: new Date(),
    updatedAt: new Date(),
    messageCount: 0,
    messages: [],
  };
  
  await setDoc(chatRef, {
    ...newChat,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  return { ...newChat, messages: [] };
}

/**
 * Load all user chats
 */
export async function loadUserChats(userId: string): Promise<Chat[]> {
  const chatsRef = collection(db, `users/${userId}/chatHistory`);
  const q = query(chatsRef, orderBy('updatedAt', 'desc'), limit(50));
  
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      preview: data.preview,
      provider: data.provider,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      messageCount: data.messageCount || 0,
      messages: (data.messages || []).map((m: any) => ({
        ...m,
        timestamp: m.timestamp?.toDate() || new Date(),
      })),
    };
  });
}

/**
 * Get a specific chat
 */
export async function getChat(userId: string, chatId: string): Promise<Chat | null> {
  const chatRef = doc(db, `users/${userId}/chatHistory/${chatId}`);
  const snapshot = await getDoc(chatRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: data.title,
    preview: data.preview,
    provider:data.provider,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    messageCount: data.messageCount || 0,
    messages: (data.messages || []).map((m: any) => ({
      ...m,
      timestamp: m.timestamp?.toDate() || new Date(),
    })),
  };
}

/**
 * Save a message to a chat
 */
export async function saveMessage(
  userId: string,
  chatId: string,
  message: Message
): Promise<void> {
  const chatRef = doc(db, `users/${userId}/chatHistory/${chatId}`);
  const chatSnap = await getDoc(chatRef);
  
  if (!chatSnap.exists()) {
    throw new Error('Chat not found');
  }
  
  const currentMessages = chatSnap.data().messages || [];
  const updatedMessages = [
    ...currentMessages,
    {
      ...message,
      timestamp: Timestamp.fromDate(message.timestamp),
    },
  ];
  
 await updateDoc(chatRef, {
    messages: updatedMessages,
    messageCount: updatedMessages.length,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update chat title (auto-generate from first message)
 */
export async function updateChatTitle(
  userId: string,
  chatId: string,
  title: string,
  preview: string
): Promise<void> {
  const chatRef = doc(db, `users/${userId}/chatHistory/${chatId}`);
  
  await updateDoc(chatRef, {
    title,
    preview,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a chat
 */
export async function deleteChat(userId: string, chatId: string): Promise<void> {
  const chatRef = doc(db, `users/${userId}/chatHistory/${chatId}`);
  await deleteDoc(chatRef);
}

/**
 * Generate chat title from first message
 */
export function generateChatTitle(firstMessage: string): {
  title: string;
  preview: string;
} {
  const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');
  const preview = firstMessage.slice(0, 100) + (firstMessage.length > 100 ? '...' : '');
  
  return { title, preview };
}
