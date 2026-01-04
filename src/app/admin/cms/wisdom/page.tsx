'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function WisdomCMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/cms">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-white">Daily Wisdom</h2>
          <p className="text-gray-400">Schedule quotes and sadhanas.</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
        <p className="text-gray-400 mb-4">Wisdom scheduler coming soon.</p>
        <Button disabled>Schedule Wisdom</Button>
      </div>
    </div>
  );
}
