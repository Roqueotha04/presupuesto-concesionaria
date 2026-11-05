type BackdropPattern = "dots" | "grid" | "gridFloor";
type GlowTone = "primary" | "teal" | "accent";

const patternClasses: Record<BackdropPattern, string> = {
  dots: "pattern-dots absolute inset-0",
  grid: "pattern-grid absolute inset-0",
  gridFloor: "pattern-grid-floor absolute inset-x-[-50%] bottom-0 h-[55%] opacity-40",
};

const glowClasses: Record<GlowTone, string> = {
  primary: "bg-primary/30",
  teal: "bg-teal/50",
  accent: "bg-accent/15",
};

interface PatternProps {
  pattern: BackdropPattern;
}

export function Pattern({ pattern }: PatternProps) {
  return <div aria-hidden className={`pointer-events-none -z-10 ${patternClasses[pattern]}`} />;
}

interface GlowProps {
  tone: GlowTone;
  className: string;
}

export function Glow({ tone, className }: GlowProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 rounded-full blur-[110px] ${glowClasses[tone]} ${className}`}
    />
  );
}
