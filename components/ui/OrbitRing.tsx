"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { useOrbitRotation } from "@/hooks/useOrbitRotation";

interface OrbitRingProps {
  panels: ReactNode[];
  panelWidthRem: number;
  label: string;
}

const RADIUS_BREATHING_ROOM = 1.22;

function ringRadiusRem(panelCount: number, panelWidthRem: number): number {
  return (panelWidthRem / 2 / Math.tan(Math.PI / panelCount)) * RADIUS_BREATHING_ROOM;
}

export function OrbitRing({ panels, panelWidthRem, label }: OrbitRingProps) {
  const { angle, handlers } = useOrbitRotation();
  const stepDegrees = 360 / panels.length;
  const radius = ringRadiusRem(panels.length, panelWidthRem);

  return (
    <div
      role="region"
      aria-label={label}
      {...handlers}
      className="relative flex h-[26rem] cursor-grab touch-pan-y select-none items-center justify-center [perspective:1500px] active:cursor-grabbing"
    >
      <div className="[transform-style:preserve-3d] [transform:rotateX(-7deg)]">
        <m.div
          style={{ rotateY: angle, width: `${panelWidthRem}rem` }}
          className="relative h-[17rem] [transform-style:preserve-3d]"
        >
          {panels.map((panel, index) => (
            <div
              key={index}
              style={{ transform: `rotateY(${index * stepDegrees}deg) translateZ(${radius}rem)` }}
              className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
            >
              {panel}
            </div>
          ))}
        </m.div>
      </div>
    </div>
  );
}
