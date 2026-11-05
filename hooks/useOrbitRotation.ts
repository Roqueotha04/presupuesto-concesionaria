"use client";

import { useRef, type PointerEvent } from "react";
import { useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

const DEGREES_PER_SECOND = 9;
const DRAG_DEGREES_PER_PIXEL = 0.35;

export function useOrbitRotation() {
  const reduceMotion = useReducedMotion();
  const angle = useMotionValue(0);
  const isPaused = useRef(false);
  const drag = useRef<{ startX: number; startAngle: number } | null>(null);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || isPaused.current || drag.current) return;
    angle.set(angle.get() - (DEGREES_PER_SECOND * delta) / 1000);
  });

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    drag.current = { startX: event.clientX, startAngle: angle.get() };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!drag.current) return;
    angle.set(drag.current.startAngle + (event.clientX - drag.current.startX) * DRAG_DEGREES_PER_PIXEL);
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    drag.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const pause = () => (isPaused.current = true);
  const resume = () => (isPaused.current = false);

  return {
    angle,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onPointerEnter: pause,
      onPointerLeave: resume,
    },
  };
}
