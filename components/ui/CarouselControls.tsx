"use client";

import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronIcon } from "@/components/ui/Glyph";

interface CarouselControlsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

const arrowClasses =
  "flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30";

export function CarouselControls({ count, activeIndex, onSelect }: CarouselControlsProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 flex items-center justify-center gap-5">
      <button
        type="button"
        onClick={() => onSelect(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label={t(ui.carousel.previous)}
        className={arrowClasses}
      >
        <ChevronIcon direction="left" />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`${t(ui.carousel.goTo)} ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-7 bg-accent" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => onSelect(activeIndex + 1)}
        disabled={activeIndex === count - 1}
        aria-label={t(ui.carousel.next)}
        className={arrowClasses}
      >
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}
