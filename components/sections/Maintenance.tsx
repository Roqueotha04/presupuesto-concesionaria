"use client";

import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { GlyphItem, LabeledNote } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Backdrop";
import { Carousel } from "@/components/ui/Carousel";
import { OrbitRing } from "@/components/ui/OrbitRing";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";

const { maintenance } = siteConfig;
const PANEL_WIDTH_REM = 14;

function MaintenancePanel({ item }: { item: GlyphItem }) {
  const { t } = useLanguage();

  return (
    <article className="flex h-full flex-col rounded-3xl border border-primary/40 bg-[linear-gradient(170deg,color-mix(in_srgb,var(--primary)_28%,var(--surface)),var(--background)_85%)] p-6 shadow-[0_0_40px_-18px_var(--primary)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/25 text-accent">
        <Glyph name={item.glyph} className="h-5 w-5" />
      </span>
      <h3 className="mt-auto font-heading text-lg font-semibold leading-tight tracking-[-0.01em] text-foreground">
        {t(item.title)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t(item.description)}</p>
    </article>
  );
}

function MaintenanceNote({ note }: { note: LabeledNote }) {
  const { t } = useLanguage();

  return (
    <div className="glass flex gap-4 rounded-2xl p-5">
      <span className="mt-0.5 text-accent">
        <Glyph name={note.glyph} className="h-5 w-5" />
      </span>
      <p className="text-sm leading-relaxed text-foreground/85">
        <strong className="block font-semibold text-foreground">{t(note.label)}</strong>
        {t(note.body)}
      </p>
    </div>
  );
}

export function Maintenance() {
  const { t } = useLanguage();
  const panels = maintenance.items.map((item) => <MaintenancePanel key={item.title.es} item={item} />);

  return (
    <Section
      id="maintenance"
      backdrop={<Glow tone="primary" className="left-1/2 top-[45%] h-[24rem] w-[40rem] -translate-x-1/2 opacity-50" />}
    >
      <SectionHeading heading={maintenance.heading} align="center" />

      <Reveal className="mt-8 hidden lg:block">
        <OrbitRing panels={panels} panelWidthRem={PANEL_WIDTH_REM} label={t(maintenance.heading.title)} />
        <p className="-mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          {t(ui.maintenance.dragHint)}
        </p>
      </Reveal>

      <div className="mt-10 lg:hidden">
        <Carousel label={t(maintenance.heading.title)}>
          {maintenance.items.map((item) => (
            <div key={item.title.es} className="h-[16rem] w-[68vw] max-w-[15rem] shrink-0 snap-start">
              <MaintenancePanel item={item} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {maintenance.notes.map((note, index) => (
          <Reveal key={note.label.es} delay={index * 0.08}>
            <MaintenanceNote note={note} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
