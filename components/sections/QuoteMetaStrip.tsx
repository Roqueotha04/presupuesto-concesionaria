"use client";

import type { QuoteMetaItem } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";

interface QuoteMetaStripProps {
  items: QuoteMetaItem[];
}

export function QuoteMetaStrip({ items }: QuoteMetaStripProps) {
  const { t } = useLanguage();

  return (
    <dl className="glass grid grid-cols-2 overflow-hidden rounded-2xl md:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label.es}
          className={`border-dashed border-line px-5 py-4 md:px-6 md:py-5 ${index % 2 === 1 ? "border-l" : ""} ${index >= 2 ? "border-t md:border-t-0" : ""} ${index === 2 ? "md:border-l" : ""}`}
        >
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
            {t(item.label)}
          </dt>
          <dd className="mt-2 text-sm font-medium leading-snug text-foreground">{t(item.value)}</dd>
        </div>
      ))}
    </dl>
  );
}
