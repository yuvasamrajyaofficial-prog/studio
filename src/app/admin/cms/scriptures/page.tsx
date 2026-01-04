'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScripturesCMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/cms">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">Scripture Library</h2>
          <p className="text-gray-400">Manage sacred texts and translations.</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
        <p className="text-gray-400 mb-4">Scripture management interface coming soon.</p>
        <Button disabled>Add New Scripture</Button>
      </div>
    </div>
  );
}
