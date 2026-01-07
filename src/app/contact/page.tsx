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
          <div className="bg-card/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">contact@malola.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Bangalore, India (Global HQ)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">First Name</label>
                <Input placeholder="Arjuna" className="bg-muted/20 border-border/50 text-foreground" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Last Name</label>
                <Input placeholder="Pandava" className="bg-muted/20 border-border/50 text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <Input type="email" placeholder="arjuna@kurukshetra.com" className="bg-muted/20 border-border/50 text-foreground" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Message</label>
              <Textarea placeholder="How can we help you?" className="bg-muted/20 border-border/50 text-foreground min-h-[150px]" />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </CosmicLayout>
  );
}
