'use client';

import React from 'react';
import { 
  FileText, BookOpen, Sparkles, Layout,
  Plus, ArrowUpRight, MessageSquare,
  Activity, Clock, ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CMS_SECTIONS = [
  {
    title: 'Scriptures',
    description: 'Manage sacred texts, chapters, and verses.',
    icon: BookOpen,
    href: '/admin/cms/scriptures',
    count: '4 Books',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Blogs & Articles',
    description: 'Write and publish spiritual insights.',
    icon: FileText,
    href: '/admin/cms/blogs',
    count: '12 Posts',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Daily Wisdom',
    description: 'Schedule quotes and daily sadhanas.',
    icon: Sparkles,
    href: '/admin/cms/wisdom',
    count: '365 Days',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  }
];

export default function CMSOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Content Management</h2>
          <p className="text-muted-foreground">Manage all platform content from one place.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CMS_SECTIONS.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="bg-card/50 border-border/50 text-foreground hover:bg-muted/20 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {section.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${section.bg} ${section.color}`}>
                  <section.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{section.count}</div>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-xs text-primary font-medium">
                  Manage Section
                  <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-card/50 border-border/50 text-foreground mt-8">
        <CardHeader>
          <CardTitle>Recent Content Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-3 opacity-20" />
            <p>No recent activity to show.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
