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
import { createUserProfile } from '@/lib/firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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

    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || null,
      photoURL: null,
      culturalContext: {
        country: '',
        language: '',
        religion: 'HINDUISM',
        interests: [],
        consentAstrology: false,
        consentMatching: false,
      },
      karmaMeter: {
        points: 0,
        level: 1,
        glowColor: '#4ECDC4',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user profile if it doesn't exist
    await createUserProfile(user.uid, {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName,
      photoURL: user.photoURL,
      culturalContext: {
        country: '',
        language: '',
        religion: 'HINDUISM',
        interests: [],
        consentAstrology: false,
        consentMatching: false,
      },
      karmaMeter: {
        points: 0,
        level: 1,
        glowColor: '#4ECDC4',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return user;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
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
