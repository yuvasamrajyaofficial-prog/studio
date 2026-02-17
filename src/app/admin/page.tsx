'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, MessageSquare, TrendingUp, 
  Activity, Shield, Bell, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertCircle, Database, LayoutDashboard,
  FileText
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { toast } from "sonner";

// Content Management Components
import { ScriptureForm } from "@/components/admin/scripture-form";
import { ChapterList } from "@/components/admin/chapter-list";
import { VerseManager } from "@/components/admin/verse-manager";
import { BlogForm } from "@/components/admin/blog-form";
import { BlogList } from "@/components/admin/blog-list";

// Actions & Types
import { 
  getScriptures, createScripture, updateScripture, deleteScripture,
  getChapters, createChapter, deleteChapter,
  getVerses, createVerse, deleteVerse
} from "@/lib/admin/actions";
import { 
  getAllBlogs, createBlog, updateBlog, deleteBlog, BlogPost 
} from "@/lib/admin/blog-actions";
import type { Scripture, Chapter, Verse } from "@/types/schema";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back, Administrator.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50">
            <Clock className="w-4 h-4 mr-2" />
            Last 24h
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Download Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <Database className="w-4 h-4" /> Scriptures
          </TabsTrigger>
          <TabsTrigger value="blogs" className="gap-2">
            <FileText className="w-4 h-4" /> Blogs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <ContentManagementTab />
        </TabsContent>

        <TabsContent value="blogs" className="space-y-6">
          <BlogManagementTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BlogManagementTab() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
      toast.error("Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: Partial<BlogPost>) => {
    try {
      await createBlog(data);
      await loadBlogs();
      setIsEditing(false);
    } catch (error) {
      throw error; // Let form handle it
    }
  };

  const handleUpdate = async (data: Partial<BlogPost>) => {
    if (!selectedBlog?.id) return;
    try {
      await updateBlog(selectedBlog.id, data);
      await loadBlogs();
      setIsEditing(false);
      setSelectedBlog(undefined);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    await loadBlogs();
  };

  if (isEditing) {
    return (
      <Card className="p-6">
        <BlogForm 
          initialData={selectedBlog} 
          onSubmit={selectedBlog ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsEditing(false);
            setSelectedBlog(undefined);
          }}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Blog Posts</h3>
        <Button onClick={() => setIsEditing(true)} className="gap-2">
          <FileText className="w-4 h-4" /> New Post
        </Button>
      </div>

      <Card className="p-6">
        <BlogList 
          blogs={blogs} 
          onEdit={(blog) => {
            setSelectedBlog(blog);
            setIsEditing(true);
          }}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
}

function ContentManagementTab() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [selectedScripture, setSelectedScripture] = useState<Scripture | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [view, setView] = useState<'list' | 'scripture-detail' | 'chapter-detail'>('list');

  // Fetch scriptures on mount
  useEffect(() => {
    loadScriptures();
  }, []);

  const loadScriptures = async () => {
    const data = await getScriptures();
    setScriptures(data as Scripture[]);
  };

  const loadChapters = async (scriptureId: string) => {
    const data = await getChapters(scriptureId);
    setChapters(data as Chapter[]);
  };

  const loadVerses = async (chapterId: string) => {
    const data = await getVerses(chapterId);
    setVerses(data as Verse[]);
  };

  // --- Handlers ---

  const handleCreateScripture = async (data: Partial<Scripture>) => {
    await createScripture(data);
    await loadScriptures();
    setView('list');
  };

  const handleSelectScripture = async (scripture: Scripture) => {
    setSelectedScripture(scripture);
    await loadChapters(scripture.id!);
    setView('scripture-detail');
  };

  const handleCreateChapter = async (data: Partial<Chapter>) => {
    if (!selectedScripture?.id) return;
    await createChapter({ ...data, scriptureId: selectedScripture.id });
    await loadChapters(selectedScripture.id);
  };

  const handleSelectChapter = async (chapter: Chapter) => {
    setSelectedChapter(chapter);
    await loadVerses(chapter.id!);
    setView('chapter-detail');
  };

  const handleCreateVerse = async (data: Partial<Verse>) => {
    if (!selectedScripture?.id || !selectedChapter?.id) return;
    await createVerse({ 
      ...data, 
      scriptureId: selectedScripture.id,
      chapterId: selectedChapter.id 
    });
    await loadVerses(selectedChapter.id);
  };

  // --- Render ---

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">All Scriptures</h3>
          <Button onClick={() => setView('scripture-detail')} className="gap-2">
            <BookOpen className="w-4 h-4" /> New Scripture
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scriptures.map((scripture) => (
            <Card 
              key={scripture.id} 
              className="p-6 cursor-pointer hover:border-primary/50 transition-all group"
              onClick={() => handleSelectScripture(scripture)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                {scripture.isPublished && (
                  <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full font-medium">
                    Published
                  </span>
                )}
              </div>
              <h4 className="font-headline font-bold text-lg mb-1">{scripture.title.en}</h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{scripture.description.en}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">{scripture.category}</span>
                <span>•</span>
                <span>{scripture.yuga}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'scripture-detail') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => {
            setSelectedScripture(null);
            setView('list');
          }}>
            ← Back to List
          </Button>
          <h3 className="text-xl font-bold">
            {selectedScripture ? `Edit: ${selectedScripture.title.en}` : 'New Scripture'}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Metadata</h4>
              <ScriptureForm 
                initialData={selectedScripture || {}} 
                onSubmit={handleCreateScripture} // TODO: Handle update separately
              />
            </Card>
          </div>

          <div className="space-y-8">
            {selectedScripture && (
              <Card className="p-6">
                <ChapterList 
                  chapters={chapters}
                  onAddChapter={handleCreateChapter}
                  onDeleteChapter={async (id) => {
                    await deleteChapter(id);
                    await loadChapters(selectedScripture.id!);
                  }}
                  onSelectChapter={handleSelectChapter}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'chapter-detail') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => {
            setSelectedChapter(null);
            setView('scripture-detail');
          }}>
            ← Back to Scripture
          </Button>
          <div>
            <h3 className="text-xl font-bold">
              Chapter {selectedChapter?.number}: {selectedChapter?.title.en}
            </h3>
            <p className="text-sm text-muted-foreground">{selectedScripture?.title.en}</p>
          </div>
        </div>

        <Card className="p-6">
          <VerseManager 
            verses={verses}
            onAddVerse={handleCreateVerse}
            onDeleteVerse={async (id) => {
              await deleteVerse(id);
              await loadVerses(selectedChapter!.id!);
            }}
          />
        </Card>
      </div>
    );
  }

  return null;
}

