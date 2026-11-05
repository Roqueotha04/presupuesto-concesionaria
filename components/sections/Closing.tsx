"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Starfield } from "@/components/ui/Starfield";
import { Glow } from "@/components/ui/Backdrop";
import { Reveal } from "@/components/ui/Reveal";

const { closing, company } = siteConfig;

export function Closing() {
  const { t } = useLanguage();

  return (
    <section
      id="closing"
      className="relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <Starfield density="dense" warp interactive className="absolute inset-0 -z-10" />
      <Glow tone="primary" className="left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2" />
      <Glow tone="teal" className="bottom-0 left-1/2 h-[16rem] w-[50rem] -translate-x-1/2 opacity-70" />

      <div className="flex flex-col items-center">
        <Reveal>
          <Image
            src={company.logo}
            alt={company.name}
            width={150}
            height={150}
            className="h-16 w-16 rounded-2xl shadow-[0_0_60px_-8px_var(--primary)] md:h-20 md:w-20"
          />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.5em] text-accent">{t(closing.eyebrow)}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <h2 className="text-gradient mt-6 font-heading text-[clamp(3rem,11vw,8rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            {closing.title}
          </h2>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="mt-6 text-base text-muted md:text-lg">{t(closing.subtitle)}</p>
        </Reveal>
      </div>
    </section>
  );
}
