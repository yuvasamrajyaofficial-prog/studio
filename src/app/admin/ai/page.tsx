'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Zap, Settings2, Power } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminAIPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">AI Control Center</h2>
        <div className="flex items-center gap-2">
           <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse" />
           <span className="text-sm text-green-400 font-medium">Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label className="text-base">Gemini Pro 1.5</Label>
                   <p className="text-sm text-gray-400">Primary model for chat and reasoning.</p>
                 </div>
                 <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label className="text-base">TTS Engine (V2)</Label>
                   <p className="text-sm text-gray-400">High-fidelity voice generation.</p>
                 </div>
                 <Switch defaultChecked />
               </div>
             </div>
             <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
               <Settings2 className="w-4 h-4 mr-2" />
               Advanced Settings
             </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Usage & Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-black/20">
                <div className="text-sm text-gray-400 mb-1">Current Month Cost</div>
                <div className="text-2xl font-bold">$12.45</div>
                <div className="text-xs text-green-400 mt-1">Within budget</div>
              </div>
              <div className="p-4 rounded-lg bg-black/20">
                <div className="text-sm text-gray-400 mb-1">Total Tokens Processed</div>
                <div className="text-2xl font-bold">1.2M</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-red-500/10 border-red-500/20 text-white">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Power className="w-5 h-5" />
            Emergency Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 mb-4">
            In case of AI hallucination or safety breach, use these controls to immediately suspend AI services.
          </p>
          <Button variant="destructive">
            Kill Switch (Suspend All AI)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
