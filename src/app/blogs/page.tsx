"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Mock Data for Blogs
const featuredPost = {
  id: "1",
  slug: "relevance-of-vedas-in-modern-times",
  title: "The Relevance of Vedas in the Age of AI",
  excerpt: "Discover how ancient wisdom can guide ethical artificial intelligence and sustainable living in the 21st century.",
  category: "Philosophy",
  author: "Dr. A. Sharma",
  date: "Dec 15, 2025",
  readTime: "5 min read",
  image: "bg-gradient-to-br from-indigo-900 to-purple-900", // Placeholder for image
};

const recentPosts = [
  {
    id: "2",
    slug: "meditation-techniques-for-stress",
    title: "Vedic Meditation Techniques for Modern Stress",
    excerpt: "Simple practices from the Upanishads to find inner peace amidst chaos.",
    category: "Wellness",
    author: "Priya Singh",
    date: "Dec 12, 2025",
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "understanding-karma-yoga",
    title: "Karma Yoga: The Art of Selfless Action",
    excerpt: "How to apply the principles of the Bhagavad Gita in your daily work life.",
    category: "Spiritual Growth",
    author: "Swami Vidyananda",
    date: "Dec 10, 2025",
    readTime: "6 min read",
  },
  {
    id: "4",
    slug: "ayurveda-winter-guide",
    title: "Ayurvedic Guide to Winter Wellness",
    excerpt: "Dietary and lifestyle changes to stay healthy during the cold season.",
    category: "Ayurveda",
    author: "Dr. V. Nair",
    date: "Dec 08, 2025",
    readTime: "3 min read",
  },
];

const categories = ["All", "Philosophy", "Wellness", "Spiritual Growth", "Ayurveda", "Culture", "History"];

export default function BlogsPage() {
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
            <Card className="overflow-hidden border-none bg-card/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`h-64 md:h-auto ${featuredPost.image} flex items-center justify-center text-white/20`}>
                  {/* Placeholder for actual image */}
                  <span className="text-6xl font-bold">Featured</span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {featuredPost.date}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold font-headline mb-4 hover:text-primary transition-colors">
                    <Link href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm font-medium">
                      By {featuredPost.author}
                    </div>
                    <Button asChild variant="ghost" className="group">
                      <Link href={`/blogs/${featuredPost.slug}`}>
                        Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Categories & Recent Posts */}
        <section className="py-12 px-4 bg-muted/20">
          <div className="container mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <Button key={cat} variant={cat === "All" ? "default" : "outline"} size="sm" className="rounded-full">
                  {cat}
                </Button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="flex flex-col hover:border-primary/50 transition-colors bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="font-headline text-xl line-clamp-2">
                      <Link href={`/blogs/${post.slug}`} className="hover:text-primary transition-colors">
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
                      <span>{post.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
