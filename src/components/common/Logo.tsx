import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/constants/site";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-brand-navy";
  const subTextColor =
    variant === "light" ? "text-white/70" : "text-brand-navy/70";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Compass
        className={cn(
          "size-8 shrink-0",
          variant === "light" ? "text-white" : "text-brand-navy"
        )}
        aria-hidden="true"
      />
      <div className="flex flex-col leading-tight">
        <span className={cn("text-lg font-bold tracking-wide", textColor)}>
          RELOCATO
        </span>
        <span
          className={cn(
            "text-[0.6rem] font-semibold tracking-[0.15em]",
            subTextColor
          )}
        >
          PACKERS AND MOVERS
        </span>
        <span className={cn("font-serif text-[0.65rem] italic", subTextColor)}>
          {SITE_CONFIG.tagline}
        </span>
      </div>
    </div>
  );
}
