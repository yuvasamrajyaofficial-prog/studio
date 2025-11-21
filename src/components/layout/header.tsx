import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-header backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SudharshanaChakraIcon className="h-8 w-8 text-primary/80" />
          <span className="font-headline text-2xl font-bold text-primary">
            MALOLA
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="/library" className="text-sm font-medium hover:text-primary transition-colors">Scriptures</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Education</Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Tools</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <Button variant="outline" size="sm">Login</Button>
            <Button asChild size="sm">
                <Link href="/library">Start Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
