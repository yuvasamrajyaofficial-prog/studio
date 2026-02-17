"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/contexts/auth-context";
import { ADMIN_EMAILS } from "@/lib/admin-config";

import { BackButton } from "../ui/back-button";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  
  // Floating header logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect if we are in "Reading Mode" (e.g., /scriptures/[id]/chapter/[chapterId])
  const isReadingMode = pathname.includes("/chapter/");

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 150) { // Scrolling down
          setIsVisible(false);
        } else { // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  // If in reading mode, we don't render the main header at all to avoid conflict with reader toolbar
  if (isReadingMode) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50"
        >
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              {!isHome && (
                <BackButton className="mr-2" />
              )}
              
              <Link href="/" className="flex items-center gap-3">
                <SudharshanaChakraIcon className="h-8 w-8 text-primary" />
                <span className="font-serif text-xl sm:text-2xl font-bold text-primary tracking-wide">
                  MALOLA
                </span>
              </Link>

            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-8 items-center">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>
                <Link href="/scriptures" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Scriptures</Link>
                <Link href="/blogs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Blogs</Link>
              </nav>
              
              <div className="flex items-center gap-3">
                <ThemeToggleButton />
                {user ? (
                  <div className="flex items-center gap-2">
                    {user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && (
                      <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                        <Link href="/admin">Admin Dashboard</Link>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="outline" className="border-border/50 text-foreground hover:bg-muted/20">
                      <Link href="/profile">Profile</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      <Link href="/cosmos">Enter the Cosmos</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="outline" className="border-border/50 text-foreground hover:bg-muted/20">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
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
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-border/50 text-foreground w-[85vw] max-w-[300px] z-[60]">
                  <SheetHeader>
                    <SheetTitle className="text-left text-primary font-serif text-xl flex items-center gap-2">
                      <SudharshanaChakraIcon className="h-6 w-6" />
                      MALOLA
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <nav className="flex flex-col gap-4">
                      <Link 
                        href="/" 
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-3"
                      >
                        <Home className="h-5 w-5" /> Home
                      </Link>
                      <Link 
                        href="/scriptures" 
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        Scriptures
                      </Link>
                      <Link 
                        href="/blogs" 
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        Blogs
                      </Link>
                    </nav>

                    <div className="h-px bg-border/50" />

                    <div className="flex flex-col gap-4">
                      {user ? (
                        <>
                          <div className="flex flex-col gap-3">
                            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                              <Link href="/cosmos" onClick={() => setIsOpen(false)}>Enter the Cosmos</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full border-border/50 text-foreground hover:bg-muted/20">
                              <Link href="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            </Button>
                            {user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && (
                              <Button asChild variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/10">
                                <Link href="/admin" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
                              </Button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                            <Link href="/register" onClick={() => setIsOpen(false)}>Start Journey</Link>
                          </Button>
                          <Button asChild variant="outline" className="w-full border-border/50 text-foreground hover:bg-muted/20">
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
        </motion.header>
      )}
    </AnimatePresence>
  );
}
