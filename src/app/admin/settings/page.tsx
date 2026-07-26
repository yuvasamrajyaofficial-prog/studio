'use client';

import React, { useEffect, useState } from 'react';
import { 
  Settings, Shield, Globe, Database,
  Save, RotateCcw, Loader2, Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getSystemConfig, updateSystemConfig, SystemConfig } from '@/lib/admin/config-actions';

export default function SystemSettings() {
  const [config, setConfig] = useState<SystemConfig>({
    maintenanceMode: false,
    registrationOpen: true,
    aiEnabled: true,
    sessionTimeoutMinutes: 60,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const data = await getSystemConfig();
      setConfig(data);
    } catch (error) {
      console.error('Failed to load system config:', error);
      toast({ title: 'Error', description: 'Failed to load system configuration.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSystemConfig(config);
      toast({ title: 'Settings Saved', description: 'System configuration updated successfully in Firestore.' });
    } catch (error) {
      console.error('Failed to save config:', error);
      toast({ title: 'Error', description: 'Failed to save configuration.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Manage global application features, maintenance status, and security toggles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadConfig} disabled={loading || saving} className="border-border/50">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reload
          </Button>
          <Button onClick={handleSave} disabled={loading || saving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Changes
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Loading system settings...</p>
        </div>
      ) : (
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
                  <p className="text-sm text-muted-foreground">Disable platform access for non-admin users</p>
                </div>
                <Switch 
                  checked={config.maintenanceMode} 
                  onCheckedChange={checked => setConfig({ ...config, maintenanceMode: checked })} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new seekers to sign up</p>
                </div>
                <Switch 
                  checked={config.registrationOpen} 
                  onCheckedChange={checked => setConfig({ ...config, registrationOpen: checked })} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Global AI Guide Enablement</Label>
                  <p className="text-sm text-muted-foreground">Global feature flag for Genkit AI features</p>
                </div>
                <Switch 
                  checked={config.aiEnabled} 
                  onCheckedChange={checked => setConfig({ ...config, aiEnabled: checked })} 
                />
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="bg-card/50 border-border/50 text-foreground p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold">Security & Session</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Session Timeout (Minutes)</Label>
                <Input 
                  type="number" 
                  value={config.sessionTimeoutMinutes} 
                  onChange={e => setConfig({ ...config, sessionTimeoutMinutes: parseInt(e.target.value) || 60 })} 
                  className="bg-muted/20 border-border/50" 
                />
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-xs text-foreground/80">
                <p className="font-bold text-primary mb-1">Live Persistence Status</p>
                Settings modified on this dashboard instantly persist to the global <code className="text-accent font-mono">system_config/global</code> document in Firestore.
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
