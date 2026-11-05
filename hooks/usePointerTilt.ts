"use client";

import type { PointerEvent } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const SPRING = { stiffness: 160, damping: 18, mass: 0.6 };

export function usePointerTilt(maxDegrees: number) {
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const rotateX = useSpring(targetX, SPRING);
  const rotateY = useSpring(targetY, SPRING);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    targetY.set(horizontal * maxDegrees * 2);
    targetX.set(-vertical * maxDegrees * 2);
  };

  const onPointerLeave = () => {
    targetX.set(0);
    targetY.set(0);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave };
}
