"use client";

import { m, useScroll, useSpring, useTransform } from "framer-motion";
import type { Localized, Stage } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { useDragScroll } from "@/hooks/useDragScroll";
import { carouselTrackClasses } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";

interface StageTrajectoryProps {
  stages: Stage[];
  doesLabel: Localized;
  deliversLabel: Localized;
}

interface StageCardProps {
  stage: Stage;
  position: number;
  doesLabel: Localized;
  deliversLabel: Localized;
}

function StageCard({ stage, position, doesLabel, deliversLabel }: StageCardProps) {
  const { t } = useLanguage();

  return (
    <li className="w-[78vw] max-w-[19rem] shrink-0 snap-start">
      <Reveal delay={Math.min(position, 4) * 0.06}>
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/70 bg-background font-mono text-sm text-accent shadow-[0_0_18px_-4px_var(--accent)]">
          {String(position).padStart(2, "0")}
        </span>
        <article className="glass mt-6 flex min-h-[19rem] flex-col rounded-2xl p-5 md:p-6">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-foreground">{t(stage.title)}</h3>
          <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm leading-relaxed">
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">{t(doesLabel)}</dt>
              <dd className="mt-1.5 text-foreground/85">{t(stage.does)}</dd>
            </div>
            <div className="mt-auto border-t border-dashed border-line pt-4">
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-accent">{t(deliversLabel)}</dt>
              <dd className="mt-1.5 font-medium text-foreground">{t(stage.delivers)}</dd>
            </div>
          </dl>
        </article>
      </Reveal>
    </li>
  );
}

export function StageTrajectory({ stages, doesLabel, deliversLabel }: StageTrajectoryProps) {
  const trackRef = useDragScroll<HTMLDivElement>();
  const { scrollXProgress } = useScroll({ container: trackRef });
  const smoothProgress = useSpring(scrollXProgress, { stiffness: 120, damping: 24 });
  const fill = useTransform(smoothProgress, [0, 1], [0.18, 1]);

  return (
    <div ref={trackRef} className={`${carouselTrackClasses} mt-12 pt-2`}>
      <ol className="relative flex w-max gap-5">
        <span aria-hidden className="absolute left-0 right-0 top-5 h-px bg-line" />
        <m.span
          aria-hidden
          style={{ scaleX: fill }}
          className="absolute left-0 right-0 top-5 h-px origin-left bg-gradient-to-r from-primary via-accent to-accent shadow-[0_0_12px_var(--accent)]"
        />
        {stages.map((stage, index) => (
          <StageCard
            key={stage.title.es}
            stage={stage}
            position={index + 1}
            doesLabel={doesLabel}
            deliversLabel={deliversLabel}
          />
        ))}
      </ol>
    </div>
  );
}
