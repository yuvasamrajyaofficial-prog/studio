"use client";

import React from "react";
import { CosmicLayout } from "@/components/cosmic/cosmic-layout";
import { AvatarCarousel } from "@/components/cosmic/avatar-carousel";

export default function AvatarsPage() {
  return (
    <CosmicLayout
      title="Dashavatara"
      subtitle="The ten divine incarnations of Lord Vishnu. Descending to restore cosmic balance whenever Dharma declines."
    >
      <AvatarCarousel />
    </CosmicLayout>
  );
}
