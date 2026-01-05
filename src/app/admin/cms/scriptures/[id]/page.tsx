'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  getScriptureById, 
  updateScripture, 
  createScripture, 
  getChapters, 
  createChapter, 
  deleteChapter 
} from '@/lib/admin/scripture-actions';
import { Scripture, Chapter } from '@/types/scripture';
import Link from 'next/link';

export default function ScriptureEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [scripture, setScripture] = useState<Partial<Scripture>>({
    title: { en: '', sa: '', hi: '' },
    description: { en: '' },
    languages: ['en', 'sa'],
    tags: [],
  });
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (!isNew && params.id) {
      loadData(params.id as string);
    }
  }, [params.id, isNew]);

  const loadData = async (id: string) => {
    try {
      const [sData, cData] = await Promise.all([
        getScriptureById(id),
        getChapters(id)
      ]);
      
      if (sData) setScripture(sData);
      if (cData) setChapters(cData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({ title: "Error", description: "Failed to load scripture data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (isNew) {
        const id = await createScripture(scripture);
        toast({ title: "Success", description: "Scripture created successfully." });
        router.push(`/admin/cms/scriptures/${id}`);
      } else {
        await updateScripture(params.id as string, scripture);
        toast({ title: "Success", description: "Scripture updated successfully." });
      }
    } catch (error) {
      console.error('Failed to save:', error);
      toast({ title: "Error", description: "Failed to save scripture.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleAddChapter = async () => {
    if (isNew) {
      toast({ title: "Please save first", description: "You must save the scripture before adding chapters.", variant: "destructive" });
      return;
    }

    const newChapterNumber = chapters.length + 1;
    try {
      const id = await createChapter(params.id as string, {
        number: newChapterNumber,
        title: { en: `Chapter ${newChapterNumber}` },
        summary: { en: '' },
        versesCount: 0,
        order: newChapterNumber
      });
      
      // Reload chapters
      const updatedChapters = await getChapters(params.id as string);
      setChapters(updatedChapters);
      
      toast({ title: "Success", description: "Chapter added." });
    } catch (error) {
      console.error('Failed to add chapter:', error);
      toast({ title: "Error", description: "Failed to add chapter.", variant: "destructive" });
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (!confirm('Delete this chapter and all its verses?')) return;
    
    try {
      await deleteChapter(params.id as string, chapterId);
      setChapters(prev => prev.filter(c => c.id !== chapterId));
      toast({ title: "Success", description: "Chapter deleted." });
    } catch (error) {
      console.error('Failed to delete chapter:', error);
      toast({ title: "Error", description: "Failed to delete chapter.", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-white">
            {isNew ? 'New Scripture' : scripture.title?.en || 'Edit Scripture'}
          </h2>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chapters" disabled={isNew}>Chapters</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input 
                    value={scripture.title?.en} 
                    onChange={e => setScripture({...scripture, title: {...scripture.title!, en: e.target.value}})}
                    className="bg-slate-900 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title (Sanskrit)</Label>
                  <Input 
                    value={scripture.title?.sa} 
                    onChange={e => setScripture({...scripture, title: {...scripture.title!, sa: e.target.value}})}
                    className="bg-slate-900 border-white/10 font-devanagari"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Slug (URL Identifier)</Label>
                <Input 
                  value={scripture.slug} 
                  onChange={e => setScripture({...scripture, slug: e.target.value})}
                  className="bg-slate-900 border-white/10"
                  placeholder="e.g., bhagavad-gita"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={scripture.description?.en} 
                  onChange={e => setScripture({...scripture, description: {...scripture.description!, en: e.target.value}})}
                  className="bg-slate-900 border-white/10 h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input 
                    value={scripture.author} 
                    onChange={e => setScripture({...scripture, author: e.target.value})}
                    className="bg-slate-900 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image URL</Label>
                  <Input 
                    value={scripture.coverImage} 
                    onChange={e => setScripture({...scripture, coverImage: e.target.value})}
                    className="bg-slate-900 border-white/10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Button onClick={handleAddChapter} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Chapter
            </Button>
          </div>

          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center text-sm font-bold">
                    {chapter.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{chapter.title.en}</h4>
                    <p className="text-xs text-gray-400">{chapter.versesCount} verses</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/admin/cms/scriptures/${params.id}/chapter/${chapter.id}`}>
                      Edit Content
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDeleteChapter(chapter.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {chapters.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No chapters yet. Click "Add Chapter" to begin.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
