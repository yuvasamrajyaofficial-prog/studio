export interface Scripture {
  id: string;
  title: {
    en: string;
    sa?: string;
    hi?: string;
    [key: string]: string | undefined;
  };
  slug: string;
  description: {
    en: string;
    [key: string]: string | undefined;
  };
  author?: string;
  coverImage?: string;
  languages: string[];
  tags?: string[];
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
    sa?: string;
    [key: string]: string | undefined;
  };
  summary?: {
    en: string;
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
    original: string; // Sanskrit/Source
    transliteration?: string;
    [key: string]: string | undefined;
  };
  translations: {
    en: string;
    [key: string]: string | undefined;
  };
  commentary?: {
    en?: string;
    [key: string]: string | undefined;
  };
  createdAt?: any;
}
