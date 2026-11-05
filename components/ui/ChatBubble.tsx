import type { OrbitMessage } from "@/config/site.types";

type BubbleVariant = "floating" | "inline";

interface ChatBubbleProps {
  author: OrbitMessage["author"];
  text: string;
  variant?: BubbleVariant;
}

const authorClasses: Record<OrbitMessage["author"], string> = {
  client: "rounded-br-md bg-foreground/90 text-background",
  agent: "rounded-bl-md bg-primary text-primary-foreground shadow-[0_0_30px_-6px_var(--primary)]",
};

const variantClasses: Record<BubbleVariant, string> = {
  floating:
    "absolute w-max max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-[0.68rem] leading-snug sm:max-w-[12rem] sm:text-xs",
  inline: "px-4 py-2.5 text-sm",
};

export function ChatBubble({ author, text, variant = "inline" }: ChatBubbleProps) {
  return (
    <p className={`rounded-2xl font-medium ${authorClasses[author]} ${variantClasses[variant]}`}>
      {text}
    </p>
  );
}
