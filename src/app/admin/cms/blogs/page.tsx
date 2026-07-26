'use client';

import React, { useEffect, useState } from 'react';
import { 
  FileText, Plus, Search, Filter,
  Edit, Trash2, Loader2, Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getAllBlogs, deleteBlog, BlogPost } from '@/lib/admin/blog-actions';
import { useToast } from '@/hooks/use-toast';

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog posts from database.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (!confirm(`Are you sure you want to delete "${titleStr}"?`)) {
      return;
    }

    try {
      await deleteBlog(id);
      toast({
        title: 'Deleted',
        description: 'Blog post deleted successfully.',
      });
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete blog post.',
        variant: 'destructive',
      });
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const titleVal = blog.title || '';
    const authorVal = blog.author || '';
    const query = searchQuery.toLowerCase();
    return titleVal.toLowerCase().includes(query) || authorVal.toLowerCase().includes(query);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Blogs & Articles</h2>
          <p className="text-muted-foreground">Manage sacred commentary, articles, and rich HTML stories</p>
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
            placeholder="Search articles by title or author..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/20 border-border/50 text-foreground"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading articles from Firestore...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBlogs.map((blog) => {
            const formattedDate = blog.createdAt?.toDate 
              ? blog.createdAt.toDate().toLocaleDateString() 
              : 'Recent';
            const isPublished = blog.published !== false;

            return (
              <Card key={blog.id} className="bg-card/50 border-border/50 text-foreground p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{blog.title}</h3>
                        {blog.format && (
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-primary/5 text-primary border-primary/20">
                            {blog.format}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>By {blog.author || 'Admin'}</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                        {blog.scriptureId && (
                          <>
                            <span>•</span>
                            <span className="text-primary font-medium">Scripture Linked</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={
                      isPublished ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }>
                      {isPublished ? 'published' : 'draft'}
                    </Badge>
                    <div className="flex gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/cms/blogs/${blog.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-border/40">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No articles found</h3>
          <p className="text-muted-foreground text-sm">
            {searchQuery ? "No matches found for your search." : "Get started by publishing your first commentary or article."}
          </p>
        </div>
      )}
    </div>
  );
}
