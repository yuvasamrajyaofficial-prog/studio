'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Edit, Trash2, Loader2, Eye } from 'lucide-react';
import Link from 'next/link';
import { getAllBlogs, deleteBlog, BlogPost } from '@/lib/admin/blog-actions';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

export default function BlogsListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to load blogs:', error);
      toast({ title: "Error", description: "Failed to load blogs.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await deleteBlog(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
      toast({ title: "Success", description: "Blog post deleted." });
    } catch (error) {
      console.error('Failed to delete blog:', error);
      toast({ title: "Error", description: "Failed to delete blog.", variant: "destructive" });
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
          <h2 className="text-3xl font-bold text-white">Blogs & Articles</h2>
          <p className="text-gray-400">Manage spiritual insights and updates</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/admin/cms/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Write New Article
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-white/5 border-white/10 text-white hover:border-purple-500/50 transition-colors">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Image Thumbnail */}
              <div className="w-full md:w-48 h-32 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-900/20">
                    <FileText className="w-8 h-8 text-purple-500/50" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{blog.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString()}</span>
                      <span>•</span>
                      <Badge variant={blog.published ? "default" : "secondary"} className={blog.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                        {blog.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="icon" variant="ghost" title="View">
                      <Link href={`/blogs/${blog.slug}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild size="icon" variant="ghost" title="Edit">
                      <Link href={`/admin/cms/blogs/${blog.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-400 line-clamp-2 text-sm">
                  {blog.excerpt}
                </p>
                <div className="flex gap-2 mt-2">
                  {blog.tags?.map(tag => (
                    <Badge key={tag} variant="outline" className="border-white/10 text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
          <p className="text-gray-400 mb-6">Start sharing wisdom with the community.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/cms/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              Write New Article
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
