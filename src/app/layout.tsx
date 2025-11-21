import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Poppins, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontBody = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

const fontHeadline = Merriweather({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-headline",
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
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