function OverviewTab() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="12,482" 
          change="+12%" 
          isPositive={true} 
          icon={Users}
          color="text-blue-500"
        />
        <StatCard 
          title="Active Sessions" 
          value="842" 
          change="+5%" 
          isPositive={true} 
          icon={Activity}
          color="text-green-500"
        />
        <StatCard 
          title="Scripture Reads" 
          value="45.2k" 
          change="-2%" 
          isPositive={false} 
          icon={BookOpen}
          color="text-purple-500"
        />
        <StatCard 
          title="Community Posts" 
          value="1,204" 
          change="+18%" 
          isPositive={true} 
          icon={MessageSquare}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/20">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-bold text-foreground">User_{1000+i}</span> completed a meditation session.
                  </p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="space-y-6">
            <HealthItem title="API Server" status="Operational" isHealthy={true} />
            <HealthItem title="Database" status="Operational" isHealthy={true} />
            <HealthItem title="AI Models" status="High Latency" isHealthy={false} />
            <HealthItem title="Storage" status="Operational" isHealthy={true} />
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-bold text-sm">Security Status</span>
            </div>
            <p className="text-xs text-muted-foreground">All systems are currently protected. No threats detected in the last 24 hours.</p>
          </div>
        </Card>
      </div>
    </>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  return (
    <Card className="bg-card/50 border-border/50 text-foreground p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-muted/20 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
      </div>
    </Card>
  );
}

function HealthItem({ title, status, isHealthy }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {isHealthy ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-500" />
        )}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        isHealthy ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
      }`}>
        {status}
      </span>
    </div>
  );
}
