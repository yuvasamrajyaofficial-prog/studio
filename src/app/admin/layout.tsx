'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, BookOpen, MessageSquare, 
  Settings, Shield, Bell, Search, Menu, X,
  LogOut, Sparkles, Database, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdminHeader } from './components/admin-header';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Scriptures', href: '/admin/cms/scriptures', icon: BookOpen },
  { name: 'Daily Wisdom', href: '/admin/cms/wisdom', icon: Sparkles },
  { name: 'Community', href: '/admin/community', icon: MessageSquare },
  { name: 'AI Control', href: '/admin/ai', icon: Database },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is admin (this would be handled by your auth logic)
  const isAdmin = true; 

  if (!isAdmin) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <Shield className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You do not have permission to access the administrative area.</p>
        <Button asChild>
          <Link href="/cosmos">Return to Cosmos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-border/50 bg-muted/20 backdrop-blur-xl hidden md:flex flex-col sticky top-0 h-screen">
          <div className="p-6 border-b border-border/50 h-16 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-foreground">Admin</span>
            </Link>
          </div>

          <ScrollArea className="flex-1 p-4">
            <nav className="space-y-1">
              {ADMIN_NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/20"}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-border/50">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-card border-r border-border/50">
            <div className="p-6 border-b border-border/50 h-16 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-foreground">Admin</span>
              </Link>
            </div>
            <ScrollArea className="flex-1 p-4">
              <nav className="space-y-1">
                {ADMIN_NAV.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isActive 
                          ? "bg-primary/10 text-primary border border-primary/20" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/20"}
                      `}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
