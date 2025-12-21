'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile } from '@/lib/firebase/firestore';
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
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import type { UserProfile } from '@/types/user';
import { getKarmicGlowColor } from '@/lib/soul-id-calculator';

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] flex items-center justify-center">
        <div className="text-white text-xl">Profile not found</div>
      </div>
    );
  }

  const glowColor = profile.soulID ? getKarmicGlowColor(profile.soulID.psychology) : '#4ECDC4';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/cosmos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Cosmos</span>
          </Link>
          
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <Avatar className="w-32 h-32 border-4" style={{ borderColor: glowColor }}>
              <AvatarImage src={profile.photoURL || ''} />
              <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-amber-600">
                {profile.displayName?.[0] || profile.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {profile.displayName || 'Spiritual Seeker'}
              </h1>
              <p className="text-gray-400 mb-4 flex items-center gap-2 justify-center md:justify-start">
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
                  <div className="text-xs text-gray-400">Karma Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {profile.karmaMeter?.points || 0}
                  </div>
                  <div className="text-xs text-gray-400">Karma Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {profile.stats?.scripturesRead || 0}
                  </div>
                  <div className="text-xs text-gray-400">Scriptures Read</div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button className="bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white/5 border-white/10 backdrop-blur-xl mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="soul-id">Soul ID</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                Personal Information
              </h2>
              
              {profile.registration && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Country</label>
                    <p className="text-white font-medium">{profile.registration.country}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Language</label>
                    <p className="text-white font-medium">{profile.registration.language}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Spiritual Path</label>
                    <p className="text-white font-medium">{profile.registration.religion}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Date of Birth</label>
                    <p className="text-white font-medium">{profile.registration.dateOfBirth}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-sm">Interests</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {profile.registration.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Karma Meter */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Karma Meter
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Level {profile.karmaMeter?.level || 1}</span>
                    <span className="text-white font-bold">{profile.karmaMeter?.points || 0} points</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
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
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Soul ID</h2>
              
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
                    <p className="text-3xl font-mono font-bold text-white mb-2">
                      {profile.soulID.signatureHash}
                    </p>
                    <p className="text-gray-400">Karmic Signature: {profile.soulID.karmicSignature}</p>
                  </div>

                  {profile.soulID.astrology && (
                    <div className="bg-white/5 rounded-2xl p-4">
                      <h3 className="text-white font-bold mb-3">Astrological Profile</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lagna:</span>
                          <span className="text-white">{profile.soulID.astrology.lagna}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rashi:</span>
                          <span className="text-white">{profile.soulID.astrology.rashi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Nakshatra:</span>
                          <span className="text-white">{profile.soulID.astrology.nakshatra}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Soul ID not generated yet</p>
                  <Button asChild>
                    <Link href="/soul-id">Generate Soul ID</Link>
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Activity & Stats
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-1">
                    {profile.stats?.scripturesRead || 0}
                  </div>
                  <div className="text-gray-400 text-sm">Scriptures Read</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {profile.stats?.aiChatSessions || 0}
                  </div>
                  <div className="text-gray-400 text-sm">AI Chat Sessions</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {profile.stats?.totalReadingTime || 0}m
                  </div>
                  <div className="text-gray-400 text-sm">Reading Time</div>
                </div>
              </div>

              <div className="mt-6 text-center text-gray-400">
                <p className="text-sm">More activity tracking coming soon...</p>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-400" />
                Account Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400 text-sm">{profile.email}</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Verified
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-medium">Theme</h3>
                    <p className="text-gray-400 text-sm">Dark mode</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-medium">Language</h3>
                    <p className="text-gray-400 text-sm">{profile.registration?.language || 'English'}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="pt-6">
                  <Button 
                    variant="destructive" 
                    className="w-full"
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
