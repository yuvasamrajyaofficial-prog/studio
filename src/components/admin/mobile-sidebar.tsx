'use client';

import React from 'react';
import { Menu, LayoutDashboard, Users, FileText, Bot, Settings, ShieldAlert, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

export function MobileSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'CMS', href: '/admin/cms' },
    { icon: Bot, label: 'AI Control', href: '/admin/ai' },
    { icon: ShieldAlert, label: 'Moderation', href: '/admin/community' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-muted/20 -ml-2">
          <Menu className="w-6 h-6 text-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-background border-r border-border/50 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-border/50 text-left">
          <SheetTitle className="text-xl font-bold font-headline text-primary">
            MALOLA Admin
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                pathname === item.href 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
              )}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={() => {
              signOut();
              setOpen(false);
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
