'use client';

import React from 'react';
import { 
  Database, Sparkles, Activity, Shield, 
  Zap, Cpu, BarChart3, Settings,
  AlertCircle, CheckCircle2, Play, Pause
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AIControlCenter() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">AI Control Center</h2>
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          Systems Online
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Model Status */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Active Models</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">Gemini 1.5 Pro</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Primary model for chat and reasoning.</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">ElevenLabs v2</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">High-fidelity voice generation.</p>
            </div>

            <Button variant="outline" className="w-full border-border/50 hover:bg-muted/20">
              Model Configuration
            </Button>
          </div>
        </Card>

        {/* Usage Analytics */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold">Usage Analytics</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50">
              <div className="text-sm text-muted-foreground mb-1">Current Month Cost</div>
              <div className="text-2xl font-bold">$142.50</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <div className="text-sm text-muted-foreground mb-1">Total Tokens Processed</div>
              <div className="text-2xl font-bold">12.4M</div>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <div className="text-sm text-muted-foreground mb-1">Avg Latency</div>
              <div className="text-2xl font-bold">1.2s</div>
            </div>
          </div>
        </Card>

        {/* Safety & Moderation */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold">Safety Controls</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Content Filtering</Label>
                <p className="text-xs text-muted-foreground">Strict spiritual alignment check</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>PII Redaction</Label>
                <p className="text-xs text-muted-foreground">Auto-remove personal info</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-foreground">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="font-bold text-sm">Emergency Stop</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Immediately disable all AI features across the platform.</p>
              <Button variant="destructive" size="sm" className="w-full">
                Kill Switch
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
