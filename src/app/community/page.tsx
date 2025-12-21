'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Calendar, BookOpen, Heart, Star, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden py-16 bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518]">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="mb-6 inline-block">
                <Users className="w-20 h-20 text-amber-400 mx-auto" />
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
                Soul Circles
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
                Connect with like-minded seekers, share your spiritual journey, and grow together
              </p>
            </motion.div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <CommunityCard
                icon={MessageCircle}
                title="Discussion Forums"
                description="Engage in meaningful conversations about scriptures, philosophy, and spiritual practices"
                href="#forums"
                gradient="from-blue-500/20 to-cyan-500/20"
                borderColor="border-blue-500/30"
              />

              <CommunityCard
                icon={Calendar}
                title="Live Events"
                description="Join virtual satsangs, meditation sessions, and scripture study groups"
                href="#events"
                gradient="from-purple-500/20 to-pink-500/20"
                borderColor="border-purple-500/30"
              />

              <CommunityCard
                icon={BookOpen}
                title="Study Groups"
                description="Collaborate with others to explore ancient texts and wisdom traditions"
                href="#study-groups"
                gradient="from-amber-500/20 to-orange-500/20"
                borderColor="border-amber-500/30"
              />

              <CommunityCard
                icon={Heart}
                title="Finding Your Circle"
                description="Discover communities based on your Soul ID, interests, and spiritual path"
                href="#circles"
                gradient="from-pink-500/20 to-rose-500/20"
                borderColor="border-pink-500/30"
              />

              <CommunityCard
                icon={Globe}
                title="Global Sangha"
                description="Connect with seekers worldwide in your language and cultural context"
                href="#global"
                gradient="from-green-500/20 to-emerald-500/20"
                borderColor="border-green-500/30"
              />

              <CommunityCard
                icon={Shield}
                title="Safe Space"
                description="Community guidelines ensure respectful, authentic spiritual dialogue"
                href="#guidelines"
                gradient="from-indigo-500/20 to-blue-500/20"
                borderColor="border-indigo-500/30"
              />

            </div>
          </div>
        </section>

        {/* Featured Circles */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Soul Circles</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <CircleCard
                title="Bhagavad Gita Study"
                members="1,234"
                description="Weekly discussions on Krishna's teachings to Arjuna"
                tags={["Philosophy", "Vedanta", "Karma Yoga"]}
              />
              
              <CircleCard
                title="Meditation Practitioners"
                members="892"
                description="Daily group meditation sessions and technique sharing"
                tags={["Meditation", "Mindfulness", "Pranayama"]}
              />
              
              <CircleCard
                title="Sanskrit Learners"
                members="567"
                description="Learn to read and chant ancient texts in their original language"
                tags={["Language", "Mantras", "Chanting"]}
              />
              
              <CircleCard
                title="Ayurveda & Wellness"
                members="1,045"
                description="Holistic health practices rooted in ancient wisdom"
                tags={["Ayurveda", "Health", "Lifestyle"]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with thousands of spiritual seekers worldwide and deepen your practice together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                Create Your Circle
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Browse Communities
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

function CommunityCard({
  icon: Icon,
  title,
  description,
  href,
  gradient,
  borderColor
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  gradient: string;
  borderColor: string;
}) {
  return (
    <Link href={href}>
      <Card className={`p-6 h-full bg-gradient-to-br ${gradient} backdrop-blur-sm border ${borderColor} hover:border-white/30 transition-all duration-300 hover:scale-105 group cursor-pointer`}>
        <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </Card>
    </Link>
  );
}

function CircleCard({
  title,
  members,
  description,
  tags
}: {
  title: string;
  members: string;
  description: string;
  tags: string[];
}) {
  return (
    <Card className="p-6 bg-white/5 border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center gap-1 text-amber-400">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{members}</span>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}
