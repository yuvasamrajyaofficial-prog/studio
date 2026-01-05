'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, BookOpen, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getAllScriptures, deleteScripture } from '@/lib/admin/scripture-actions';
import { Scripture } from '@/types/scripture';
import { useToast } from '@/components/ui/use-toast';

export default function ScripturesListPage() {
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadScriptures();
  }, []);

  const loadScriptures = async () => {
    try {
      const data = await getAllScriptures();
      setScriptures(data);
    } catch (error) {
      console.error('Failed to load scriptures:', error);
      toast({
        title: "Error",
        description: "Failed to load scriptures.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scripture? This action cannot be undone.')) return;
    
    try {
      await deleteScripture(id);
      setScriptures(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Scripture deleted successfully."
      });
    } catch (error) {
      console.error('Failed to delete scripture:', error);
      toast({
        title: "Error",
        description: "Failed to delete scripture.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Scriptures</h2>
          <p className="text-gray-400">Manage sacred texts and translations</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/cms/scriptures/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Scripture
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scriptures.map((scripture) => (
          <Card key={scripture.id} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:border-purple-500/50 transition-colors">
            <div className="h-40 bg-slate-900 relative">
              {scripture.coverImage ? (
                <img 
                  src={scripture.coverImage} 
                  alt={scripture.title.en} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-900/20">
                  <BookOpen className="w-12 h-12 text-purple-500/50" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleDelete(scripture.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{scripture.title.en}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                {scripture.description.en}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{scripture.author}</span>
                <span>{scripture.totalChapters || 0} Chapters</span>
              </div>
              <Button asChild className="w-full mt-4" variant="outline">
                <Link href={`/admin/cms/scriptures/${scripture.id}`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Manage Content
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {scriptures.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Scriptures Found</h3>
          <p className="text-gray-400 mb-6">Get started by adding your first sacred text.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/cms/scriptures/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Scripture
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
