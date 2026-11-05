"use client";

import type { InvestmentContent } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";

interface InvestmentTableProps {
  table: InvestmentContent["table"];
}

export function InvestmentTable({ table }: InvestmentTableProps) {
  const { t } = useLanguage();

  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-foreground/25 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
          <th scope="col" className="py-3 pr-4 font-normal">{t(table.conceptLabel)}</th>
          <th scope="col" className="py-3 text-right font-normal">{table.amountLabel}</th>
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.concept.es} className="border-b border-line transition-colors hover:bg-foreground/[0.03]">
            <td className="py-4 pr-4 text-foreground/85">{t(row.concept)}</td>
            <td className="whitespace-nowrap py-4 text-right font-mono text-accent">{t(row.amount)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
