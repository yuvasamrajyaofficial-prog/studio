import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";

export default function AboutPage() {
  return (
    <CosmicLayout
      title="About Malola"
      subtitle="Bridging Ancient Wisdom with Modern Intelligence"
    >
      <div className="max-w-4xl mx-auto space-y-8 text-muted-foreground leading-relaxed p-6">
        <section className="bg-card/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p>
            The Malola Project is a dedicated initiative to preserve, digitize, and disseminate the profound wisdom of Sanatana Dharma using cutting-edge technology. We believe that the timeless truths found in the Vedas, Upanishads, and Puranas have immense relevance in the modern world.
          </p>
        </section>

        <section className="bg-card/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-accent mb-4">Technology Meets Tradition</h2>
          <p>
            By leveraging Artificial Intelligence, we aim to make these ancient texts accessible, understandable, and engaging for a global audience. From AI-powered translations to immersive cosmic visualizations, Malola is at the forefront of the spiritual-tech revolution.
          </p>
        </section>

        <section className="bg-card/50 p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">The Name "Malola"</h2>
          <p>
            "Malola" is a name of Lord Narasimha, meaning "He who is beloved to Lakshmi (Ma)". It signifies the union of divine power and divine grace. It is our humble offering to the Divine Couple.
          </p>
        </section>
      </div>
    </CosmicLayout>
  );
}
