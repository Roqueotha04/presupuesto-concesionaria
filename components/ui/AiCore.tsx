"use client";

import type { CSSProperties } from "react";
import { m } from "framer-motion";
import type { OrbitMessage } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import { ChatBubble } from "@/components/ui/ChatBubble";

interface OrbitSpec {
  inset: string;
  tilt: string;
  roll: string;
  duration: string;
  delay: string;
}

const orbits: OrbitSpec[] = [
  { inset: "4%", tilt: "72deg", roll: "-18deg", duration: "26s", delay: "-4s" },
  { inset: "13%", tilt: "64deg", roll: "34deg", duration: "34s", delay: "-15s" },
  { inset: "-6%", tilt: "78deg", roll: "8deg", duration: "42s", delay: "-27s" },
];

function orbitStyle(orbit: OrbitSpec): CSSProperties {
  return {
    inset: orbit.inset,
    transform: `rotateZ(${orbit.roll}) rotateX(${orbit.tilt})`,
    "--orbit-tilt": orbit.tilt,
    "--orbit-roll": orbit.roll,
    "--orbit-duration": orbit.duration,
  } as CSSProperties;
}

interface OrbitProps {
  orbit: OrbitSpec;
  message: OrbitMessage;
}

function Orbit({ orbit, message }: OrbitProps) {
  const { t } = useLanguage();

  return (
    <div style={orbitStyle(orbit)} className="absolute [transform-style:preserve-3d]">
      <div className="absolute inset-0 rounded-full border border-primary/45 shadow-[0_0_24px_-6px_var(--primary)]" />
      <div
        style={{ animationDelay: orbit.delay }}
        className="orbit-spin absolute inset-0 rounded-full [transform-style:preserve-3d]"
      >
        <span className="absolute bottom-[-3px] left-1/2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
        <div className="absolute left-1/2 top-0 h-0 w-0 [transform-style:preserve-3d]">
          <div style={{ animationDelay: orbit.delay }} className="orbit-counter [transform-style:preserve-3d]">
            <ChatBubble author={message.author} text={t(message.text)} variant="floating" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AiCoreProps {
  messages: OrbitMessage[];
}

export function AiCore({ messages }: AiCoreProps) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = usePointerTilt(8);

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto aspect-square w-[min(78vw,26rem)] [perspective:1100px]"
    >
      <m.div style={{ rotateX, rotateY }} className="absolute inset-0 [transform-style:preserve-3d]">
        <div aria-hidden className="absolute inset-[22%] rounded-full bg-primary/40 blur-3xl" />
        <div
          aria-hidden
          className="core-pulse absolute inset-[31%] rounded-full bg-[radial-gradient(circle_at_34%_28%,var(--foreground)_0%,var(--accent)_10%,var(--primary)_42%,var(--surface)_78%)] shadow-[0_0_60px_-4px_var(--primary),inset_-14px_-18px_40px_rgb(0_0_0/0.55)]"
        />
        <div
          aria-hidden
          className="absolute inset-[31%] rounded-full bg-[repeating-linear-gradient(0deg,transparent_0_6px,rgb(255_255_255/0.06)_6px_7px)] mix-blend-overlay"
        />
        {orbits.map((orbit, index) => (
          <Orbit key={orbit.duration} orbit={orbit} message={messages[index]} />
        ))}
      </m.div>
    </div>
  );
}
