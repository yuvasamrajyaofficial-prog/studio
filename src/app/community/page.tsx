'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PostComposer } from '@/components/community/post-composer';
import { PostCard } from '@/components/community/post-card';
import { Button } from '@/components/ui/button';
import { getPosts } from '@/lib/community/actions';
import { Post } from '@/types/community';
import { Loader2, Users, Flame, Hash } from 'lucide-react';

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'General', 'Scriptures', 'Meditation', 'Life Advice', 'Philosophy'];

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getPosts(20, activeTag === 'All' ? undefined : activeTag);
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [activeTag]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Navigation */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-card/50 border-border/50 rounded-xl p-4 sticky top-24">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />
                  Popular Tags
                </h3>
                <div className="space-y-2">
                  {tags.map(tag => (
                    <Button
                      key={tag}
                      variant={activeTag === tag ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTag(tag)}
                    >
                      <Hash className="w-4 h-4 mr-2 opacity-70" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold font-serif mb-2">Soul Circles</h1>
                <p className="text-muted-foreground">Share your journey, ask questions, and connect with fellow seekers.</p>
              </div>

              {/* Mobile Tag Filter */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                 {tags.map(tag => (
                    <Button
                      key={tag}
                      size="sm"
                      variant={activeTag === tag ? "secondary" : "outline"}
                      className="whitespace-nowrap"
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
              </div>

              <PostComposer />

              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : posts.length > 0 ? (
                  posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No posts found. Be the first to share!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Info */}
            <div className="hidden lg:block space-y-6">
              <div className="bg-card/50 border-border/50 rounded-xl p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Community Rules</h3>
                  </div>
                </div>
                <ul className="text-sm space-y-3 text-muted-foreground list-disc pl-4">
                  <li>Be respectful and kind to others.</li>
                  <li>Keep discussions spiritual and constructive.</li>
                  <li>No spam or self-promotion.</li>
                  <li>Respect diverse viewpoints.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
