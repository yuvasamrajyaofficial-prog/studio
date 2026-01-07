'use client';

import React from 'react';
import { 
  Settings, Shield, Bell, Lock, 
  UserPlus, Mail, Globe, Database,
  Save, RotateCcw
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SystemSettings() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border/50">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">General Configuration</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Disable access for all non-admin users</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">User Registration</Label>
                <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Application Name</Label>
              <Input defaultValue="Malola" className="bg-muted/20 border-border/50" />
            </div>

            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@malola.app" className="bg-muted/20 border-border/50" />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-bold">Security & Auth</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Auth</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Verification</Label>
                <p className="text-sm text-muted-foreground">Force users to verify email on signup</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Password Policy</Label>
              <select className="w-full h-10 px-3 rounded-md bg-muted/20 border border-border/50 text-sm">
                <option>Strong (8+ chars, symbols)</option>
                <option>Medium (6+ chars)</option>
                <option>Basic (any length)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input type="number" defaultValue="60" className="bg-muted/20 border-border/50" />
            </div>
          </div>
        </Card>

        {/* Integration Settings */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold">Integrations</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Firebase Analytics</Label>
                <p className="text-sm text-muted-foreground">Track user behavior and events</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Service (SendGrid)</Label>
                <p className="text-sm text-muted-foreground">Send automated emails to users</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Database Settings */}
        <Card className="bg-card/50 border-border/50 text-foreground p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold">Database & Storage</h3>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Firestore Usage</span>
                <span className="text-xs text-muted-foreground">42% of free tier</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[42%]" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-xs text-muted-foreground">1.2 GB / 5 GB</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent w-[24%]" />
              </div>
            </div>

            <Button variant="outline" className="w-full border-border/50">
              Run Database Cleanup
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
