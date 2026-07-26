'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { createUserProfile, getUserProfile } from '@/lib/firebase/firestore';
import type { UserProfile } from '@/types/user';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch extended user profile from Firestore
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name if provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Create user profile in Firestore with ALL required fields
    await createUserProfile(user.uid, {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || undefined,
      photoURL: undefined,
      karmaMeter: {
        points: 0,
        level: 1,
        glowColor: '#4ECDC4',
      },
      stats: {
        scripturesRead: 0,
        totalReadingTime: 0,
        aiChatSessions: 0,
        favoriteScriptures: [],
        communitiesJoined: [],
      },
      preferences: {
        theme: 'dark' as const,
        language: 'English',
        notifications: {
          email: true,
          push: false,
          dailyWisdom: true,
        },
      },
    });

    return user;
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create user profile if it doesn't exist
      try {
        await createUserProfile(user.uid, {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || undefined,
          photoURL: user.photoURL || undefined,
          culturalContext: {
            country: 'IN',
            languages: ['en'],
            religion: 'HINDUISM',
            interests: [],
            consentFlags: {
              astrology: false,
              relationshipMatching: false,
              aiCounseling: false,
              dataCollection: false
            }
          },
          karmaMeter: {
            points: 0,
            level: 1,
            glowColor: '#4ECDC4',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (profileError) {
        console.error("Error creating user profile:", profileError);
        // Don't block sign-in if profile creation fails, but log it
      }

      return user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
