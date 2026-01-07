'use client';

import React from 'react';
import { 
  BookOpen, Plus, Search, Filter,
  MoreVertical, Edit, Trash2, Eye,
  ArrowUpRight, FileText
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const MOCK_SCRIPTURES = [
  { id: 'bhagavad-gita', title: 'Bhagavad Gita', category: 'Smriti', chapters: 18, status: 'published' },
  { id: 'upanishads', title: 'Upanishads', category: 'Shruti', chapters: 108, status: 'draft' },
  { id: 'yoga-sutras', title: 'Yoga Sutras', category: 'Darshana', chapters: 4, status: 'published' },
  { id: 'ramayana', title: 'Ramayana', category: 'Itihasa', chapters: 7, status: 'published' },
];

export default function ScriptureManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Scriptures</h2>
          <p className="text-muted-foreground">Manage sacred texts and translations</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Scripture
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search scriptures..." 
            className="pl-10 bg-muted/20 border-border/50 text-foreground"
          />
        </div>
        <Button variant="outline" className="border-border/50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SCRIPTURES.map((scripture) => (
          <Card key={scripture.id} className="bg-card/50 border-border/50 text-foreground overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className={
                  scripture.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                }>
                  {scripture.status}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{scripture.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{scripture.category}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {scripture.chapters} Chapters
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1 border-border/50">
                  <Link href={`/admin/cms/scriptures/${scripture.id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {MOCK_SCRIPTURES.length === 0 && (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-border/50">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No scriptures found</h3>
          <p className="text-muted-foreground">Get started by adding your first sacred text.</p>
        </div>
      )}
    </div>
  );
}
