"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Bell, Shield, BookOpen, Sparkles,
  Globe, Moon, Volume2, Download, Trash2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SettingsPage() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSave = async () => {
    setLoading(true);
    // TODO: Save to Firestore
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-5xl pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="account" className="gap-2">
              <User className="w-4 h-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Sparkles className="w-4 h-4" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="scripture" className="gap-2">
              <BookOpen className="w-4 h-4" /> Scripture
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" /> Privacy
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    defaultValue={userProfile?.preferences?.displayName || user.displayName || ""}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue={user.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Input 
                    id="bio" 
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Interface Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="sa">संस्कृत (Sanskrit)</SelectItem>
                      <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Scripture Language</Label>
                  <Select defaultValue="both">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">Sanskrit Only</SelectItem>
                      <SelectItem value="en">English Only</SelectItem>
                      <SelectItem value="both">Both (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5" />
                Appearance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred theme
                    </p>
                  </div>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Daily Wisdom</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily verse notification
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Reading Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Remind me to continue reading
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Community Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Comments and discussions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Scripture Tab */}
          <TabsContent value="scripture" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Reading Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xlarge">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Line Spacing</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="relaxed">Relaxed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Transliteration</Label>
                    <p className="text-sm text-muted-foreground">
                      Display IAST pronunciation guide
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Word Meanings</Label>
                    <p className="text-sm text-muted-foreground">
                      Inline word-by-word translations
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label>TTS Voice</Label>
                  <Select defaultValue="female">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (Sanskrit)</SelectItem>
                      <SelectItem value="female">Female (Sanskrit)</SelectItem>
                      <SelectItem value="male-en">Male (English)</SelectItem>
                      <SelectItem value="female-en">Female (English)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Playback Speed</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Privacy Controls</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Soul ID Publicly</Label>
                    <p className="text-sm text-muted-foreground">
                      Display on your profile
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Reading Progress</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others see what you're reading
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow AI Training</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve AI responses
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Data Management</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Download Your Data</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Export all your data in JSON format
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Data
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Label className="text-destructive">Danger Zone</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
