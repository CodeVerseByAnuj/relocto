import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  variant = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase",
            isLight
              ? "bg-white/10 text-brand-accent"
              : "bg-brand-accent/15 text-brand-navy"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-extrabold tracking-tight sm:text-4xl",
          isLight ? "text-white" : "text-brand-navy"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            isCenter && "mx-auto",
            isLight ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
