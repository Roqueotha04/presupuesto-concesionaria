"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import type { GlyphItem, Localized } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { useSequentialReveal } from "@/hooks/useSequentialReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Glyph } from "@/components/ui/Glyph";

interface AgentChatWindowProps {
  title: Localized;
  status: Localized;
  capabilities: GlyphItem[];
}

function TypingIndicator() {
  return (
    <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-surface px-4 py-3" aria-hidden>
      {[0, 0.15, 0.3].map((delay) => (
        <span key={delay} style={{ animationDelay: `${delay}s` }} className="typing-dot h-1.5 w-1.5 rounded-full bg-muted" />
      ))}
    </div>
  );
}

function CapabilityMessage({ capability }: { capability: GlyphItem }) {
  const { t } = useLanguage();

  return (
    <m.li
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex max-w-[92%] gap-3 rounded-2xl rounded-bl-md border border-primary/30 bg-primary/12 px-4 py-3"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_16px_-2px_var(--primary)]">
        <Glyph name={capability.glyph} className="h-4 w-4" />
      </span>
      <p className="text-sm leading-relaxed text-foreground/85">
        <strong className="font-semibold text-foreground">{t(capability.title)}</strong>
        <span className="text-muted"> — {t(capability.description)}</span>
      </p>
    </m.li>
  );
}

export function AgentChatWindow({ title, status, capabilities }: AgentChatWindowProps) {
  const { t } = useLanguage();
  const { ref, revealedCount, isComplete } = useSequentialReveal<HTMLDivElement>(capabilities.length, 900);

  return (
    <div ref={ref}>
      <TiltCard restingRotateY={-6}>
        <div className="glass overflow-hidden rounded-[1.75rem] shadow-[0_40px_90px_-40px_color-mix(in_srgb,var(--primary)_70%,transparent)]">
          <header className="flex items-center gap-3 border-b border-line px-5 py-4">
            <Image src={siteConfig.company.logo} alt={siteConfig.company.name} width={36} height={36} className="h-9 w-9 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-foreground">{t(title)}</p>
              <p className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                {t(status)}
              </p>
            </div>
          </header>
          <ul className="flex min-h-[25rem] flex-col gap-3 p-5 md:p-6" aria-live="polite">
            {capabilities.slice(0, revealedCount).map((capability) => (
              <CapabilityMessage key={capability.title.es} capability={capability} />
            ))}
            <AnimatePresence>
              {!isComplete && (
                <m.li key="typing" exit={{ opacity: 0 }} className="list-none">
                  <TypingIndicator />
                </m.li>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </TiltCard>
    </div>
  );
}
