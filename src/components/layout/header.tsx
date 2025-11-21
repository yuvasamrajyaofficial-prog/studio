import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-6 px-4 sm:px-8 flex items-center justify-between border-b border-b-primary/20">
      <div className="text-left">
        <h1 className="font-headline text-2xl sm:text-4xl text-primary tracking-wider">
          Malola Cosmic Scriptures
        </h1>
        <p className="mt-1 text-foreground/80 font-body text-xs sm:text-sm">
          A digital Sanātana Dharma platform.
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/library">Start Cosmic Journey</Link>
        </Button>
      </div>
    </header>
  );
}
