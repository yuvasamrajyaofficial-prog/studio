'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, updateUserProfile } from '@/lib/firebase/firestore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Globe, 
  Calendar, 
  Sparkles, 
  Activity,
  Settings,
  LogOut,
  Edit,
  ChevronLeft,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import type { UserProfile } from '@/types/user';
import { getKarmicGlowColor } from '@/lib/soul-id-calculator';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { Header } from '@/components/layout/header';
import { BackButton } from '@/components/ui/back-button';

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        console.log('[Profile] Loading profile for:', user.uid);
        let userProfile = await getUserProfile(user.uid);
        
        // If profile doesn't exist, create it now
        if (!userProfile) {
          console.log('[Profile] Profile not found, creating...');
          
          const { createUserProfile } = await import('@/lib/firebase/firestore');
          await createUserProfile(user.uid, {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            karmaMeter: {
              points: 0,
              level: 1,
              glowColor: '#4ECDC4',
              activities: [],
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
          
          console.log('[Profile] Profile created successfully');
          // Fetch again
          userProfile = await getUserProfile(user.uid);
        }
        
        if (userProfile) {
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('[Profile] Error loading/creating profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (user && profile) {
      updateUserProfile(user.uid, {
        preferences: {
          ...profile.preferences,
          theme: newTheme as 'light' | 'dark',
        }
      });
    }
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleLanguageChange = async () => {
    if (!user || !profile) return;
    
    const currentLang = profile.registration?.language || 'English';
    const newLang = currentLang === 'English' ? 'Sanskrit' : 'English';
    
    try {
      // Update local state
      setProfile({
        ...profile,
        registration: {
          ...profile.registration!,
          language: newLang
        }
      });

      // Update Firestore
      await updateUserProfile(user.uid, {
        registration: {
          ...profile.registration!,
          language: newLang
        }
      });
      
      toast.success(`Language changed to ${newLang}`);
    } catch (error) {
      console.error('Failed to update language:', error);
      toast.error('Failed to update language');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Profile not found</div>
      </div>
    );
  }

  const glowColor = profile.soulID ? getKarmicGlowColor(profile.soulID.psychology) : '#4ECDC4';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300 flex flex-col">
      <Header />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 max-w-6xl flex-1 pt-20">
        {/* Header Actions */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton label="Back to Cosmos" href="/cosmos" />
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-8 rounded-3xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="w-32 h-32 border-4" style={{ borderColor: glowColor }}>
              <AvatarImage src={profile.photoURL || ''} />
              <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-amber-600 text-primary-foreground">
                {profile.displayName?.[0] || profile.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {profile.displayName || 'Spiritual Seeker'}
              </h1>
              <p className="text-muted-foreground mb-4 flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>

              {/* Soul ID Badge */}
              {profile.soulID && (
                <div className="mb-4">
                  <Badge 
                    className="text-lg px-4 py-2 font-mono"
                    style={{ 
                      backgroundColor: `${glowColor}20`,
                      color: glowColor,
                      borderColor: glowColor
                    }}
                  >
                    Soul ID: {profile.soulID.signatureHash}
                  </Badge>
                </div>
              )}

              {/* Quick Stats */}
              <div className="flex gap-6 flex-wrap justify-center md:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    {profile.karmaMeter?.level || 1}
                  </div>
                  <div className="text-xs text-muted-foreground">Karma Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {profile.karmaMeter?.points || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Karma Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {profile.stats?.scripturesRead || 0}
                  </div>
                  <div className="text-xs text-muted-foreground">Scriptures Read</div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-primary-foreground">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-card/50 border-border/50 backdrop-blur-xl mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="soul-id">Soul ID</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Personal Information
              </h2>
              
              {profile.registration ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-foreground text-sm">Country</label>
                    <p className="text-foreground font-medium">{profile.registration.country}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">Language</label>
                    <p className="text-foreground font-medium">{profile.registration.language}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">Spiritual Path</label>
                    <p className="text-foreground font-medium">{profile.registration.religion}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-sm">Date of Birth</label>
                    <p className="text-foreground font-medium">{profile.registration.dateOfBirth}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-muted-foreground text-sm">Interests</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {profile.registration.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No registration details found.
                </div>
              )}
            </Card>

            {/* Karma Meter */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Karma Meter
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Level {profile.karmaMeter?.level || 1}</span>
                    <span className="text-foreground font-bold">{profile.karmaMeter?.points || 0} points</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-amber-500"
                      style={{ width: `${((profile.karmaMeter?.points || 0) % 100)}%` }}
                    />
                  </div>
                </div>
                
                <div 
                  className="w-16 h-16 rounded-full mx-auto"
                  style={{ 
                    backgroundColor: glowColor,
                    boxShadow: `0 0 30px ${glowColor}`
                  }}
                />
              </div>
            </Card>
          </TabsContent>

          {/* Soul ID Tab */}
          <TabsContent value="soul-id">
            <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Your Soul ID</h2>
              
              {profile.soulID ? (
                <div className="max-w-md mx-auto space-y-6">
                  <div className="text-center">
                    <div 
                      className="w-32 h-32 rounded-full mx-auto mb-4"
                      style={{ 
                        backgroundColor: glowColor,
                        boxShadow: `0 0 50px ${glowColor}`
                      }}
                    />
                    <p className="text-3xl font-mono font-bold text-foreground mb-2">
                      {profile.soulID.signatureHash}
                    </p>
                    <p className="text-muted-foreground">Karmic Signature: {profile.soulID.karmicSignature}</p>
                  </div>

                  {profile.soulID.astrology && (
                    <div className="bg-muted/50 rounded-2xl p-4">
                      <h3 className="text-foreground font-bold mb-3">Astrological Profile</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lagna:</span>
                          <span className="text-foreground">{profile.soulID.astrology.lagna}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rashi:</span>
                          <span className="text-foreground">{profile.soulID.astrology.rashi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Nakshatra:</span>
                          <span className="text-foreground">{profile.soulID.astrology.nakshatra}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Soul ID not generated yet</p>
                  <Button asChild>
                    <Link href="/soul-id">Generate Soul ID</Link>
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Activity & Stats
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">
                    {profile.stats?.scripturesRead || 0}
                  </div>
                  <div className="text-muted-foreground text-sm">Scriptures Read</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {profile.stats?.aiChatSessions || 0}
                  </div>
                  <div className="text-muted-foreground text-sm">AI Chat Sessions</div>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {profile.stats?.totalReadingTime || 0}m
                  </div>
                  <div className="text-muted-foreground text-sm">Reading Time</div>
                </div>
              </div>

              <div className="mt-6 text-center text-muted-foreground">
                <p className="text-sm">More activity tracking coming soon...</p>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-card/50 border-border/50 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                Account Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div>
                    <h3 className="text-foreground font-medium">Email</h3>
                    <p className="text-muted-foreground text-sm">{profile.email}</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Verified
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div>
                    <h3 className="text-foreground font-medium">Theme</h3>
                    <p className="text-muted-foreground text-sm capitalize">{theme} mode</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleThemeChange}>
                    {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div>
                    <h3 className="text-foreground font-medium">Language</h3>
                    <p className="text-muted-foreground text-sm">{profile.registration?.language || 'English'}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLanguageChange}>
                    Switch to {profile.registration?.language === 'English' ? 'Sanskrit' : 'English'}
                  </Button>
                </div>

                <div className="pt-6">
                  <Button 
                    variant="destructive" 
                    className="w-full text-destructive-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
