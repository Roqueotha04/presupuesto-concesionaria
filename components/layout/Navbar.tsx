"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useScroll } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

const { company, navigation } = siteConfig;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.span
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="absolute inset-x-6 bottom-0 h-px origin-left bg-accent shadow-[0_0_8px_var(--accent)]"
    />
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden className="h-5 w-5">
      <path d={isOpen ? "M6 6l12 12M18 6 6 18" : "M4 8h16M4 16h16"} />
    </svg>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [isOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <nav
        aria-label={t(ui.menu.label)}
        className="glass relative mx-auto flex h-14 w-full max-w-5xl items-center justify-between overflow-hidden rounded-full pl-2 pr-2 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.8)] md:pl-2.5"
      >
        <a href="#hero" className="flex items-center gap-2.5 rounded-full pr-3">
          <Image src={company.logo} alt="" width={80} height={80} className="h-9 w-9 rounded-full" />
          <span className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground">{company.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {t(ui.nav[id])}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t(ui.menu.close) : t(ui.menu.open)}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 md:hidden"
          >
            <MenuIcon isOpen={isOpen} />
          </button>
        </div>
        <ScrollProgress />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <m.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl p-3 md:hidden"
          >
            {navigation.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base text-foreground/90 transition-colors hover:bg-foreground/5"
                >
                  {t(ui.nav[id])}
                </a>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
