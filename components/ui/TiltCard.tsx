"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { usePointerTilt } from "@/hooks/usePointerTilt";

interface TiltCardProps {
  children: ReactNode;
  maxDegrees?: number;
  restingRotateY?: number;
  className?: string;
}

export function TiltCard({
  children,
  maxDegrees = 6,
  restingRotateY = 0,
  className = "",
}: TiltCardProps) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = usePointerTilt(maxDegrees);

  return (
    <div className="h-full" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <m.div
        style={{ rotateX, rotateY, transformPerspective: 1400 }}
        className={`[transform-style:preserve-3d] ${className}`}
      >
        <div style={{ transform: `rotateY(${restingRotateY}deg)` }} className="h-full [transform-style:preserve-3d]">
          {children}
        </div>
      </m.div>
    </div>
  );
}
