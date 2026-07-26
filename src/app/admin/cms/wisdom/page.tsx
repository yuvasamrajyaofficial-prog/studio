'use client';

import React, { useEffect, useState } from 'react';
import { 
  Sparkles, Calendar, Plus, Search,
  Trash2, Clock, BookOpen, CheckCircle2,
  Loader2, Quote, Flame
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  getAllWisdomEntries, 
  createWisdomEntry, 
  deleteWisdomEntry, 
  WisdomEntry 
} from '@/lib/admin/wisdom-actions';

export default function WisdomScheduler() {
  const [entries, setEntries] = useState<WisdomEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // New Form State
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [sadhana, setSadhana] = useState('');
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const data = await getAllWisdomEntries();
      setEntries(data);
    } catch (error) {
      console.error('Failed to load wisdom entries:', error);
      toast({ title: 'Error', description: 'Failed to load wisdom items.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim()) {
      toast({ title: 'Validation Error', description: 'Quote text is required.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      await createWisdomEntry({
        quote,
        author: author || 'Ancient Vedic Wisdom',
        source,
        sadhana,
        publishDate,
        published: true,
      });

      toast({ title: 'Success', description: 'Daily Wisdom scheduled successfully!' });
      
      // Reset Form
      setQuote('');
      setAuthor('');
      setSource('');
      setSadhana('');
      setIsDialogOpen(false);

      // Refresh list
      loadEntries();
    } catch (error) {
      console.error('Failed to schedule wisdom:', error);
      toast({ title: 'Error', description: 'Failed to save wisdom entry.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this wisdom entry?')) return;
    try {
      await deleteWisdomEntry(id);
      toast({ title: 'Deleted', description: 'Wisdom entry deleted.' });
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete wisdom:', error);
      toast({ title: 'Error', description: 'Failed to delete entry.', variant: 'destructive' });
    }
  };

  const filteredEntries = entries.filter(e => {
    const query = searchQuery.toLowerCase();
    return e.quote.toLowerCase().includes(query) || (e.author || '').toLowerCase().includes(query) || (e.sadhana || '').toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Daily Wisdom & Sadhanas</h2>
          <p className="text-muted-foreground">Schedule daily spiritual quotes, source shlokas, and sadhana prompts</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border/50 text-foreground max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Schedule Daily Wisdom</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input 
                  type="date" 
                  value={publishDate} 
                  onChange={e => setPublishDate(e.target.value)}
                  className="bg-muted/20 border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Spiritual Quote / Verse</Label>
                <Textarea 
                  placeholder="e.g. You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
                  value={quote}
                  onChange={e => setQuote(e.target.value)}
                  className="bg-muted/20 border-border/50 h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author / Speaker</Label>
                  <Input 
                    placeholder="e.g. Lord Krishna"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="bg-muted/20 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Scripture Source</Label>
                  <Input 
                    placeholder="e.g. Bhagavad Gita 2.47"
                    value={source}
                    onChange={e => setSource(e.target.value)}
                    className="bg-muted/20 border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Daily Sadhana Practice Prompt (Optional)</Label>
                <Textarea 
                  placeholder="e.g. Practice 5 minutes of mindful Nadi Shodhana breathing before starting your workday."
                  value={sadhana}
                  onChange={e => setSadhana(e.target.value)}
                  className="bg-muted/20 border-border/50 h-20"
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Save & Schedule Wisdom
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search scheduled wisdom by quote, author, or sadhana..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/20 border-border/50 text-foreground"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading wisdom scheduler...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="bg-card/50 border-border/50 text-foreground p-6 flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Calendar className="w-4 h-4" />
                    {entry.publishDate}
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Active
                  </Badge>
                </div>

                <div className="relative pl-6 border-l-2 border-primary/40 mb-4 italic text-foreground/90">
                  <Quote className="w-4 h-4 text-primary/40 absolute -left-2.5 top-0 bg-background rounded-full" />
                  "{entry.quote}"
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="font-semibold text-foreground">{entry.author || 'Ancient Wisdom'}</span>
                  {entry.source && (
                    <>
                      <span>•</span>
                      <span className="text-primary">{entry.source}</span>
                    </>
                  )}
                </div>

                {entry.sadhana && (
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs text-foreground/80 flex items-start gap-2 mb-4">
                    <Flame className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-accent">Daily Sadhana: </span>
                      {entry.sadhana}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2 border-t border-border/40 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(entry.id)}
                  className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Entry
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredEntries.length === 0 && (
        <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border/40">
          <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No wisdom entries scheduled</h3>
          <p className="text-muted-foreground text-sm">
            {searchQuery ? "No entries match your search." : "Schedule daily quotes and sadhanas for seekers."}
          </p>
        </div>
      )}
    </div>
  );
}
