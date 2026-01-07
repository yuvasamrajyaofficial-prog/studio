'use client';

import React from 'react';
import { 
  MessageSquare, ShieldAlert, Flag, Users,
  CheckCircle2, XCircle, MoreVertical, Trash2,
  ShieldCheck, AlertTriangle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CommunityModeration() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Community Moderation</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50">Mod Logs</Button>
          <Button variant="outline" className="border-border/50">Banned Users</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Pending Reports</div>
          <div className="text-3xl font-bold mt-1">12</div>
        </Card>
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Flagged Comments</div>
          <div className="text-3xl font-bold mt-1">45</div>
        </Card>
        <Card className="p-6 bg-card/50 border-border/50 text-foreground">
          <div className="text-sm text-muted-foreground">Health Score</div>
          <div className="text-3xl font-bold mt-1 text-green-500">98%</div>
        </Card>
      </div>

      <Card className="bg-card/50 border-border/50 text-foreground p-6">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-xl font-bold">Moderation Queue</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">All Clear!</h3>
          <p className="text-muted-foreground">There are no pending reports in the queue.</p>
        </div>
      </Card>
    </div>
  );
}
