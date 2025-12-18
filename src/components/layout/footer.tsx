import Link from "next/link";
import { SudharshanaChakraIcon } from "../icons/sudharshana-chakra";
import { Youtube, Instagram, Twitter, Facebook, Send, Flag } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 text-center md:text-left">
          {/* Column 1: Cosmos & Yugas */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-amber-400 mb-4">Cosmos & Yugas</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/kalacakra" className="hover:text-amber-300 transition-colors">Kālacakra (Cosmic Wheel)</Link></li>
              <li><Link href="/yuga-timeline" className="hover:text-amber-300 transition-colors">Yuga Timeline</Link></li>
              <li><Link href="/lokas" className="hover:text-amber-300 transition-colors">Lokas & Cosmic Map</Link></li>
              <li><Link href="/rishis" className="hover:text-amber-300 transition-colors">Lineage of Rishis</Link></li>
              <li><Link href="/avatars" className="hover:text-amber-300 transition-colors">Avatar Timeline</Link></li>
            </ul>
          </div>

          {/* Column 2: Creator & AI Tools */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-amber-400 mb-4">Creator & AI Tools</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/studio/voice" className="hover:text-amber-300 transition-colors">AI Voice Studio</Link></li>
              <li><Link href="/studio/clone" className="hover:text-amber-300 transition-colors">Voice Cloning</Link></li>
              <li><Link href="/studio/tts" className="hover:text-amber-300 transition-colors">Text-to-Voice (Multilingual)</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: About & Legal */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-bold text-amber-400 mb-4">About & Legal</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/about" className="hover:text-amber-300 transition-colors">About Malola Project</Link></li>
              <li><Link href="/legal/ethical-ai" className="hover:text-amber-300 transition-colors">Ethical AI Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-amber-300 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons & Mantra */}
        <div className="flex flex-col items-center justify-center space-y-6 border-t border-border/30 pt-8">
          <div className="flex gap-6">
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Youtube className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Send className="h-5 w-5" /></Link>
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors"><Flag className="h-5 w-5" /></Link>
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-headline text-2xl text-primary">ॐ सर्वे भवन्तु सुखिनः</p>
          </div>

          <div className="text-center text-xs text-muted-foreground/60">
            <p>© 2025 Malola Cosmic Scriptures. All Rights Reserved.</p>
            <p>Inspired by the timeless wisdom of Sanatana Dharma.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
