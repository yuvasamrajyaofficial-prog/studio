'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminCommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Community Moderation</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10">Mod Logs</Button>
          <Button variant="outline" className="border-white/10">Banned Users</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="text-red-400 font-bold text-2xl">0</div>
          <div className="text-sm text-gray-400">Pending Reports</div>
        </div>
        <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="text-amber-400 font-bold text-2xl">0</div>
          <div className="text-sm text-gray-400">Flagged Comments</div>
        </div>
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20">
          <div className="text-green-400 font-bold text-2xl">100%</div>
          <div className="text-sm text-gray-400">Health Score</div>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-gray-400" />
            Report Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500/50" />
            <h3 className="text-lg font-medium text-white mb-1">All Clear!</h3>
            <p>There are no pending reports to review.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
