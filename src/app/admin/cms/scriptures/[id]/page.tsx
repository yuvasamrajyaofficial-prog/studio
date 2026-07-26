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
import { useToast } from '@/hooks/use-toast';
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

// Firebase media & storage imports
import { 
  getMediaItemsByScripture, 
  createMediaItem, 
  updateMediaItem, 
  deleteMediaItem, 
  type MediaItem 
} from '@/lib/firebase/media';
import { uploadMediaFile, deleteFile } from '@/lib/firebase/storage';
import { FileText, Eye, Download } from 'lucide-react';

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

  // Media states
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'pdf'>('pdf');
  const [mediaOrderIndex, setMediaOrderIndex] = useState(1);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);

  useEffect(() => {
    if (!isNew && params.id) {
      loadData(params.id as string);
    }
  }, [params.id, isNew]);

  const loadData = async (id: string) => {
    try {
      setLoadingMedia(true);
      const [sData, cData, mData] = await Promise.all([
        getScriptureById(id),
        getChapters(id),
        getMediaItemsByScripture(id)
      ]);
      
      if (sData) setScripture(sData);
      if (cData) setChapters(cData);
      if (mData) {
        setMediaItems(mData);
        if (mData.length > 0) {
          const nextOrder = Math.max(...mData.map(item => item.orderIndex || 0)) + 1;
          setMediaOrderIndex(nextOrder);
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({ title: "Error", description: "Failed to load scripture data.", variant: "destructive" });
    } finally {
      setLoading(false);
      setLoadingMedia(false);
    }
  };

  const handleMediaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setMediaFile(selectedFile);
      
      if (selectedFile.type.startsWith('video/')) {
        setMediaType('video');
      } else if (selectedFile.type.startsWith('image/')) {
        setMediaType('image');
      } else if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setMediaType('pdf');
      }
      
      if (!mediaTitle) {
        setMediaTitle(selectedFile.name.split('.').slice(0, -1).join('.'));
      }
    }
  };

  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.id) return;
    if (!mediaFile) {
      toast({ title: "Validation Error", description: "Please choose a file to upload.", variant: "destructive" });
      return;
    }
    if (!mediaTitle.trim()) {
      toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
      return;
    }

    setMediaUploading(true);
    try {
      toast({ title: "Uploading File", description: "Storage upload in progress..." });
      const fileUrl = await uploadMediaFile(mediaFile);
      
      const decodedUrl = decodeURIComponent(fileUrl);
      const parts = decodedUrl.split('/o/');
      const storagePath = parts.length > 1 ? parts[1].split('?')[0] : `media-vault/${Date.now()}-${mediaFile.name.replace(/\s+/g, '_')}`;

      await createMediaItem({
        title: mediaTitle,
        description: mediaDescription,
        fileUrl,
        storagePath,
        fileType: mediaType,
        fileName: mediaFile.name,
        orderIndex: Number(mediaOrderIndex),
        scriptureId: params.id as string
      });

      toast({ title: "Upload Success", description: "File uploaded successfully." });
      
      // Reset Media Form
      setMediaTitle('');
      setMediaDescription('');
      setMediaType('pdf');
      setMediaFile(null);
      
      const fileInput = document.getElementById('scripture-pdf-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Reload Media list
      const updatedMedia = await getMediaItemsByScripture(params.id as string);
      setMediaItems(updatedMedia);
      if (updatedMedia.length > 0) {
        const nextOrder = Math.max(...updatedMedia.map(item => item.orderIndex || 0)) + 1;
        setMediaOrderIndex(nextOrder);
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast({ title: "Upload Failed", description: "Failed to upload file to storage.", variant: "destructive" });
    } finally {
      setMediaUploading(false);
    }
  };

  const handleMediaDelete = async (itemId: string, fileUrl: string, storagePath?: string) => {
    if (!confirm('Are you sure you want to permanently delete this media file?')) return;
    
    try {
      await deleteMediaItem(itemId);
      
      let pathToDelete = storagePath;
      if (!pathToDelete) {
        const decodedUrl = decodeURIComponent(fileUrl);
        const parts = decodedUrl.split('/o/');
        if (parts.length > 1) {
          pathToDelete = parts[1].split('?')[0];
        }
      }
      
      if (pathToDelete) {
        await deleteFile(pathToDelete);
      }
      
      toast({ title: "Deleted", description: "Attachment deleted." });
      
      // Reload Media
      const updatedMedia = await getMediaItemsByScripture(params.id as string);
      setMediaItems(updatedMedia);
    } catch (err) {
      console.error('Delete error:', err);
      toast({ title: "Delete Failed", description: "Failed to delete file.", variant: "destructive" });
    }
  };

  const handleUpdateMediaIndex = async (itemId: string, newOrder: number) => {
    try {
      await updateMediaItem(itemId, { orderIndex: newOrder });
      toast({ title: "Updated Order", description: "Sort index updated." });
      // Reload Media
      const updatedMedia = await getMediaItemsByScripture(params.id as string);
      setMediaItems(updatedMedia);
    } catch (err) {
      console.error(err);
      toast({ title: "Failed", description: "Failed to update item order.", variant: "destructive" });
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
          <h2 className="text-2xl font-bold text-foreground">
            {isNew ? 'New Scripture' : scripture.title?.en || 'Edit Scripture'}
          </h2>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/20 border-border/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chapters" disabled={isNew}>Chapters</TabsTrigger>
          <TabsTrigger value="media" disabled={isNew}>PDF & Media</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card className="bg-card/50 border-border/50 text-foreground">
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
                    className="bg-muted/20 border-border/50"
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
                    className="bg-muted/20 border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image URL</Label>
                  <Input 
                    value={scripture.coverImage} 
                    onChange={e => setScripture({...scripture, coverImage: e.target.value})}
                    className="bg-muted/20 border-border/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-6 mt-6">
          <div className="flex justify-end">
            <Button onClick={handleAddChapter} variant="outline" className="border-border/50 text-foreground hover:bg-muted/20">
              <Plus className="w-4 h-4 mr-2" />
              Add Chapter
            </Button>
          </div>

          <div className="space-y-4">
            {chapters.map((chapter) => (
              <div 
                key={chapter.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center text-sm font-bold">
                    {chapter.number}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{chapter.title.en}</h4>
                    <p className="text-xs text-muted-foreground">{chapter.versesCount} verses</p>
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

        <TabsContent value="media" className="space-y-6 mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upload File Form */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-1 h-fit text-foreground">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-500" />
                  Attach PDF or Media
                </CardTitle>
              </CardHeader>
              
              <form onSubmit={handleMediaUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    placeholder="e.g. Sanskrit text copy of this Scripture"
                    className="bg-muted/20 border-border/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={mediaDescription}
                    onChange={(e) => setMediaDescription(e.target.value)}
                    placeholder="Explain the document contents..."
                    rows={2}
                    className="bg-muted/20 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media Type</Label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full text-sm bg-muted/20 border border-border/50 rounded-lg p-2.5 outline-none focus:border-purple-500 text-foreground"
                  >
                    <option value="pdf">Sanskrit Text PDF / E-Book</option>
                    <option value="image">Image / Graphic Diagram</option>
                    <option value="video">AI Generated Video</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Order Index</Label>
                    <Input
                      type="number"
                      value={mediaOrderIndex}
                      onChange={(e) => setMediaOrderIndex(Number(e.target.value))}
                      min="0"
                      className="bg-muted/20 border-border/50"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col justify-end">
                    <span className="text-xs text-muted-foreground mb-2">Used for sorting.</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="block">Choose File</Label>
                  <Input
                    id="scripture-pdf-input"
                    type="file"
                    onChange={handleMediaFileChange}
                    accept="application/pdf,image/*,video/*"
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-600/20 file:text-purple-400 hover:file:bg-purple-600/30"
                    required
                  />
                  {mediaFile && (
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      Size: {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={mediaUploading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 transition-all flex items-center justify-center gap-2"
                >
                  {mediaUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload and Attach'
                  )}
                </Button>
              </form>
            </Card>

            {/* List of attachments */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2 text-foreground">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg font-bold">Attached PDF & Media Resources</CardTitle>
              </CardHeader>

              {loadingMedia ? (
                <div className="py-12 flex justify-center items-center">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : mediaItems.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed border-border/50">
                  No files attached to this scripture yet. Attach your first PDF/resource above.
                </div>
              ) : (
                <div className="space-y-4">
                  {mediaItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50 hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded bg-purple-600/10 flex items-center justify-center text-purple-400">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.fileName} • {item.fileType.toUpperCase()}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground/80 mt-0.5 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">Order:</span>
                          <Input
                            type="number"
                            defaultValue={item.orderIndex}
                            onChange={(e) => handleUpdateMediaIndex(item.id!, Number(e.target.value))}
                            className="w-16 h-8 text-xs bg-muted/30 border-border/50 px-2 text-center"
                          />
                        </div>
                        <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                          onClick={() => handleMediaDelete(item.id!, item.fileUrl, item.storagePath)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
