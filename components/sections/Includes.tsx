"use client";

import { m } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow, Pattern } from "@/components/ui/Backdrop";
import { Reveal } from "@/components/ui/Reveal";
import { CheckMark } from "@/components/ui/Glyph";

const { includes } = siteConfig;

export function Includes() {
  const { t } = useLanguage();

  return (
    <Section
      id="includes"
      backdrop={
        <>
          <Pattern pattern="dots" />
          <Glow tone="accent" className="right-0 top-1/4 h-[20rem] w-[20rem]" />
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading heading={includes.heading} />
        </div>

        <div>
          <ul className="grid gap-x-8 gap-y-1 md:grid-cols-2">
            {includes.items.map((item, index) => (
              <m.li
                key={item.es}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="flex gap-4 border-b border-line py-5"
              >
                <m.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 + index * 0.07 }}
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-background shadow-[0_0_14px_-2px_var(--accent)]"
                >
                  <CheckMark />
                </m.span>
                <span className="text-[0.95rem] leading-relaxed text-foreground/90">{t(item)}</span>
              </m.li>
            ))}
          </ul>

          <Reveal className="mt-10">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">{t(includes.extrasLabel)}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {includes.extras.map((extra) => (
                <li
                  key={extra.es}
                  className="rounded-full border border-dashed border-foreground/20 px-4 py-1.5 text-sm text-muted"
                >
                  {t(extra)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
