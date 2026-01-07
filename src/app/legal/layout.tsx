import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <CosmicLayout
      title="Legal & Ethics"
      subtitle="Transparency, Integrity, and Dharma in everything we do."
    >
      <div className="max-w-4xl mx-auto bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
        {children}
      </div>
    </CosmicLayout>
  );
}
