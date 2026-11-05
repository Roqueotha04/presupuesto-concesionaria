import type { ComponentType } from "react";
import { siteConfig } from "@/config/site.config";
import type { SectionId } from "@/config/site.types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Starfield } from "@/components/ui/Starfield";
import { Hero } from "@/components/sections/Hero";
import { Scope } from "@/components/sections/Scope";
import { Benefits } from "@/components/sections/Benefits";
import { Process } from "@/components/sections/Process";
import { Includes } from "@/components/sections/Includes";
import { Maintenance } from "@/components/sections/Maintenance";
import { Investment } from "@/components/sections/Investment";
import { NextSteps } from "@/components/sections/NextSteps";
import { Closing } from "@/components/sections/Closing";

const sectionComponents: Record<SectionId, ComponentType> = {
  hero: Hero,
  scope: Scope,
  benefits: Benefits,
  process: Process,
  includes: Includes,
  maintenance: Maintenance,
  investment: Investment,
  nextSteps: NextSteps,
  closing: Closing,
};

export default function Home() {
  return (
    <>
      <Starfield className="fixed inset-0 -z-20" />
      <Navbar />
      <main className="relative">
        {siteConfig.sections.map((id) => {
          const SectionComponent = sectionComponents[id];
          return <SectionComponent key={id} />;
        })}
      </main>
      <Footer />
    </>
  );
}
