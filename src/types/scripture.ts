export interface Scripture {
  id: string;
  title: {
    en: string;
    kn?: string;
    sa?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  slug: string;
  description: {
    en: string;
    kn?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  author?: string;
  coverImage?: string;
  languages: string[]; // e.g. ["kn", "en", "hi", "sa"]
  tags?: string[];
  tradition?: string;
  yuga?: string;
  verses?: number;
  totalChapters?: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface Chapter {
  id: string;
  scriptureId: string;
  number: number;
  title: {
    en: string;
    kn?: string;
    sa?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  summary?: {
    en: string;
    kn?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  versesCount: number;
  order: number;
  createdAt?: any;
}

export interface Verse {
  id: string;
  scriptureId: string;
  chapterId: string;
  number: number;
  text: {
    original: string; // Sanskrit/Source (Devanagari or Kannada script)
    transliteration?: string;
    [key: string]: string | undefined;
  };
  translations: {
    en: string;
    kn?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  meaning?: string;
  wordByWord?: Record<string, string>;
  audioUrl?: string;
  commentary?: {
    en?: string;
    kn?: string;
    hi?: string;
    sa?: string;
    [key: string]: string | undefined;
  };
  createdAt?: any;
}
