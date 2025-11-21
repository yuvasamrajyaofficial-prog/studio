
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SudharshanaChakraIcon } from '@/components/icons/sudharshana-chakra';
import { ShankhaIcon } from '@/components/icons/shankha';
import { PadmaIcon } from '@/components/icons/padma';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground bg-grid-white/[0.02] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
          
          {/* Placeholder for Kālacakra */}
          <div className="absolute top-24 sm:top-32 text-center">
            <p className="text-sm text-primary/70">[Kālacakra Wheel Placeholder]</p>
          </div>

          <div className="relative flex items-center justify-center w-full max-w-4xl mt-16 sm:mt-0">
            {/* Left element: Shankha */}
            <div className="absolute left-0 md:left-10 lg:left-20">
               <ShankhaIcon className="w-20 h-20 sm:w-28 sm:h-28 text-primary/80 animate-pulse" />
            </div>

            {/* Centerpiece: Sudharshana Chakra */}
            <div className="relative flex items-center justify-center">
             <SudharshanaChakraIcon className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 text-primary animate-spin-slow" />
            </div>

            {/* Right element: Padma */}
            <div className="absolute right-0 md:right-10 lg:right-20">
               <PadmaIcon className="w-20 h-20 sm:w-28 sm:h-28 text-primary/80" />
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <Button size="lg" asChild>
                <a href="/library">Start Cosmic Journey</a>
            </Button>
          </div>

        </main>
        
        <Footer />
      </div>
    </div>
  );
}
