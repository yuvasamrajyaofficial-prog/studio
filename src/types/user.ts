export type CountryCode = 'IN' | 'JP' | 'US' | 'GB' | 'OTHER';

export type Religion = 'HINDUISM' | 'BUDDHISM' | 'CHRISTIANITY' | 'ISLAM' | 'SIKHISM' | 'JAINISM' | 'SECULAR' | 'OTHER';

export type UserInterest = 
  | 'SCRIPTURES'
  | 'ASTROLOGY'
  | 'AYURVEDA'
  | 'MEDITATION'
  | 'RELATIONSHIPS'
  | 'PHILOSOPHY'
  | 'HISTORY';

export interface ConsentFlags {
  astrology: boolean;
  relationshipMatching: boolean;
  aiCounseling: boolean;
  dataCollection: boolean;
}

export interface CulturalContext {
  country: CountryCode;
  languages: string[];
  religion?: Religion;
  culturalBackground?: string; // e.g., "Sanatana", "Zen"
  interests: UserInterest[];
  consentFlags: ConsentFlags;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  culturalContext: CulturalContext;
  createdAt: Date;
  updatedAt: Date;
  isCreator?: boolean;
  isAdmin?: boolean;
}
