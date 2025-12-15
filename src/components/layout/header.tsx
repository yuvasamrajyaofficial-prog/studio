"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Home } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-header backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {!isHome && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="mr-2"
              title="Go Back"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          <Link href="/" className="flex items-center gap-2">
            <SudharshanaChakraIcon className="h-8 w-8 text-primary/80" />
            <span className="font-headline text-2xl font-bold text-primary hidden md:inline-block">
              MALOLA
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/scriptures" className="text-sm font-medium hover:text-primary transition-colors">Scriptures</Link>
            <Link href="/onboarding" className="text-sm font-medium hover:text-primary transition-colors">Onboarding</Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">Login</Button>
            <Button asChild size="sm">
                <Link href="/onboarding">Start Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
