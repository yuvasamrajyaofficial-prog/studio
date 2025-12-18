import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <CosmicLayout
      title="Contact Us"
      subtitle="We'd love to hear from you. Reach out for collaborations, questions, or feedback."
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-6">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-slate-400">contact@malola.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Location</h3>
                  <p className="text-slate-400">Bangalore, India (Global HQ)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-slate-400">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">First Name</label>
                <Input placeholder="Arjuna" className="bg-black/20 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Last Name</label>
                <Input placeholder="Pandava" className="bg-black/20 border-white/10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <Input type="email" placeholder="arjuna@kurukshetra.com" className="bg-black/20 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Message</label>
              <Textarea placeholder="How can we help you?" className="bg-black/20 border-white/10 text-white min-h-[150px]" />
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </CosmicLayout>
  );
}
