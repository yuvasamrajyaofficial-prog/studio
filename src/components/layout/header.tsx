"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/contexts/auth-context";
import { ADMIN_EMAILS } from "@/lib/admin-config";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const isHome = pathname === "/";
  const isCosmos = pathname === "/cosmos";
  const [isOpen, setIsOpen] = useState(false);

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
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-8 items-center">
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
                <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  <Link href="/register">Start Journey</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggleButton />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0f0518] border-white/10 text-white w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left text-amber-400 font-serif text-xl flex items-center gap-2">
                  <SudharshanaChakraIcon className="h-6 w-6" />
                  MALOLA
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col gap-4">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-3"
                  >
                    <Home className="h-5 w-5" /> Home
                  </Link>
                  <Link 
                    href="/scriptures" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Scriptures
                  </Link>
                  <Link 
                    href="/blogs" 
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    Blogs
                  </Link>
                </nav>

                <div className="h-px bg-white/10" />

                <div className="flex flex-col gap-4">
                  {user ? (
                    <>
                      <div className="flex flex-col gap-3">
                        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-semibold">
                          <Link href="/cosmos" onClick={() => setIsOpen(false)}>Enter the Cosmos</Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                          <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                        </Button>
                        {user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && (
                          <Button asChild variant="ghost" className="w-full text-amber-400 hover:text-amber-300 hover:bg-amber-400/10">
                            <Link href="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                        <Link href="/register" onClick={() => setIsOpen(false)}>Start Journey</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
