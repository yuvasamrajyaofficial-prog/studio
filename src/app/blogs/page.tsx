"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogs } from "@/lib/blogs/actions";
import { BlogPost } from "@/lib/admin/blog-actions";

const categories = ["All", "Philosophy", "Wellness", "Spiritual Growth", "Ayurveda", "Culture", "History"];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.tags?.includes(selectedCategory));

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const recentPosts = blogs.length > 0 ? blogs.slice(1) : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                Wisdom & Insights
              </h1>
              <p className="text-muted-foreground text-lg">
                Exploring the intersection of ancient knowledge and modern life.
              </p>
            </div>

            {/* Featured Post */}
            {isLoading ? (
              <div className="h-96 rounded-xl bg-muted/20 animate-pulse" />
            ) : featuredPost ? (
              <Card className="overflow-hidden border-none bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`h-64 md:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-foreground/20 relative`}>
                    {featuredPost.coverImage ? (
                      <img src={featuredPost.coverImage} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <span className="text-6xl font-bold">Featured</span>
                    )}
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      {featuredPost.tags?.[0] && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                          {featuredPost.tags[0]}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(featuredPost.createdAt?.seconds * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold font-headline mb-4 hover:text-primary transition-colors">
                      <Link href={`/blogs/${featuredPost.slug || featuredPost.id}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="text-sm font-medium">
                        By {featuredPost.author}
                      </div>
                      <Button asChild variant="ghost" className="group">
                        <Link href={`/blogs/${featuredPost.slug || featuredPost.id}`}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="text-center py-10 text-muted-foreground">No blogs found.</div>
            )}
          </div>
        </section>

        {/* Categories & Recent Posts */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <Button 
                  key={cat} 
                  variant={selectedCategory === cat ? "default" : "outline"} 
                  size="sm" 
                  className="rounded-full"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 rounded-xl bg-card animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col hover:border-primary/50 transition-colors bg-card">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.tags?.[0] || 'General'}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <CardTitle className="font-headline text-xl line-clamp-2">
                        <Link href={`/blogs/${post.slug || post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                        <span>{post.author}</span>
                        <Link href={`/blogs/${post.slug || post.id}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                          Read <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
