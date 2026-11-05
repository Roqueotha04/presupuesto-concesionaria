"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Backdrop";
import { Carousel } from "@/components/ui/Carousel";
import { CoverflowCarousel } from "@/components/ui/CoverflowCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { BenefitCard } from "@/components/sections/BenefitCard";

const { benefits } = siteConfig;
const total = benefits.items.length;
const CARD_WIDTH_REM = 17;

export function Benefits() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(1);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) =>
    setFlippedIndex((current) => (current === index ? null : index));

  const focusCard = (index: number) => {
    setActiveIndex(index);
    setFlippedIndex(null);
  };

  return (
    <Section
      id="benefits"
      backdrop={<Glow tone="teal" className="left-1/2 top-1/2 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 opacity-70" />}
    >
      <SectionHeading heading={benefits.heading} align="center" />

      <Reveal className="mt-14 hidden md:block" delay={0.1}>
        <CoverflowCarousel
          count={total}
          activeIndex={activeIndex}
          onActiveChange={focusCard}
          label={t(benefits.heading.title)}
          itemWidthRem={CARD_WIDTH_REM}
          renderItem={(index) => (
            <BenefitCard
              benefit={benefits.items[index]}
              position={index + 1}
              total={total}
              isFlipped={flippedIndex === index}
              onFlip={() => toggleFlip(index)}
              className="h-full w-full"
            />
          )}
        />
      </Reveal>

      <div className="mt-10 md:hidden">
        <Carousel label={t(benefits.heading.title)}>
          {benefits.items.map((benefit, index) => (
            <BenefitCard
              key={benefit.title.es}
              benefit={benefit}
              position={index + 1}
              total={total}
              isFlipped={flippedIndex === index}
              onFlip={() => toggleFlip(index)}
              className="h-[21rem] w-[72vw] max-w-[17rem] snap-start"
            />
          ))}
        </Carousel>
        <p className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          {t(ui.benefits.flipHint)}
        </p>
      </div>
    </Section>
  );
}
