'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { getBlogById, createBlog, updateBlog, BlogPost } from '@/lib/admin/blog-actions';
import ReactMarkdown from 'react-markdown';

export default function BlogEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isNew = params.id === 'new';
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Admin',
    tags: [],
    published: false,
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!isNew && params.id) {
      loadData(params.id as string);
    }
  }, [params.id, isNew]);

  const loadData = async (id: string) => {
    try {
      const data = await getBlogById(id);
      if (data) setBlog(data);
    } catch (error) {
      console.error('Failed to load blog:', error);
      toast({ title: "Error", description: "Failed to load blog post.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!blog.title || !blog.slug) {
      toast({ title: "Validation Error", description: "Title and Slug are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        const id = await createBlog(blog);
        toast({ title: "Success", description: "Blog post created." });
        router.push(`/admin/cms/blogs/${id}`);
      } else {
        await updateBlog(params.id as string, blog);
        toast({ title: "Success", description: "Blog post updated." });
      }
    } catch (error) {
      console.error('Failed to save:', error);
      toast({ title: "Error", description: "Failed to save blog post.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!blog.tags?.includes(tagInput.trim())) {
        setBlog({ ...blog, tags: [...(blog.tags || []), tagInput.trim()] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlog({ ...blog, tags: blog.tags?.filter(t => t !== tagToRemove) });
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-foreground">
            {isNew ? 'New Article' : 'Edit Article'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-muted/20 px-3 py-2 rounded-lg border border-border/50">
            <Switch 
              checked={blog.published} 
              onCheckedChange={checked => setBlog({...blog, published: checked})} 
            />
            <Label className="text-sm cursor-pointer text-foreground">
              {blog.published ? 'Published' : 'Draft'}
            </Label>
          </div>
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 border-border/50 text-foreground">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={blog.title} 
                  onChange={e => setBlog({...blog, title: e.target.value})}
                  className="bg-muted/20 border-border/50 text-lg font-bold"
                  placeholder="Enter article title..."
                />
              </div>
              
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="bg-muted/20 border-border/50">
                  <TabsTrigger value="edit">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-4">
                  <Textarea 
                    value={blog.content} 
                    onChange={e => setBlog({...blog, content: e.target.value})}
                    className="bg-muted/20 border-border/50 min-h-[500px] font-mono"
                    placeholder="Write your article in Markdown..."
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-muted/20 border border-border/50 rounded-md p-6 min-h-[500px] prose prose-invert max-w-none dark:prose-invert">
                    {blog.content ? (
                      <ReactMarkdown>{blog.content}</ReactMarkdown>
                    ) : (
                      <p className="text-muted-foreground italic">Nothing to preview yet.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card className="bg-card/50 border-border/50 text-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input 
                  value={blog.slug} 
                  onChange={e => setBlog({...blog, slug: e.target.value})}
                  className="bg-muted/20 border-border/50"
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea 
                  value={blog.excerpt} 
                  onChange={e => setBlog({...blog, excerpt: e.target.value})}
                  className="bg-muted/20 border-border/50 h-24"
                  placeholder="Short summary for cards..."
                />
              </div>

              <div className="space-y-2">
                <Label>Author</Label>
                <Input 
                  value={blog.author} 
                  onChange={e => setBlog({...blog, author: e.target.value})}
                  className="bg-muted/20 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    value={blog.coverImage} 
                    onChange={e => setBlog({...blog, coverImage: e.target.value})}
                    className="bg-muted/20 border-border/50"
                    placeholder="https://..."
                  />
                </div>
                {blog.coverImage && (
                  <div className="mt-2 rounded-md overflow-hidden h-32 border border-border/50">
                    <img src={blog.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input 
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-muted/20 border-border/50"
                  placeholder="Type and press Enter..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags?.map(tag => (
                    <div key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-foreground">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
