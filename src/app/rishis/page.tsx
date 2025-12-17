"use client";

import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { LineageTree } from "@/components/cosmic/lineage-tree";

export default function RishisPage() {
  return (
    <CosmicLayout
      title="Lineage of Rishis"
      subtitle="The Saptarishis (Seven Sages) who guide humanity through the ages. Keepers of the Vedas and cosmic wisdom."
    >
      <LineageTree />
    </CosmicLayout>
  );
}
