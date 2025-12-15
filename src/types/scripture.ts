export type Era = 'SATYA_YUGA' | 'TRETA_YUGA' | 'DVAPARA_YUGA' | 'KALI_YUGA' | 'MODERN' | 'UNKNOWN';

export interface Translation {
  language: string;
  text: string;
  translator?: string;
}

export interface Verse {
  id: string;
  number: number;
  originalText: string; // e.g., Sanskrit shloka
  translations: Translation[];
  audioUrl?: string;
  meaning?: string; // Detailed explanation
  commentary?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description?: string;
  verses: Verse[];
}

export interface Scripture {
  id: string;
  title: string;
  originalTitle?: string;
  author?: string; // e.g., "Vyasa"
  region: string; // e.g., "India"
  religion?: string; // e.g., "Hinduism"
  era?: Era;
  language: string; // Original language
  description: string;
  coverImageUrl?: string;
  tags: string[];
  chapters: Chapter[]; // Or just IDs if fetching lazily
  isPublic: boolean;
}
