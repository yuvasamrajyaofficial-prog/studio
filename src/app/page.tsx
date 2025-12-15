"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";

export default function HomePage() {

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center py-8 text-center md:py-12 lg:py-16 min-h-[60vh]">
            <div className="w-full max-w-5xl mx-auto flex items-center justify-center py-8 md:py-12">
                <SudharshanaChakraIcon className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 animate-spin-slow" />
            </div>
             <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Discover Cosmic Knowledge
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-foreground/80 px-4">
                Explore ancient scriptures, divine wisdom, and educational resources in one unified platform.
            </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
