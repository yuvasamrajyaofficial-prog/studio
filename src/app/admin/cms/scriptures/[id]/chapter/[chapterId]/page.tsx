'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp, Loader2, Volume2, BookOpen, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getChapters, 
  updateChapter, 
  getVerses, 
  createVerse, 
  updateVerse, 
  deleteVerse 
} from '@/lib/admin/scripture-actions';
import { recalculateScriptureCounts } from '@/lib/scriptures/actions';
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
  const [savingChapter, setSavingChapter] = useState(false);

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
    setSavingChapter(true);
    try {
      await updateChapter(scriptureId, chapterId, chapter);
      await recalculateScriptureCounts(scriptureId);
      toast({ title: "Success", description: "Chapter details updated." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save chapter.", variant: "destructive" });
    } finally {
      setSavingChapter(false);
    }
  };

  const handleAddVerse = async () => {
    const newNumber = verses.length + 1;
    try {
      const id = await createVerse(scriptureId, chapterId, {
        number: newNumber,
        text: { original: '', transliteration: '' },
        translations: { en: '', kn: '', hi: '' },
        meaning: '',
        audioUrl: '',
        commentary: { en: '', kn: '', hi: '' }
      });
      
      await recalculateScriptureCounts(scriptureId);
      const updatedVerses = await getVerses(scriptureId, chapterId);
      setVerses(updatedVerses);
      setExpandedVerse(id);
      toast({ title: "Success", description: `Verse ${newNumber} added.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add verse.", variant: "destructive" });
    }
  };

  const handleUpdateVerse = async (verseId: string, data: Partial<Verse>) => {
    try {
      await updateVerse(scriptureId, chapterId, verseId, data);
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
      await recalculateScriptureCounts(scriptureId);
      setVerses(prev => prev.filter(v => v.id !== verseId));
      toast({ title: "Deleted", description: "Verse removed." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete verse.", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 pt-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Edit Chapter {chapter.number} Content</h2>
          <p className="text-muted-foreground text-sm">Manage verses in Kannada (ಕನ್ನಡ), English, and Hindi (हिंदी)</p>
        </div>
      </div>

      {/* Chapter Details */}
      <Card className="bg-card/50 border-border/50 text-foreground">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Chapter Meta & Multi-Language Titles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Title (Kannada - ಕನ್ನಡ)</Label>
              <Input 
                value={chapter.title?.kn || ''} 
                onChange={e => setChapter({...chapter, title: {...chapter.title!, kn: e.target.value}})}
                className="bg-muted/20 border-border/50"
                placeholder="ಉದಾ: ಸಂಖ್ಯಾ ಯೋಗ"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (English)</Label>
              <Input 
                value={chapter.title?.en || ''} 
                onChange={e => setChapter({...chapter, title: {...chapter.title!, en: e.target.value}})}
                className="bg-muted/20 border-border/50"
                placeholder="e.g. Sankhya Yoga"
              />
            </div>
            <div className="space-y-2">
              <Label>Title (Sanskrit / Hindi)</Label>
              <Input 
                value={chapter.title?.sa || chapter.title?.hi || ''} 
                onChange={e => setChapter({...chapter, title: {...chapter.title!, sa: e.target.value}})}
                className="bg-muted/20 border-border/50 font-devanagari"
                placeholder="सांख्य योग"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Chapter Summary (Kannada / English)</Label>
            <Textarea 
              value={chapter.summary?.kn || chapter.summary?.en || ''} 
              onChange={e => setChapter({...chapter, summary: {...chapter.summary!, kn: e.target.value}})}
              className="bg-muted/20 border-border/50 h-20"
              placeholder="ಅಧ್ಯಾಯದ ಸಾರಾಂಶ (Chapter Summary)..."
            />
          </div>
          <Button onClick={handleSaveChapter} disabled={savingChapter} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {savingChapter ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Chapter Meta & Recalculate Counts
          </Button>
        </CardContent>
      </Card>

      {/* Verses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">Verses ({verses.length})</h3>
          <Button onClick={handleAddVerse} variant="outline" className="border-border/50 text-foreground hover:bg-muted/20">
            <Plus className="w-4 h-4 mr-2" />
            Add Verse
          </Button>
        </div>

        <div className="space-y-4">
          {verses.map((verse) => (
            <Card key={verse.id} className="bg-card/50 border-border/50 text-foreground overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/20 transition-colors"
                onClick={() => setExpandedVerse(expandedVerse === verse.id ? null : verse.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-primary font-bold">Verse {verse.number}</span>
                  <span className="text-sm text-muted-foreground truncate max-w-md">
                    {verse.text.original ? verse.text.original.substring(0, 45) + '...' : '(Empty Verse Shloka)'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {expandedVerse === verse.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedVerse === verse.id && (
                <CardContent className="p-4 pt-0 space-y-4 border-t border-border/50 mt-4">
                  {/* Original Shloka & Transliteration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Original Shloka (Sanskrit / Kannada / Devanagari Script)</Label>
                      <Textarea 
                        value={verse.text.original || ''} 
                        onChange={e => handleUpdateVerse(verse.id, { text: { ...verse.text, original: e.target.value } })}
                        className="bg-muted/20 border-border/50 font-devanagari h-28"
                        placeholder="e.g. नैनं छिन्दन्ति शस्त्राणि..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Transliteration (Latin Script)</Label>
                      <Textarea 
                        value={verse.text.transliteration || ''} 
                        onChange={e => handleUpdateVerse(verse.id, { text: { ...verse.text, transliteration: e.target.value } })}
                        className="bg-muted/20 border-border/50 h-28"
                        placeholder="e.g. nainam chhindanti shastrani..."
                      />
                    </div>
                  </div>

                  {/* Multi-Language Translations */}
                  <div className="space-y-3 p-4 bg-muted/10 rounded-xl border border-border/40">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Multi-Language Translations
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-amber-400 font-bold">Kannada Translation (ಕನ್ನಡ)</Label>
                        <Textarea 
                          value={verse.translations.kn || ''} 
                          onChange={e => handleUpdateVerse(verse.id, { translations: { ...verse.translations, kn: e.target.value } })}
                          className="bg-muted/20 border-border/50 h-24 text-sm"
                          placeholder="ಆತ್ಮವನ್ನು ಆಯುಧಗಳು ಕತ್ತರಿಸಲಾರವು..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-blue-400 font-bold">English Translation</Label>
                        <Textarea 
                          value={verse.translations.en || ''} 
                          onChange={e => handleUpdateVerse(verse.id, { translations: { ...verse.translations, en: e.target.value } })}
                          className="bg-muted/20 border-border/50 h-24 text-sm"
                          placeholder="Weapons cannot cleave the soul..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-orange-400 font-bold">Hindi Translation (हिंदी)</Label>
                        <Textarea 
                          value={verse.translations.hi || ''} 
                          onChange={e => handleUpdateVerse(verse.id, { translations: { ...verse.translations, hi: e.target.value } })}
                          className="bg-muted/20 border-border/50 h-24 text-sm"
                          placeholder="अस्त्र-शस्त्र आत्मा को काट नहीं सकते..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-Language Commentaries / Bhashya */}
                  <div className="space-y-3 p-4 bg-purple-500/5 rounded-xl border border-purple-500/20">
                    <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Philosophical Commentary / Bhashya (ಭಾಷ್ಯ)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-purple-300">Kannada Commentary (ಕನ್ನಡ ಭಾಷ್ಯ)</Label>
                        <Textarea 
                          value={verse.commentary?.kn || ''} 
                          onChange={e => handleUpdateVerse(verse.id, { commentary: { ...verse.commentary, kn: e.target.value } })}
                          className="bg-muted/20 border-border/50 h-28 text-sm"
                          placeholder="ಜ್ಞಾನಿಗಳ ಆಳವಾದ ತಾತ್ಪರ್ಯ ವಿವರಣೆ..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-purple-300">English Commentary (Bhashya)</Label>
                        <Textarea 
                          value={verse.commentary?.en || ''} 
                          onChange={e => handleUpdateVerse(verse.id, { commentary: { ...verse.commentary, en: e.target.value } })}
                          className="bg-muted/20 border-border/50 h-28 text-sm"
                          placeholder="Detailed philosophical commentary..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recitation Audio */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      Audio Recitation MP3 URL (ಶ್ರವಣ ಧ್ವನಿ)
                    </Label>
                    <Input 
                      value={verse.audioUrl || ''} 
                      onChange={e => handleUpdateVerse(verse.id, { audioUrl: e.target.value })}
                      className="bg-muted/20 border-border/50"
                      placeholder="https://example.com/audio/gita-ch2-v23.mp3"
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
