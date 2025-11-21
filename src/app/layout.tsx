import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Poppins, Noto_Serif_Devanagari } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
});

const fontSerif = Noto_Serif_Devanagari({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Malola Cosmic Scriptures",
  description: "A digital Sanātana Dharma platform that combines AI, Voice, and Cosmic Visualization.",
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
