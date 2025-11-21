import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Noto_Serif_Devanagari, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fontBody = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const fontHeadline = Noto_Serif_Devanagari({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "MALOLA | Cosmic Knowledge and Scriptures Portal",
  description: "MALOLA - Cosmic Knowledge and Scriptures Portal. Discover Bhagavad Gita, Vedas, Upanishads, and divine wisdom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
