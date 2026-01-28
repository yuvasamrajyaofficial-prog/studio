"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { updateSoulID } from "@/lib/firebase/firestore";
import { calculateSoulID } from "@/lib/soul-id-calculator";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Calendar, Clock, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SoulIDPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to generate a Soul ID");
      return;
    }

    setIsLoading(true);

    try {
      const soulID = calculateSoulID(formData);
      
      // Add a short ID based on user name
      soulID.shortId = `@${user.displayName?.split(' ')[0].toLowerCase() || 'seeker'}_${Math.floor(Math.random() * 100)}`;

      await updateSoulID(user.uid, soulID);
      toast.success("Soul ID generated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to generate Soul ID:", error);
      toast.error("Failed to generate Soul ID. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-card/50 border-border/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <Sparkles className="w-8 h-8 text-primary-foreground animate-spin-slow" />
              </div>
              <CardTitle className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                Generate Your Soul ID
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your birth details to reveal your cosmic signature and karmic blueprint.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-foreground/80">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="dob"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="pl-10 bg-muted/20 border-border/50 text-foreground focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tob" className="text-foreground/80">Time of Birth</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="tob"
                      type="time"
                      required
                      value={formData.timeOfBirth}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                      className="pl-10 bg-muted/20 border-border/50 text-foreground focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pob" className="text-foreground/80">Place of Birth</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="pob"
                      type="text"
                      placeholder="City, Country"
                      required
                      value={formData.placeOfBirth}
                      onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                      className="pl-10 bg-muted/20 border-border/50 text-foreground focus:border-primary/50"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold py-6 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating Cosmic Alignment...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Reveal My Soul ID
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
