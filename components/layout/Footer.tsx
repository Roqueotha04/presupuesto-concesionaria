"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";

const { company } = siteConfig;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-center md:flex-row md:px-8 md:text-left">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t(ui.footer.visit)}: ${company.name}`}
          className="group flex items-center gap-4"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={150}
            height={150}
            className="h-12 w-12 rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_28px_-4px_var(--primary)]"
          />
          <span className="flex flex-col">
            <span className="font-heading text-lg font-semibold text-foreground">{company.name}</span>
            <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
              {company.websiteLabel} ↗
            </span>
          </span>
        </a>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {company.name}. {t(ui.footer.rights)}
        </p>
      </div>
    </footer>
  );
}
