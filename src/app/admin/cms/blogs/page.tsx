'use client';

import React from 'react';
import { 
  FileText, Plus, Search, Filter,
  MoreVertical, Edit, Trash2, Eye,
  ArrowUpRight, MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const MOCK_BLOGS = [
  { id: '1', title: 'The Power of Meditation', author: 'Admin', date: '2023-11-20', status: 'published' },
  { id: '2', title: 'Understanding Dharma', author: 'Admin', date: '2023-11-22', status: 'published' },
  { id: '3', title: 'Ayurvedic Daily Routine', author: 'Admin', date: '2023-11-25', status: 'draft' },
];

export default function BlogManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Blogs & Articles</h2>
          <p className="text-muted-foreground">Manage your content and stories</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/cms/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Link>
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-10 bg-muted/20 border-border/50 text-foreground"
          />
        </div>
        <Button variant="outline" className="border-border/50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_BLOGS.map((blog) => (
          <Card key={blog.id} className="bg-card/50 border-border/50 text-foreground p-4 hover:bg-muted/20 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{blog.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge variant="outline" className={
                  blog.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                }>
                  {blog.status}
                </Badge>
                <div className="flex gap-2">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/cms/blogs/${blog.id}`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
