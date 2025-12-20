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

export interface AstrologyData {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  lat?: number;
  lng?: number;
  lagna?: string;
  rashi?: string;
  nakshatra?: string;
}

export interface PsychologyData {
  dominantGuna: 'Sattva' | 'Rajas' | 'Tamas';
  gunaBalance: {
    sattva: number;
    rajas: number;
    tamas: number;
  };
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  personalityTraits: string[];
}

export interface SoulID {
  astrology: AstrologyData;
  psychology: PsychologyData;
  karmicSignature: number;
  signatureHash: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  culturalContext: CulturalContext;
  soulID?: SoulID;
  karmaMeter: {
    points: number;
    level: number;
    glowColor: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isCreator?: boolean;
  isAdmin?: boolean;
}
