"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Mock Data (In real app, fetch based on slug)
  const post = {
    title: "The Relevance of Vedas in the Age of AI",
    category: "Philosophy",
    date: "Dec 15, 2025",
    readTime: "5 min read",
    author: "Dr. A. Sharma",
    authorRole: "Vedic Scholar & AI Ethicist",
    content: `
      <p class="lead">As we stand on the precipice of a new era defined by Artificial Intelligence, the ancient wisdom of the Vedas offers a surprising and profound framework for navigating the ethical and existential challenges ahead.</p>
      
      <h3>The Concept of Intelligence (Buddhi)</h3>
      <p>In Vedic philosophy, intelligence is not merely computational power. It is <em>Buddhi</em>, the faculty of discrimination and wisdom. While AI excels at processing vast amounts of data (similar to <em>Manas</em> or the sensory mind), it lacks the conscious awareness that characterizes true sentient intelligence.</p>
      
      <p>The Rigveda speaks of <em>Rta</em>, the cosmic order that governs the universe. As we build digital systems that increasingly govern our lives, we must ask: Are these systems aligned with the natural order, or are they disrupting it?</p>

      <h3>Ethical AI and Dharma</h3>
      <p>Dharma, often translated as duty or righteousness, provides a robust ethical framework for AI development. An AI system's "dharma" should be to serve humanity and preserve the balance of the ecosystem, not merely to maximize engagement or profit.</p>
      
      <blockquote>
        "Let noble thoughts come to us from every side." — Rigveda 1.89.1
      </blockquote>
      
      <p>This ancient invocation encourages an open-source approach to knowledge, where AI is democratized and used for the universal good rather than concentrated power.</p>

      <h3>Conclusion</h3>
      <p>By integrating these timeless principles into our modern technological development, we can ensure that AI becomes a tool for human elevation rather than obsolescence.</p>
    `
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20">
        {/* Article Header */}
        <div className="bg-muted/30 border-b border-border/50 py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button variant="ghost" size="sm" asChild className="mb-8 text-muted-foreground hover:text-foreground">
              <Link href="/blogs">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blogs
              </Link>
            </Button>
            
            <div className="space-y-6 text-center">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 max-w-3xl py-12">
          {/* Author Bio (Top) */}
          <div className="flex items-center justify-between border-b border-border/50 pb-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
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

          {/* Main Text */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}
