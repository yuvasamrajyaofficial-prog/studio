'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Platform Settings</h2>
        <p className="text-gray-400">Manage global configurations and system preferences.</p>
      </div>

      <Card className="bg-white/5 border-white/10 text-white">
        <CardHeader>
          <CardTitle>General Configuration</CardTitle>
          <CardDescription>Basic platform information and state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="site-name">Platform Name</Label>
              <Input id="site-name" defaultValue="MALOLA" className="bg-black/20 border-white/10" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input id="support-email" defaultValue="support@malola.ai" className="bg-black/20 border-white/10" />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Maintenance Mode</Label>
              <p className="text-sm text-gray-400">Temporarily disable access for non-admin users.</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
             <div className="space-y-0.5">
               <Label className="text-base">New User Registration</Label>
               <p className="text-sm text-gray-400">Allow new users to sign up.</p>
             </div>
             <Switch defaultChecked />
           </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="ghost" className="text-gray-400 hover:text-white">Discard Changes</Button>
        <Button>Save Configuration</Button>
      </div>
    </div>
  );
}
