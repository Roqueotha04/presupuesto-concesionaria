"use client";

import type { StarDensity } from "@/lib/starfield";
import { useStarfield } from "@/hooks/useStarfield";

interface StarfieldProps {
  density?: StarDensity;
  interactive?: boolean;
  warp?: boolean;
  className?: string;
}

export function Starfield({
  density = "sparse",
  interactive = false,
  warp = false,
  className = "absolute inset-0",
}: StarfieldProps) {
  const canvasRef = useStarfield({ density, interactive, warp });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
