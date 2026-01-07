'use client';

import React from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from './mobile-sidebar';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export function AdminHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
            <Link href="/">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Site
            </Link>
          </Button>
          <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />
          <h2 className="text-lg font-semibold text-white hidden md:block">
            Dashboard
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400 hidden md:block">
          {user?.email}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
              <User className="w-5 h-5 text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1a1025] border-white/10 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
