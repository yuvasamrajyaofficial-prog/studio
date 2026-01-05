'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  getChapters, 
  updateChapter, 
  getVerses, 
  createVerse, 
  updateVerse, 
  deleteVerse 
} from '@/lib/admin/scripture-actions';
import { Chapter, Verse } from '@/types/scripture';

export default function ChapterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const scriptureId = params.id as string;
  const chapterId = params.chapterId as string;

  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState<Partial<Chapter>>({});
  const [verses, setVerses] = useState<Verse[]>([]);
  const [expandedVerse, setExpandedVerse] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [scriptureId, chapterId]);

  const loadData = async () => {
    try {
      const allChapters = await getChapters(scriptureId);
      const currentChapter = allChapters.find(c => c.id === chapterId);
      if (currentChapter) setChapter(currentChapter);

      const vData = await getVerses(scriptureId, chapterId);
      setVerses(vData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({ title: "Error", description: "Failed to load chapter data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChapter = async () => {
    try {
      await updateChapter(scriptureId, chapterId, chapter);
      toast({ title: "Success", description: "Chapter details updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save chapter.", variant: "destructive" });
    }
  };

  const handleAddVerse = async () => {
    const newNumber = verses.length + 1;
    try {
      const id = await createVerse(scriptureId, chapterId, {
        number: newNumber,
        text: { original: '', transliteration: '' },
        translations: { en: '' }
      });
      
      // Reload verses
      const updatedVerses = await getVerses(scriptureId, chapterId);
      setVerses(updatedVerses);
      setExpandedVerse(id); // Auto-expand new verse
    } catch (error) {
      toast({ title: "Error", description: "Failed to add verse.", variant: "destructive" });
    }
  };

  const handleUpdateVerse = async (verseId: string, data: Partial<Verse>) => {
    try {
      await updateVerse(scriptureId, chapterId, verseId, data);
      // Optimistic update
      setVerses(prev => prev.map(v => v.id === verseId ? { ...v, ...data } as Verse : v));
      toast({ title: "Saved", description: "Verse updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save verse.", variant: "destructive" });
    }
  };

  const handleDeleteVerse = async (verseId: string) => {
    if (!confirm('Delete this verse?')) return;
    try {
      await deleteVerse(scriptureId, chapterId, verseId);
      setVerses(prev => prev.filter(v => v.id !== verseId));
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete verse.", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Edit Chapter {chapter.number}</h2>
          <p className="text-gray-400 text-sm">Manage chapter details and verses</p>
        </div>
      </div>

      {/* Chapter Details */}
      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader>
          <CardTitle>Chapter Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title (English)</Label>
              <Input 
                value={chapter.title?.en} 
                onChange={e => setChapter({...chapter, title: {...chapter.title!, en: e.target.value}})}
                className="bg-slate-900 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (Sanskrit)</Label>
              <Input 
                value={chapter.title?.sa} 
                onChange={e => setChapter({...chapter, title: {...chapter.title!, sa: e.target.value}})}
                className="bg-slate-900 border-white/10 font-devanagari"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea 
              value={chapter.summary?.en} 
              onChange={e => setChapter({...chapter, summary: {...chapter.summary!, en: e.target.value}})}
              className="bg-slate-900 border-white/10 h-20"
            />
          </div>
          <Button onClick={handleSaveChapter} className="w-full bg-purple-600 hover:bg-purple-700">
            Save Chapter Details
          </Button>
        </CardContent>
      </Card>

      {/* Verses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Verses ({verses.length})</h3>
          <Button onClick={handleAddVerse} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Plus className="w-4 h-4 mr-2" />
            Add Verse
          </Button>
        </div>

        <div className="space-y-4">
          {verses.map((verse) => (
            <Card key={verse.id} className="bg-white/5 border-white/10 text-white overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedVerse(expandedVerse === verse.id ? null : verse.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-amber-400 font-bold">Verse {verse.number}</span>
                  <span className="text-sm text-gray-400 truncate max-w-md">
                    {verse.text.original?.substring(0, 50)}...
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {expandedVerse === verse.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedVerse === verse.id && (
                <CardContent className="p-4 pt-0 space-y-4 border-t border-white/10 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Original Text (Sanskrit)</Label>
                      <Textarea 
                        value={verse.text.original} 
                        onChange={e => handleUpdateVerse(verse.id, { text: { ...verse.text, original: e.target.value } })}
                        className="bg-slate-900 border-white/10 font-devanagari h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Transliteration</Label>
                      <Textarea 
                        value={verse.text.transliteration} 
                        onChange={e => handleUpdateVerse(verse.id, { text: { ...verse.text, transliteration: e.target.value } })}
                        className="bg-slate-900 border-white/10 h-24"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Translation (English)</Label>
                    <Textarea 
                      value={verse.translations.en} 
                      onChange={e => handleUpdateVerse(verse.id, { translations: { ...verse.translations, en: e.target.value } })}
                      className="bg-slate-900 border-white/10 h-20"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={(e) => { e.stopPropagation(); handleDeleteVerse(verse.id); }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Verse
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
