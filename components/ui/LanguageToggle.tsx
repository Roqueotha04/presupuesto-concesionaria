"use client";

import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t(ui.languageToggle.label)}
      className="h-10 rounded-full border border-line px-4 font-mono text-xs tracking-[0.15em] text-foreground transition-colors hover:border-accent/60 hover:text-accent"
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
