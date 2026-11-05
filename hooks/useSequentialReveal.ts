"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export function useSequentialReveal<T extends HTMLElement>(total: number, intervalMs: number) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setRevealedCount(total);
      return;
    }
    const timer = setInterval(() => {
      setRevealedCount((count) => {
        if (count + 1 >= total) clearInterval(timer);
        return Math.min(total, count + 1);
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isInView, reduceMotion, total, intervalMs]);

  return { ref, revealedCount, isComplete: revealedCount >= total };
}
