"use client";

import type { ReactNode } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

export const carouselTrackClasses =
  "-mx-6 flex cursor-grab snap-x snap-proximity scroll-px-6 overflow-x-auto px-6 pb-6 active:cursor-grabbing md:-mx-8 md:scroll-px-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

interface CarouselProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export function Carousel({ children, label, className = "gap-4" }: CarouselProps) {
  const trackRef = useDragScroll<HTMLDivElement>();

  return (
    <div ref={trackRef} role="region" aria-label={label} className={`${carouselTrackClasses} ${className}`}>
      {children}
    </div>
  );
}
