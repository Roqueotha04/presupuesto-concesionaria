"use client";

import type { ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  isFlipped: boolean;
  onFlip: () => void;
  label: string;
  className?: string;
}

const faceClasses =
  "absolute inset-0 overflow-hidden rounded-3xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

export function FlipCard({ front, back, isFlipped, onFlip, label, className = "" }: FlipCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={onFlip}
      aria-pressed={isFlipped}
      aria-label={label}
      className={`group block shrink-0 rounded-3xl text-left [perspective:1200px] ${className}`}
    >
      <m.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 16 }}
      >
        <div className={faceClasses}>{front}</div>
        <div className={`${faceClasses} [transform:rotateY(180deg)]`}>{back}</div>
      </m.div>
    </button>
  );
}
