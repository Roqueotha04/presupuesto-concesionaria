"use client";

import { useEffect, useRef } from "react";
import {
  createStars,
  drawFrame,
  driftStars,
  readPalette,
  starCountFor,
  warpStrength,
  type PointerState,
  type StarDensity,
} from "@/lib/starfield";

interface StarfieldOptions {
  density: StarDensity;
  interactive: boolean;
  warp: boolean;
}

const MAX_PIXEL_RATIO = 2;

export function useStarfield({ density, interactive, warp }: StarfieldOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = readPalette(document.documentElement);
    const pointer: PointerState = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let stars = createStars(0, 0, 0);
    let isVisible = false;
    let warpStart: number | null = null;
    let frame = 0;

    const paint = (time: number) =>
      drawFrame({
        context,
        stars,
        width,
        height,
        palette,
        pointer,
        time,
        warp: warpStrength(warpStart, time),
      });

    const loop = (time: number) => {
      driftStars(stars, height);
      paint(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion) {
        paint(0);
        return;
      }
      frame = requestAnimationFrame(loop);
    };

    const stop = () => cancelAnimationFrame(frame);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      stars = createStars(starCountFor(width, height, density), width, height);
      paint(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = pointer.y >= 0 && pointer.y <= bounds.height;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (isVisible) start();
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible) {
        stop();
        return;
      }
      if (warp && warpStart === null && !reduceMotion) warpStart = performance.now();
      start();
    });

    const resizeObserver = new ResizeObserver(resize);

    resize();
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (interactive && !reduceMotion) window.addEventListener("pointermove", onPointerMove);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [density, interactive, warp]);

  return canvasRef;
}
