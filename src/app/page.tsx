"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";

export default function HomePage() {

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center py-12 text-center md:py-24">
            <div className="w-full max-w-5xl mx-auto flex items-center justify-center py-16">
                <SudharshanaChakraIcon className="w-64 h-64 animate-spin-slow" />
            </div>
             <h1 className="font-headline text-4xl md:text-6xl font-bold">
                Discover Cosmic Knowledge
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground/80">
                Explore ancient scriptures, divine wisdom, and educational resources in one unified platform.
            </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
