import type { ReactNode } from "react";
import type { SectionId } from "@/config/site.types";

interface SectionProps {
  id: SectionId;
  className?: string;
  backdrop?: ReactNode;
  children: ReactNode;
}

export function Section({ id, className = "", backdrop, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-20 overflow-x-clip py-20 md:py-28 ${className}`}
    >
      {backdrop}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  );
}
