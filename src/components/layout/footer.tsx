"use client";

import { Youtube, Instagram, Twitter, Facebook, Send, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background/80 text-foreground/80 border-t border-primary/20 mt-16 py-8 px-4 sm:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Scriptures & Knowledge */}
          <div>
            <h3 className="font-headline text-lg text-primary mb-4">Scriptures & Knowledge</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">Vedas</Link></li>
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">Upanishads</Link></li>
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">Puranas</Link></li>
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">Itihasa</Link></li>
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">Smritis & Agamas</Link></li>
              <li><Link href="/scriptures" className="hover:text-primary transition-colors">All Scriptures Archive</Link></li>
            </ul>
          </div>

          {/* Column 2: Cosmos & Yugas */}
          <div>
            <h3 className="font-headline text-lg text-primary mb-4">Cosmos & Yugas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Kālacakra (Cosmic Wheel)</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Yuga Timeline</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Lokas & Cosmic Map</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Lineage of Rishis</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Avatar Timeline</Link></li>
            </ul>
          </div>

          {/* Column 3: Creator & AI Tools */}
          <div>
            <h3 className="font-headline text-lg text-primary mb-4">Creator & AI Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">AI Voice Studio</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Voice Cloning</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Text-to-Voice (Multilingual)</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 4: About & Legal */}
          <div>
            <h3 className="font-headline text-lg text-primary mb-4">About & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">About Malola Project</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Ethical AI Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center my-8">
            <div className="flex space-x-6 mb-4">
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Youtube className="w-6 h-6" /></Link>
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></Link>
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></Link>
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></Link>
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Send className="w-6 h-6" /></Link>
                <Link href="#" className="text-primary/70 hover:text-primary transition-colors"><Github className="w-6 h-6" /></Link>
            </div>
             <p className="font-headline text-xl text-primary/90 tracking-wider">
                ॐ सर्वे भवन्तु सुखिनः
            </p>
        </div>

        <div className="text-center text-xs text-foreground/50 border-t border-primary/20 pt-6">
          <p>&copy; {new Date().getFullYear()} Malola Cosmic Scriptures. All Rights Reserved.</p>
          <p className="mt-1">Inspired by the timeless wisdom of Sanatana Dharma.</p>
        </div>
      </div>
    </footer>
  );
}
