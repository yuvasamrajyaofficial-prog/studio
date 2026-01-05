'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, AlertTriangle, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    registrationsOpen: true,
    emailNotifications: true,
    globalAnnouncement: '',
  });

  const handleSave = () => {
    // In a real app, this would save to Firestore /appConfig
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">System Settings</h2>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              System Status
            </CardTitle>
            <CardDescription>Critical system controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-400">Disable access for all non-admin users</p>
              </div>
              <Switch 
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>User Registration</Label>
                <p className="text-sm text-gray-400">Allow new users to sign up</p>
              </div>
              <Switch 
                checked={settings.registrationsOpen}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, registrationsOpen: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              Notifications & Announcements
            </CardTitle>
            <CardDescription>Communication settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
              <Label>Global Announcement Banner</Label>
              <Input 
                placeholder="Enter message to display on top of all pages..." 
                className="bg-slate-900 border-white/10"
                value={settings.globalAnnouncement}
                onChange={(e) => setSettings(prev => ({ ...prev, globalAnnouncement: e.target.value }))}
              />
              <p className="text-xs text-gray-500">Leave empty to disable.</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Emails</Label>
                <p className="text-sm text-gray-400">Send automated emails to users</p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
