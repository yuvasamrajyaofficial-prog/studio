'use client';

import React, { useEffect, useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter,
  Edit, Trash2, Eye, FileText, Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllScriptures, deleteScripture } from '@/lib/admin/scripture-actions';
import { Scripture } from '@/types/scripture';
import { useToast } from '@/hooks/use-toast';

export default function ScriptureManagement() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadScriptures();
  }, []);

  const loadScriptures = async () => {
    setLoading(true);
    try {
      const data = await getAllScriptures();
      setScriptures(data);
    } catch (error) {
      console.error('Failed to load scriptures:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scriptures from database.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (!confirm(`Are you sure you want to delete "${titleStr}"? All associated chapters and verses will need to be cleaned up.`)) {
      return;
    }

    try {
      await deleteScripture(id);
      toast({
        title: 'Success',
        description: 'Scripture deleted successfully.',
      });
      // Refresh list
      setScriptures(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete scripture:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete scripture.',
        variant: 'destructive',
      });
    }
  };

  const filteredScriptures = scriptures.filter(s => {
    const titleVal = s.title?.en || '';
    const traditionVal = s.tradition || '';
    const query = searchQuery.toLowerCase();
    return titleVal.toLowerCase().includes(query) || traditionVal.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Scriptures</h2>
          <p className="text-muted-foreground">Manage sacred texts, translations, and media attachments</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/admin/cms/scriptures/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Scripture
          </Link>
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search scriptures by title or tradition..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/20 border-border/50 text-foreground"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading scriptures from Firestore...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScriptures.map((scripture) => {
            const titleStr = scripture.title?.en || scripture.id;
            return (
              <Card key={scripture.id} className="bg-card/50 border-border/50 text-foreground overflow-hidden group hover:border-primary/50 transition-colors flex flex-col justify-between">
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      {scripture.tradition && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {scripture.tradition}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 line-clamp-2">{titleStr}</h3>
                    {scripture.author && (
                      <p className="text-sm text-muted-foreground mb-4">By {scripture.author}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1 font-medium">
                        <FileText className="w-4 h-4 text-primary/70" />
                        {scripture.totalChapters || 0} Chapters
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button asChild variant="outline" className="flex-1 border-border/50">
                      <Link href={`/admin/cms/scriptures/${scripture.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(scripture.id, titleStr)}
                      className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && filteredScriptures.length === 0 && (
        <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border/40">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No scriptures found</h3>
          <p className="text-muted-foreground text-sm">
            {searchQuery ? "Try checking spelling or adjusting search filters." : "Get started by adding your first scripture."}
          </p>
        </div>
      )}
    </div>
  );
}
