"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pattern } from "@/components/ui/Backdrop";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { StageTrajectory } from "@/components/sections/StageTrajectory";

const { process } = siteConfig;

export function Process() {
  const { t } = useLanguage();

  return (
    <Section id="process" backdrop={<Pattern pattern="grid" />}>
      <SectionHeading heading={process.heading} />
      <StageTrajectory
        stages={process.stages}
        doesLabel={process.doesLabel}
        deliversLabel={process.deliversLabel}
      />
      <Reveal className="mt-6">
        <aside className="glass relative flex gap-4 overflow-hidden rounded-2xl border-l-2 border-l-accent p-5 md:p-7">
          <span className="mt-0.5 text-accent">
            <Glyph name={process.rationale.glyph} className="h-5 w-5" />
          </span>
          <p className="max-w-3xl text-sm leading-relaxed text-foreground/85 md:text-base">
            <strong className="font-semibold text-accent">{t(process.rationale.label)}:</strong>{" "}
            {t(process.rationale.body)}
          </p>
        </aside>
      </Reveal>
    </Section>
  );
}
