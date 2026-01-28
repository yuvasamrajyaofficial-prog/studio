"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs/actions";
import { BlogPost } from "@/lib/admin/blog-actions";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, User, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { BackButton } from "@/components/ui/back-button";

export default function BlogDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return;
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 pt-24">
          <div className="h-8 w-24 bg-muted animate-pulse mb-8 rounded" />
          <div className="h-12 w-3/4 bg-muted animate-pulse mb-4 rounded" />
          <div className="h-6 w-1/2 bg-muted animate-pulse mb-8 rounded" />
          <div className="h-96 w-full bg-muted animate-pulse rounded-xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center pt-32">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
          <Button asChild>
            <Link href="/blogs">Back to Blogs</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* Hero / Header */}
        <div className="relative h-[40vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-background z-10" />
          {blog.coverImage && (
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          <div className="container mx-auto px-4 relative z-20 pb-12">
            <div className="mb-6">
              <BackButton label="Back to Blogs" href="/blogs" className="text-foreground hover:text-primary hover:bg-primary/10" />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag) => (
                <Badge key={tag} className="bg-primary text-primary-foreground border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-headline mb-4 max-w-4xl">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown Date'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 py-12 max-w-3xl">
           {/* Author Bio (Top) */}
           <div className="flex items-center justify-between border-b border-border/50 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{blog.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Share">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Save">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
