import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Playfair_Display, PT_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Cosmic Scriptures Explorer",
  description: "Navigate the vast universe of ancient texts and philosophies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
