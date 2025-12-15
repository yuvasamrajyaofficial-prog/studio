"use client";

import { Button } from "@/components/ui/button";
import { SudharshanaChakraIcon } from "@/components/icons/sudharshana-chakra";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Upload, BookOpen, Settings, LogOut } from "lucide-react";

interface CMSLayoutProps {
  children: React.ReactNode;
}

export function CMSLayout({ children }: CMSLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/studio", label: "Dashboard", icon: LayoutDashboard },
    { href: "/studio/upload", label: "Upload Content", icon: Upload },
    { href: "/studio/translations", label: "Translations", icon: BookOpen },
    { href: "/studio/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/30 flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-border/50">
          <SudharshanaChakraIcon className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold text-lg">Creator Studio</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground"
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-8 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="font-headline font-bold text-xl">
            {navItems.find(i => i.href === pathname)?.label || "Studio"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">Admin</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
