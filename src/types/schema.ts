import { Timestamp } from 'firebase/firestore';

export type ScriptureCategory =
  | 'Vedas'
  | 'Upanishads'
  | 'Vedanga'
  | 'Dharma Shastra'
  | 'Itihasa'
  | 'Puranas'
  | 'Upapuranas'
  | 'Darshanas (Philosophy)'
  | 'Agamas & Tantras'
  | 'Niti, Artha & Psychology'
  | 'Bhakti Texts'
  | 'Yoga & Sadhana'
  | 'Acharya Bhashyas (Commentaries)'
  | 'Advanced Vedanta'
  | 'Kali Yuga Texts';

export type Yuga = 'Satya' | 'Treta' | 'Dvapara' | 'Kali' | 'Timeless';

export interface Scripture {
  id?: string;
  slug: string;
  title: {
    en: string;
    sa: string;
    hi?: string;
    kn?: string;
  };
  category: ScriptureCategory;
  yuga: Yuga;
  description: {
    en: string;
    sa?: string;
  };
  author?: string;
  coverImage?: string;
  tags?: string[];
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Chapter {
  id?: string;
  scriptureId: string;
  number: number;
  title: {
    en: string;
    sa: string;
    hi?: string;
    kn?: string;
  };
  summary?: {
    en: string;
  };
  slug: string; // e.g., "chapter-1"
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Verse {
  id?: string;
  scriptureId: string;
  chapterId: string;
  number: number;
  content: {
    sa: string; // Sanskrit text
    en: string; // English translation
    hi?: string; // Hindi translation
    kn?: string; // Kannada translation
  };
  transliteration?: string; // IAST
  meaning?: {
    en?: string; // Detailed meaning/purport
  };
  audioUrl?: string; // URL to audio file
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
