'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, BookOpen, Mic } from 'lucide-react';
import Link from 'next/link';

export default function AdminCMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Content Management</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CMSCard 
          title="Scriptures" 
          count={12} 
          icon={BookOpen} 
          href="/studio/upload"
          desc="Manage sacred texts and translations."
        />
        <CMSCard 
          title="Audio/TTS" 
          count={45} 
          icon={Mic} 
          href="/studio/tts"
          desc="Manage generated audio and voice clones."
        />
        <CMSCard 
          title="Blogs/Articles" 
          count={8} 
          icon={FileText} 
          href="/studio/blog"
          desc="Manage educational content and updates."
        />
      </div>

      <Card className="bg-white/5 border-white/10 text-white mt-8">
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-gray-400">
            No recent content found.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CMSCard({ title, count, icon: Icon, href, desc }: any) {
  return (
    <Link href={href}>
      <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
          <p className="text-xs text-gray-500 mt-1">
            {desc}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
