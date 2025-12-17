"use client";

import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { YugaTimeline } from "@/components/cosmic/yuga-timeline";

export default function YugaPage() {
  return (
    <CosmicLayout
      title="The 4 Yugas"
      subtitle="The cosmic ages of mankind. From the golden age of truth to the current age of darkness, witness the descent of Dharma."
    >
      <YugaTimeline />
    </CosmicLayout>
  );
}
