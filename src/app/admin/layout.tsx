'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile } from '@/lib/firebase/firestore';
import { Loader2, LayoutDashboard, Users, FileText, Bot, Settings, ShieldAlert, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!loading) {
        if (!user) {
          router.push('/login');
          return;
        }

        const profile = await getUserProfile(user.uid);
        if (profile?.role === 'admin' || profile?.isAdmin) {
          setIsAdmin(true);
        } else {
          router.push('/cosmos'); // Redirect unauthorized users
        }
        setIsChecking(false);
      }
    };

    checkAdmin();
  }, [user, loading, router]);

  if (loading || isChecking) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0118] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: FileText, label: 'CMS', href: '/admin/cms' },
    { icon: Bot, label: 'AI Control', href: '/admin/ai' },
    { icon: ShieldAlert, label: 'Moderation', href: '/admin/community' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0118] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-purple-400">
            MALOLA Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                pathname === item.href 
                  ? "bg-purple-500/20 text-white border border-purple-500/30" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={() => signOut()}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
