'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Sparkles, Plus, Edit, List } from 'lucide-react';
import Link from 'next/link';

export default function CMSDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Content Management</h2>
        <p className="text-gray-400">Manage scriptures, blogs, and daily wisdom.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scriptures Card */}
        <Card className="bg-white/5 border-white/10 text-white hover:border-amber-500/50 transition-colors group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>
            <CardTitle>Scriptures</CardTitle>
            <CardDescription className="text-gray-400">
              Manage sacred texts, chapters, and verses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>Total Texts</span>
              <span className="text-white font-bold">12</span>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/admin/cms/scriptures/new">
                <Plus className="w-4 h-4 mr-2" /> Add New Text
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white" asChild>
              <Link href="/admin/cms/scriptures">
                <List className="w-4 h-4 mr-2" /> View Library
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Blogs Card */}
        <Card className="bg-white/5 border-white/10 text-white hover:border-blue-500/50 transition-colors group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <CardTitle>Blogs & Articles</CardTitle>
            <CardDescription className="text-gray-400">
              Publish spiritual insights and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>Published</span>
              <span className="text-white font-bold">45</span>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/admin/cms/blogs/new">
                <Edit className="w-4 h-4 mr-2" /> Write Article
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white" asChild>
              <Link href="/admin/cms/blogs">
                <List className="w-4 h-4 mr-2" /> Manage Posts
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Daily Wisdom Card */}
        <Card className="bg-white/5 border-white/10 text-white hover:border-purple-500/50 transition-colors group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <CardTitle>Daily Wisdom</CardTitle>
            <CardDescription className="text-gray-400">
              Schedule quotes and daily sadhanas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>Scheduled</span>
              <span className="text-white font-bold">7 Days</span>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/admin/cms/wisdom/scheduler">
                <Plus className="w-4 h-4 mr-2" /> Schedule New
              </Link>
            </Button>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-white" asChild>
              <Link href="/admin/cms/wisdom">
                <List className="w-4 h-4 mr-2" /> View Calendar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
