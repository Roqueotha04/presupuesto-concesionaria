"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pattern } from "@/components/ui/Backdrop";
import { Reveal } from "@/components/ui/Reveal";

const { nextSteps } = siteConfig;

function ConstellationSteps() {
  const { t } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 22 });

  return (
    <ol ref={listRef} className="relative mt-10 flex flex-col gap-7">
      <span aria-hidden className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-line" />
      <m.span
        aria-hidden
        style={{ scaleY: lineProgress }}
        className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-gradient-to-b from-accent to-primary shadow-[0_0_10px_var(--accent)]"
      />
      {nextSteps.steps.map((step, index) => (
        <m.li
          key={step.es}
          initial={{ opacity: 0.35 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-45% 0px -45% 0px" }}
          transition={{ duration: 0.4 }}
          className="relative flex items-start gap-5"
        >
          <span className="relative z-10 mt-1 flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border border-accent/70 bg-background">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
          </span>
          <p className="text-base leading-relaxed text-foreground/90">
            <span className="mr-2 font-mono text-xs text-muted">{index + 1}.</span>
            {t(step)}
          </p>
        </m.li>
      ))}
    </ol>
  );
}

function ValidityCard() {
  const { t } = useLanguage();
  const { validity } = nextSteps;

  return (
    <Reveal delay={0.1} className="lg:sticky lg:top-28">
      <aside className="glass relative overflow-hidden rounded-[1.75rem] p-7 md:p-8">
        <span aria-hidden className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-dashed border-accent/30" />
        <span aria-hidden className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-primary/40" />
        <p className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">{validity.number}</span>
          <span aria-hidden className="h-px w-8 bg-accent/60" />
        </p>
        <h3 className="mt-4 font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">{t(validity.title)}</h3>
        <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">{t(validity.body)}</p>
      </aside>
    </Reveal>
  );
}

export function NextSteps() {
  return (
    <Section id="nextSteps" backdrop={<Pattern pattern="dots" />}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <SectionHeading heading={nextSteps.heading} />
          <ConstellationSteps />
        </div>
        <div className="lg:pt-16">
          <ValidityCard />
        </div>
      </div>
    </Section>
  );
}
