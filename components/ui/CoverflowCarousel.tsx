"use client";

import { useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { m, useReducedMotion } from "framer-motion";
import { CarouselControls } from "@/components/ui/CarouselControls";

interface CoverflowCarouselProps {
  count: number;
  activeIndex: number;
  onActiveChange: (index: number) => void;
  renderItem: (index: number, isActive: boolean) => ReactNode;
  label: string;
  itemWidthRem: number;
}

const SWIPE_THRESHOLD_PX = 40;
const MAX_VISIBLE_OFFSET = 2;

function coverflowPose(offset: number, spacingRem: number) {
  const distance = Math.abs(offset);
  return {
    x: `${offset * spacingRem}rem`,
    rotateY: Math.max(-50, Math.min(50, -offset * 38)),
    z: -distance * 170,
    scale: 1 - distance * 0.05,
    opacity: distance > MAX_VISIBLE_OFFSET ? 0 : 1 - distance * 0.28,
  };
}

export function CoverflowCarousel({
  count,
  activeIndex,
  onActiveChange,
  renderItem,
  label,
  itemWidthRem,
}: CoverflowCarouselProps) {
  const reduceMotion = useReducedMotion();
  const swipeStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const clampIndex = (index: number) => Math.max(0, Math.min(count - 1, index));
  const goTo = (index: number) => onActiveChange(clampIndex(index));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
  };

  const onPointerUp = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const delta = clientX - swipeStartX.current;
    swipeStartX.current = null;
    didSwipe.current = Math.abs(delta) >= SWIPE_THRESHOLD_PX;
    if (!didSwipe.current) return;
    goTo(activeIndex + (delta < 0 ? 1 : -1));
  };

  const blockClickAfterSwipe = (event: MouseEvent) => {
    if (!didSwipe.current) return;
    didSwipe.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const focusSideItem = (index: number) => (event: MouseEvent) => {
    if (index === activeIndex) return;
    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => (swipeStartX.current = event.clientX)}
        onPointerUp={(event) => onPointerUp(event.clientX)}
        onClickCapture={blockClickAfterSwipe}
        className="relative h-[24rem] touch-pan-y select-none rounded-3xl [perspective:1600px]"
      >
        {Array.from({ length: count }, (_, index) => {
          const offset = index - activeIndex;
          return (
            <m.div
              key={index}
              onClickCapture={focusSideItem(index)}
              aria-hidden={Math.abs(offset) > MAX_VISIBLE_OFFSET}
              initial={false}
              animate={coverflowPose(offset, itemWidthRem * 0.68)}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22 }}
              style={{
                width: `${itemWidthRem}rem`,
                marginLeft: `${-itemWidthRem / 2}rem`,
                zIndex: count - Math.abs(offset),
              }}
              className="absolute left-1/2 top-0 h-full [transform-style:preserve-3d]"
            >
              {renderItem(index, offset === 0)}
            </m.div>
          );
        })}
      </div>
      <CarouselControls count={count} activeIndex={activeIndex} onSelect={goTo} />
    </div>
  );
}
