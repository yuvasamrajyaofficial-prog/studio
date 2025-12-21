import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Playfair_Display, PT_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AIModal } from "@/components/ai/ai-modal";
import { AIChatBubble } from "@/components/ai/ai-chat-bubble";
import { AuthProvider } from "@/contexts/auth-context";

const fontBody = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

const fontHeadline = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <AIModal />
            <AIChatBubble />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
