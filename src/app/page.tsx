"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import { ShankhaIcon } from "@/components/icons/shankha";
import { PadmaIcon } from "@/components/icons/padma";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-5xl mx-auto flex items-center justify-around">
                <div className="flex-1 flex justify-center items-center">
                    <ShankhaIcon className="w-32 h-32 text-primary/80" />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <SudharshanaChakraIcon className="w-64 h-64 animate-spin-slow" />
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <PadmaIcon className="w-32 h-32 text-primary/80" />
                </div>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
