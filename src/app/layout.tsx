import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Poppins, Noto_Serif_Devanagari } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AIModal } from "@/components/ai/ai-modal";
import { AIChatBubble } from "@/components/ai/ai-chat-bubble";
import { AuthProvider } from "@/contexts/auth-context";
import { BottomNav } from "@/components/layout/bottom-nav";

const fontBody = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const fontHeadline = Noto_Serif_Devanagari({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "MALOLA - Global Cultural & Spiritual Intelligence",
  description: "Navigate the vast universe of ancient scriptures with an interactive guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(fontBody.variable, fontHeadline.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <AIModal />
            <AIChatBubble />
            <BottomNav />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
