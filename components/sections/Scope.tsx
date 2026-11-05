"use client";

import { siteConfig } from "@/config/site.config";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Glow } from "@/components/ui/Backdrop";
import { AgentChatWindow } from "@/components/sections/AgentChatWindow";

const { scope } = siteConfig;

export function Scope() {
  return (
    <Section
      id="scope"
      backdrop={<Glow tone="primary" className="-left-40 top-1/3 h-[28rem] w-[28rem] opacity-60" />}
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <SectionHeading heading={scope.heading} />
        <AgentChatWindow
          title={scope.chatTitle}
          status={scope.chatStatus}
          capabilities={scope.capabilities}
        />
      </div>
    </Section>
  );
}
