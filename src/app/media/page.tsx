'use client';

import React, { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getMediaItems, type MediaItem } from "@/lib/firebase/media";
import { getScriptures } from "@/lib/admin/actions";
import type { Scripture } from "@/types/schema";
import { 
  FileText, Video, Image as ImageIcon, Search, 
  Download, Eye, Play, X, Calendar, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [scriptures, setScriptures] = useState<Scripture[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'pdf' | 'image' | 'video'>('all');
  const [selectedScripture, setSelectedScripture] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [items, scrips] = await Promise.all([
          getMediaItems(),
          getScriptures()
        ]);
        setMediaItems(items);
        setScriptures(scrips);
      } catch (err) {
        console.error('Failed to load media gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter media based on search query, type, and scripture reference
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || item.fileType === selectedType;
    const matchesScripture = selectedScripture === 'all' || item.scriptureId === selectedScripture;

    return matchesSearch && matchesType && matchesScripture;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        {/* Page Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4 border border-primary/20">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent">
            Scriptural Media Vault
          </h1>
          <p className="text-muted-foreground text-md max-w-xl mx-auto font-body">
            Access daily uploads of Sacred Indian Scriptures guides, AI-generated overview videos, and comprehensive Sanskrit e-documents.
          </p>
        </section>

        {/* Search and Filters Layout */}
        <section className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scripture diagrams, videos, or PDFs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-muted/40 border border-border/80 rounded-full pl-9 pr-4 py-2.5 outline-none focus:border-primary active:border-primary text-foreground"
              />
            </div>

            {/* Selector Scripture Options */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs uppercase font-mono text-muted-foreground">Focus:</span>
              <select
                value={selectedScripture}
                onChange={(e) => setSelectedScripture(e.target.value)}
                className="text-xs font-semibold bg-muted/50 border border-border/50 rounded-full py-2 px-4 focus:border-primary text-foreground"
              >
                <option value="all">All Scriptures</option>
                {scriptures.map(s => (
                  <option key={s.id} value={s.id}>{s.title.en}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Category Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'all', label: 'All Artifacts', icon: BookOpen },
              { id: 'video', label: 'Spiritual Videos', icon: Video },
              { id: 'pdf', label: 'Scripture PDFs', icon: FileText },
              { id: 'image', label: 'Sacred Diagrams', icon: ImageIcon },
            ].map(typeTab => {
              const IconComp = typeTab.icon;
              return (
                <Button
                  key={typeTab.id}
                  variant={selectedType === typeTab.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(typeTab.id as any)}
                  className="rounded-full gap-2 text-xs font-semibold"
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {typeTab.label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Archive Cards Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(val => (
              <div key={val} className="h-64 bg-muted/20 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/50 rounded-2xl bg-muted/5">
            <p className="text-muted-foreground">No media files found matching selected filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isPdf = item.fileType === 'pdf';
              const isVideo = item.fileType === 'video';
              const isImg = item.fileType === 'image';
              const scriptureRefName = scriptures.find(s => s.id === item.scriptureId)?.title.en;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="flex"
                >
                  <Card 
                    className="flex flex-col w-full overflow-hidden bg-card/60 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-colors shadow-lg cursor-pointer"
                    onClick={() => setActiveMedia(item)}
                  >
                    {/* Media preview block */}
                    <div className="relative h-44 bg-muted/20 flex items-center justify-center overflow-hidden group border-b border-border/30">
                      {isImg && (
                        <img 
                          src={item.fileUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      )}
                      {isVideo && (
                        <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                          <Video className="w-10 h-10 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                          <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/60 text-white py-0.5 px-1.5 rounded">
                            Video
                          </span>
                        </div>
                      )}
                      {isPdf && (
                        <div className="flex flex-col items-center justify-center p-4">
                          <FileText className="w-12 h-12 text-primary/70 group-hover:text-primary transition-colors" />
                          <span className="text-[10px] uppercase font-mono text-muted-foreground mt-2">Open Document</span>
                        </div>
                      )}
                      
                      {/* Action hover mask */}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="p-3 bg-background/95 rounded-full shadow-lg border border-primary/20">
                          {isVideo ? (
                            <Play className="w-5 h-5 text-primary fill-primary" />
                          ) : (
                            <Eye className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {scriptureRefName && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px]">
                              {scriptureRefName}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-[10px] capitalize font-mono">
                            {item.fileType}
                          </Badge>
                        </div>
                        <h3 className="font-headline text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {item.uploadedAt?.seconds 
                              ? new Date(item.uploadedAt.seconds * 1000).toLocaleDateString()
                              : 'Recent'}
                          </span>
                        </div>
                        <span className="font-mono text-[10px]">Index: {item.orderIndex}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Modal Overlay / Media Viewers */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setActiveMedia(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-border/50 flex justify-between items-center text-foreground bg-muted/10">
                  <div>
                    <h3 className="font-headline font-bold text-lg">{activeMedia.title}</h3>
                    <p className="text-xs text-muted-foreground capitalize font-mono mt-0.5">{activeMedia.fileType} file</p>
                  </div>
                  <button 
                    onClick={() => setActiveMedia(null)}
                    className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Viewer Content */}
                <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-center items-center">
                  
                  {activeMedia.fileType === 'video' && (
                    <video 
                      controls 
                      autoPlay 
                      src={activeMedia.fileUrl} 
                      className="w-full h-auto max-h-[55vh] rounded-lg shadow-lg border border-border/30 bg-black"
                    />
                  )}

                  {activeMedia.fileType === 'image' && (
                    <img 
                      src={activeMedia.fileUrl} 
                      alt={activeMedia.title} 
                      className="max-w-full max-h-[55vh] object-contain rounded-lg shadow-md"
                    />
                  )}

                  {activeMedia.fileType === 'pdf' && (
                    <div className="flex flex-col items-center justify-center p-8 bg-muted/10 border border-border/30 rounded-xl w-full max-w-md my-4">
                      <FileText className="w-20 h-20 text-primary mb-4 fill-primary/10" />
                      <h4 className="font-bold text-lg mb-2 text-foreground text-center">Sanskrit Text Document</h4>
                      <p className="text-muted-foreground text-xs text-center mb-6 max-w-sm">
                        File: {activeMedia.fileName}
                      </p>
                      <div className="flex gap-4 w-full">
                        <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                          <a href={activeMedia.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            <Eye className="w-4 h-4" /> Open Reader
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 border-primary/20 text-foreground">
                          <a href={activeMedia.fileUrl} download className="flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download PDF
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Description Box */}
                  <div className="w-full text-left mt-6 bg-muted/20 border border-border/30 rounded-xl p-4 space-y-2">
                    <span className="text-xs uppercase font-mono text-muted-foreground font-semibold">Description / Commentary</span>
                    <p className="text-sm text-foreground leading-relaxed font-body">
                      {activeMedia.description || 'No digital commentary provided for this archive.'}
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-muted/20 border-t border-border/30 flex justify-between items-center text-xs text-muted-foreground px-6 font-mono">
                  <span>File: {activeMedia.fileName}</span>
                  <a 
                    href={activeMedia.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    Direct Access Link <Eye className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
