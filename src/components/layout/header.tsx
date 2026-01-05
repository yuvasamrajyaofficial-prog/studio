"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth-context";
import { ADMIN_EMAILS } from "@/lib/admin-config";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const isHome = pathname === "/";
  const isCosmos = pathname === "/cosmos";


  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f0518]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {!isHome && !isCosmos && (
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
            {user ? (
              <div className="flex items-center gap-2">
                {user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && (
                  <Button asChild size="sm" variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10">
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-semibold">
                  <Link href="/cosmos">Enter the Cosmos</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 hidden sm:flex">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Link href="/register">Start Journey</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
