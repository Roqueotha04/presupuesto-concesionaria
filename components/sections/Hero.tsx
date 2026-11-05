"use client";

import { m, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Starfield } from "@/components/ui/Starfield";
import { Glow, Pattern } from "@/components/ui/Backdrop";
import { AiCore } from "@/components/ui/AiCore";
import { QuoteMetaStrip } from "@/components/sections/QuoteMetaStrip";

const { hero } = siteConfig;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function useEntrance() {
  const reduceMotion = useReducedMotion();
  return (delay: number, offset = 14) => ({
    initial: reduceMotion ? false : { opacity: 0, y: offset },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });
}

export function Hero() {
  const { t } = useLanguage();
  const entrance = useEntrance();

  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 md:pt-32">
      <Starfield density="dense" interactive className="absolute inset-0 -z-10" />
      <Pattern pattern="gridFloor" />
      <Glow tone="primary" className="-right-24 top-10 h-[26rem] w-[26rem]" />
      <Glow tone="teal" className="-left-32 bottom-0 h-[24rem] w-[30rem]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-4">
        <div className="order-2 lg:order-1">
          <m.p {...entrance(0.2)} className="font-mono text-xs uppercase tracking-[0.5em] text-accent">
            {t(hero.eyebrow)}
          </m.p>
          <m.h1
            {...entrance(0.35, 22)}
            className="mt-6 font-heading text-[clamp(2.4rem,6.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            <span className="block text-foreground">{t(hero.titleLead)}</span>
            <span className="text-gradient block">{t(hero.titleTail)}</span>
          </m.h1>
          <m.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT }}
            className="mt-8 block h-1 w-20 origin-left rounded-full bg-accent shadow-[0_0_18px_var(--accent)]"
          />
          <m.p {...entrance(0.6)} className="mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            {t(hero.subtitle)}
          </m.p>
        </div>

        <m.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <AiCore messages={hero.orbitMessages} />
        </m.div>
      </div>

      <m.div {...entrance(0.95)} className="mx-auto mt-12 w-full max-w-6xl px-6 md:mt-16 md:px-8">
        <QuoteMetaStrip items={hero.meta} />
      </m.div>
    </section>
  );
}
