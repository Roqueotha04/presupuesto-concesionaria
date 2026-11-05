"use client";

import type { ChapterHeading } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  heading: ChapterHeading;
  align?: "left" | "center";
}

export function SectionHeading({ heading, align = "left" }: SectionHeadingProps) {
  const { t } = useLanguage();
  const isCentered = align === "center";

  return (
    <Reveal className={isCentered ? "mx-auto flex max-w-2xl flex-col items-center text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-3 ${isCentered ? "justify-center" : ""}`}>
        <span className="font-mono text-sm text-accent">{heading.number}</span>
        <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent/70 to-transparent" />
      </div>
      <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground md:text-[2.75rem]">
        {t(heading.title)}
      </h2>
      {heading.intro && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{t(heading.intro)}</p>
      )}
    </Reveal>
  );
}
