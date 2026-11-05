"use client";

import type { ReactNode } from "react";
import { TiltCard } from "@/components/ui/TiltCard";

interface HoloPanelProps {
  children: ReactNode;
  className?: string;
}

export function HoloPanel({ children, className = "" }: HoloPanelProps) {
  return (
    <TiltCard maxDegrees={5} className="h-full">
      <div
        className={`holo-border glass h-full rounded-[1.75rem] p-6 shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--primary)_55%,transparent)] md:p-9 ${className}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(120%_80%_at_0%_0%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_60%)]"
        />
        {children}
      </div>
    </TiltCard>
  );
}
