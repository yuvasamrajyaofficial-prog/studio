import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AstrologyData, CountryCode, CulturalContext, PsychologyData, Religion, SoulID, UserInterest } from '@/types/user';

interface OnboardingState {
  step: number;
  country: CountryCode | null;
  languages: string[];
  religion: Religion | null;
  culturalBackground: string;
  interests: UserInterest[];
  consentFlags: {
    astrology: boolean;
    relationshipMatching: boolean;
    aiCounseling: boolean;
    dataCollection: boolean;
  };
  
  // Soul ID Data
  astrologyData: AstrologyData | null;
  psychologyData: PsychologyData | null;
  soulID: SoulID | null;
  
  // Actions
  setStep: (step: number) => void;
  setCountry: (country: CountryCode) => void;
  toggleLanguage: (language: string) => void;
  setReligion: (religion: Religion) => void;
  setCulturalBackground: (bg: string) => void;
  toggleInterest: (interest: UserInterest) => void;
  toggleConsent: (key: keyof OnboardingState['consentFlags']) => void;
  setAstrologyData: (data: AstrologyData) => void;
  setPsychologyData: (data: PsychologyData) => void;
  setSoulID: (id: SoulID) => void;
  reset: () => void;
  
  // Computed
  getCulturalContext: () => CulturalContext | null;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: 1,
      country: null,
      languages: [],
      religion: null,
      culturalBackground: '',
      interests: [],
      consentFlags: {
        astrology: false,
        relationshipMatching: false,
        aiCounseling: false,
        dataCollection: false,
      },
      astrologyData: null,
      psychologyData: null,
      soulID: null,

      setStep: (step) => set({ step }),
      setCountry: (country) => set({ country }),
      toggleLanguage: (language) => set((state) => {
        const exists = state.languages.includes(language);
        return {
          languages: exists 
            ? state.languages.filter(l => l !== language)
            : [...state.languages, language]
        };
      }),
      setReligion: (religion) => set({ religion }),
      setCulturalBackground: (culturalBackground) => set({ culturalBackground }),
      toggleInterest: (interest) => set((state) => {
        const exists = state.interests.includes(interest);
        return {
          interests: exists
            ? state.interests.filter(i => i !== interest)
            : [...state.interests, interest]
        };
      }),
      toggleConsent: (key) => set((state) => ({
        consentFlags: {
          ...state.consentFlags,
          [key]: !state.consentFlags[key]
        }
      })),
      setAstrologyData: (astrologyData) => set({ astrologyData }),
      setPsychologyData: (psychologyData) => set({ psychologyData }),
      setSoulID: (soulID) => set({ soulID }),
      reset: () => set({
        step: 1,
        country: null,
        languages: [],
        religion: null,
        culturalBackground: '',
        interests: [],
        consentFlags: {
          astrology: false,
          relationshipMatching: false,
          aiCounseling: false,
          dataCollection: false,
        },
        astrologyData: null,
        psychologyData: null,
        soulID: null,
      }),

      getCulturalContext: () => {
        const state = get();
        if (!state.country) return null;
        
        return {
          country: state.country,
          languages: state.languages,
          religion: state.religion || undefined,
          culturalBackground: state.culturalBackground || undefined,
          interests: state.interests,
          consentFlags: state.consentFlags
        };
      }
    }),
    {
      name: 'onboarding-storage',
    }
  )
);
