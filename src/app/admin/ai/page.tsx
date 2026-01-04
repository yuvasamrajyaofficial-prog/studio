'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Bot, Save, RefreshCw, Cpu, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function AIControlCenter() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    provider: 'gemini',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: 'You are a wise spiritual guide...',
    isActive: true
  });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const docRef = doc(db, 'config', 'ai_settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setConfig(docSnap.data() as any);
      }
    } catch (error) {
      console.error('Error loading AI config:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'config', 'ai_settings'), config);
      toast({
        title: "Settings Saved",
        description: "AI configuration has been updated globally.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">AI Control Center</h2>
        <p className="text-gray-400">Configure the brain of MALOLA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Model Configuration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Set the default AI behavior for all users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select 
                    value={config.provider} 
                    onValueChange={(v) => setConfig({...config, provider: v})}
                  >
                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a0a2e] border-white/10 text-white">
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                      <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                      <SelectItem value="claude">Anthropic Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Model Name</Label>
                  <Input 
                    value={config.model}
                    onChange={(e) => setConfig({...config, model: e.target.value})}
                    className="bg-black/20 border-white/10 text-white" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Temperature (Creativity)</Label>
                  <span className="text-sm text-gray-400">{config.temperature}</span>
                </div>
                <Slider 
                  value={[config.temperature]} 
                  max={1} 
                  step={0.1}
                  onValueChange={([v]) => setConfig({...config, temperature: v})}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label>System Prompt (Persona)</Label>
                <Textarea 
                  value={config.systemPrompt}
                  onChange={(e) => setConfig({...config, systemPrompt: e.target.value})}
                  className="bg-black/20 border-white/10 text-white min-h-[200px] font-mono text-sm"
                  placeholder="Define the AI's personality and rules..."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={config.isActive}
                    onCheckedChange={(v) => setConfig({...config, isActive: v})}
                  />
                  <Label>AI System Active</Label>
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Status */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                <span className="text-sm text-gray-400">Vector DB</span>
                <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" /> Online
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                <span className="text-sm text-gray-400">API Latency</span>
                <span className="text-white text-sm font-medium">124ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
                <span className="text-sm text-gray-400">Error Rate</span>
                <span className="text-green-400 text-sm font-medium">0.01%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Usage (Today)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Tokens Generated</span>
                  <span className="text-white">1.2M</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Est. Cost</span>
                  <span className="text-white">$0.45</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[15%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
