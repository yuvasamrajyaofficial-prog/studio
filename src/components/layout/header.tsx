"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [hasSoulID, setHasSoulID] = useState(false);

  useEffect(() => {
    // Check if user has Soul ID in localStorage
    const soulID = localStorage.getItem('malola_soul_id');
    setHasSoulID(!!soulID);
  }, [pathname]); // Re-check when pathname changes

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0518]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="mr-2 text-slate-400 hover:text-white hover:bg-white/10"
              title="Go Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          <Link href="/" className="flex items-center gap-3">
            <SudharshanaChakraIcon className="h-8 w-8 text-amber-400" />
            <span className="font-serif text-2xl font-bold text-amber-400 tracking-wide hidden md:inline-block">
              MALOLA
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/scriptures" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Scriptures</Link>
            <Link href="/blogs" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">Blogs</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {hasSoulID ? (
              <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-semibold">
                <Link href="/">Enter the Cosmos</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                <Link href="/register">Start Journey</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
