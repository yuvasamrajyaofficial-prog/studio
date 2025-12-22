export interface Scripture {
  id: string;
  slug: string;
  title: Record<string, string>; // { en: "Bhagavad Gita", sa: "भगवद्गीता" }
  description: Record<string, string>;
  author: string;
  tradition: 'Hinduism' | 'Buddhism' | 'Christianity' | 'Islam' | 'Sikhism' | 'Jainism' | 'Taoism' | 'Other';
  tags: string[];
  coverImage: string;
  totalChapters: number;
  languages: string[]; // ['en', 'sa', 'hi', 'kn']
  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  scriptureId: string;
  number: number;
  title: Record<string, string>;
  summary: Record<string, string>;
  versesCount: number;
  order: number;
}

export interface Verse {
  id: string;
  scriptureId: string;
  chapterId: string;
  number: number;
  text: {
    original: string;      // The source text (e.g., Sanskrit)
    transliteration?: string; // Romanized version (e.g., IAST)
  };
  translations: Record<string, string>; // { en: "...", hi: "...", kn: "..." }
  commentary?: {
    author: string;
    text: Record<string, string>;
  }[];
}

export type Language = 'en' | 'hi' | 'sa' | 'kn' | 'ta' | 'te';

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'Hindi',
  sa: 'Sanskrit',
  kn: 'Kannada',
  ta: 'Tamil',
  te: 'Telugu',
};
