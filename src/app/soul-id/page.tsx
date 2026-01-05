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
    <div className="min-h-screen flex flex-col bg-[#0a0118] text-white selection:bg-amber-500/30">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0118] to-[#0a0118] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
              </div>
              <CardTitle className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                Generate Your Soul ID
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter your birth details to reveal your cosmic signature and karmic blueprint.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-gray-300">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="dob"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="pl-10 bg-black/20 border-white/10 text-white focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tob" className="text-gray-300">Time of Birth</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="tob"
                      type="time"
                      required
                      value={formData.timeOfBirth}
                      onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                      className="pl-10 bg-black/20 border-white/10 text-white focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pob" className="text-gray-300">Place of Birth</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="pob"
                      type="text"
                      placeholder="City, Country"
                      required
                      value={formData.placeOfBirth}
                      onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                      className="pl-10 bg-black/20 border-white/10 text-white focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium py-6 shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]"
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
