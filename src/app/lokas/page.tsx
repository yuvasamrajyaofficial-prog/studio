"use client";

import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { LokaStack } from "@/components/cosmic/loka-stack";

export default function LokasPage() {
  return (
    <CosmicLayout
      title="The 14 Lokas"
      subtitle="The vertical cosmology of the universe. From the highest realm of Truth to the deepest netherworlds."
    >
      <LokaStack />
    </CosmicLayout>
  );
}
