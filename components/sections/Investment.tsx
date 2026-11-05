"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow, Pattern } from "@/components/ui/Backdrop";
import { HoloPanel } from "@/components/ui/HoloPanel";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { InvestmentTable } from "@/components/sections/InvestmentTable";

const { investment } = siteConfig;
const { currency, implementation, monthly } = investment;

const panelLabelClasses = "font-mono text-[0.65rem] uppercase tracking-[0.24em] text-accent";

function PriceTag({ amount, size }: { amount: number; size: "hero" | "split" }) {
  const amountClasses =
    size === "hero"
      ? "text-glow font-heading text-[clamp(3.4rem,9vw,5.5rem)] font-semibold leading-none tracking-[-0.045em] text-foreground"
      : "font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground";

  return (
    <p className="flex items-baseline gap-2">
      <span className={`font-mono ${size === "hero" ? "text-lg text-accent" : "text-xs text-muted"}`}>{currency}</span>
      <CountUp value={amount} className={amountClasses} />
    </p>
  );
}

function ImplementationPanel() {
  const { t } = useLanguage();

  return (
    <HoloPanel>
      <p className={panelLabelClasses}>{t(implementation.label)}</p>
      <div className="mt-5">
        <PriceTag amount={implementation.amount} size="hero" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {implementation.splits.map((split) => (
          <div key={split.label.es} className="rounded-2xl border border-line bg-background/40 p-4">
            <p className="text-xs text-muted">{t(split.label)}</p>
            <div className="mt-1.5">
              <PriceTag amount={split.amount} size="split" />
            </div>
          </div>
        ))}
      </div>
    </HoloPanel>
  );
}

function MonthlyPanel() {
  const { t } = useLanguage();

  return (
    <HoloPanel className="flex flex-col">
      <p className={panelLabelClasses}>{t(monthly.label)}</p>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-3">
        <PriceTag amount={monthly.amount} size="hero" />
        <span className="font-heading text-xl text-muted">{t(monthly.period)}</span>
      </div>
      <p className="mt-auto flex items-center gap-2 pt-8 text-sm text-foreground/80">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
        {t(monthly.note)}
      </p>
    </HoloPanel>
  );
}

export function Investment() {
  const { t } = useLanguage();

  return (
    <Section
      id="investment"
      backdrop={
        <>
          <Pattern pattern="grid" />
          <Glow tone="primary" className="-left-20 top-1/3 h-[26rem] w-[26rem]" />
          <Glow tone="accent" className="-right-10 top-1/2 h-[18rem] w-[22rem]" />
        </>
      }
    >
      <SectionHeading heading={investment.heading} />
      <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="h-full">
          <ImplementationPanel />
        </Reveal>
        <Reveal delay={0.12} className="h-full">
          <MonthlyPanel />
        </Reveal>
      </div>
      <Reveal className="mt-10">
        <InvestmentTable table={investment.table} />
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted">{t(investment.footnote)}</p>
      </Reveal>
    </Section>
  );
}
