"use client";

import type { GlyphItem } from "@/config/site.types";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { FlipCard } from "@/components/ui/FlipCard";
import { Glyph } from "@/components/ui/Glyph";

interface BenefitCardProps {
  benefit: GlyphItem;
  position: number;
  total: number;
  isFlipped: boolean;
  onFlip: () => void;
  className?: string;
}

function formatPosition(position: number, total: number) {
  return `${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}

export function BenefitCard({ benefit, position, total, isFlipped, onFlip, className = "" }: BenefitCardProps) {
  const { t } = useLanguage();
  const counter = formatPosition(position, total);

  const front = (
    <div className="flex h-full flex-col justify-between border border-line bg-[linear-gradient(160deg,var(--surface),var(--background)_75%)] p-6">
      <span className="font-mono text-[0.68rem] tracking-[0.2em] text-muted">{counter}</span>
      <span className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <span aria-hidden className="absolute inset-0 rounded-full bg-primary/35 blur-xl transition-opacity group-hover:opacity-100" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-primary/60 bg-background/60 text-accent">
          <Glyph name={benefit.glyph} className="h-9 w-9" />
        </span>
      </span>
      <div>
        <h3 className="font-heading text-xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {t(benefit.title)}
        </h3>
        <span aria-hidden className="mt-4 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent/80">
          <span className="h-px w-6 bg-accent/60" />
          {t(ui.benefits.flipHint)}
        </span>
      </div>
    </div>
  );

  const back = (
    <div className="flex h-full flex-col justify-between border border-accent/30 bg-[linear-gradient(150deg,var(--primary)_-30%,var(--teal)_55%,var(--surface))] p-6">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-foreground/70">
        {t(ui.benefits.backLabel)} · {counter}
      </span>
      <div>
        <span aria-hidden className="mb-4 block h-1 w-10 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
        <p className="font-heading text-lg font-semibold leading-tight text-foreground">{t(benefit.title)}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85">{t(benefit.description)}</p>
      </div>
    </div>
  );

  return (
    <FlipCard
      front={front}
      back={back}
      isFlipped={isFlipped}
      onFlip={onFlip}
      label={t(benefit.title)}
      className={className}
    />
  );
}
