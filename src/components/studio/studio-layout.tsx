"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface StudioLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function StudioLayout({ children, title, subtitle }: StudioLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-purple-500/30">
      {/* Abstract Tech Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-6">
             <Link href="/studio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Studio</Link>
             <Link href="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Creators</Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 mb-6 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>

          {children}
        </main>
      </div>
    </div>
  );
}
