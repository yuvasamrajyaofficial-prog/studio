'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Key,
  Check,
  X,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import { saveAISettings, getAISettings, testAPIKey } from '@/lib/ai/settings-storage';

type Provider = 'gemini' | 'openai' | 'claude';

interface AISettings {
  provider: Provider;
  apiKey: string;
  isValid: boolean;
  lastTested?: Date;
}

export default function AISettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<Provider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [currentSettings, setCurrentSettings] = useState<AISettings | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      loadSettings();
    }
  }, [user, router]);

  const loadSettings = async () => {
    if (!user) return;
    const settings = await getAISettings(user.uid);
    if (settings) {
      setCurrentSettings(settings);
      setSelectedProvider(settings.provider);
      setApiKey(settings.apiKey);
    }
  };

  const handleTestKey = async () => {
    if (!apiKey.trim()) return;

    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await testAPIKey(selectedProvider, apiKey);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test API key. Please check your connection.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    if (!user || !apiKey.trim()) return;

    setIsSaving(true);

    try {
      await saveAISettings(user.uid, {
        provider: selectedProvider,
        apiKey,
        isValid: testResult?.success || false,
        lastTested: testResult?.success ? new Date() : undefined,
      });

      setTestResult({
        success: true,
        message: 'Settings saved successfully!',
      });

      // Reload settings
      await loadSettings();
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to save settings. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#0f0518] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/ai-guide"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to AI Guide</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">AI Settings</h1>
          <p className="text-gray-400">
            Configure your AI provider and API key to enable spiritual guidance
          </p>
        </div>

        {/* Main Settings Card */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8 rounded-3xl">
          {/* Provider Selection */}
          <div className="mb-8">
            <Label className="text-white text-lg mb-4 block">Choose AI Provider</Label>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Gemini */}
              <button
                onClick={() => setSelectedProvider('gemini')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedProvider === 'gemini'
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Gemini</h3>
                    <p className="text-xs text-green-400">Free tier</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Google's AI model</p>
              </button>

              {/* OpenAI */}
              <button
                onClick={() => setSelectedProvider('openai')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedProvider === 'openai'
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">OpenAI</h3>
                    <p className="text-xs text-amber-400">Paid</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">GPT-4 model</p>
              </button>

              {/* Claude */}
              <button
                onClick={() => setSelectedProvider('claude')}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  selectedProvider === 'claude'
                    ? 'border-purple-400 bg-purple-500/10'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Claude</h3>
                    <p className="text-xs text-amber-400">Paid</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Anthropic's AI</p>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="mb-6">
            <Label htmlFor="apiKey" className="text-white text-lg mb-2 block">
              API Key
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${selectedProvider} API key...`}
                className="bg-white/5 border-white/10 text-white pr-12"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Get API Key Links */}
            <div className="mt-3">
              <a
                href={
                  selectedProvider === 'gemini'
                    ? 'https://aistudio.google.com/app/apikey'
                    : selectedProvider === 'openai'
                    ? 'https://platform.openai.com/api-keys'
                    : 'https://console.anthropic.com/settings/keys'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
              >
                Get {selectedProvider} API key
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Test Result */}
          {testResult && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                testResult.success
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {testResult.success ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
              <p className={testResult.success ? 'text-green-400' : 'text-red-400'}>
                {testResult.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleTestKey}
              disabled={!apiKey.trim() || isTesting}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!apiKey.trim() || isSaving}
              className="flex-1 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </div>

          {/* Current Status */}
          {currentSettings && currentSettings.isValid && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                ✅ Connected to {currentSettings.provider} •{' '}
                {currentSettings.lastTested &&
                  `Last tested ${new Date(currentSettings.lastTested).toLocaleString()}`}
              </p>
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-xl p-6 rounded-2xl mt-6">
          <h3 className="text-white font-bold mb-2">🔒 Security & Privacy</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Your API key is encrypted before being stored</li>
            <li>• Keys are stored securely in your Firebase account</li>
            <li>• We never share your API key with third parties</li>
            <li>• You can delete your key at any time</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
