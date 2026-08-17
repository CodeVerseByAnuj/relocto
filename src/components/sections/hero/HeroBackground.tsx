import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  render?: ReactNode;
}

export function HeroBackground({
  imageSrc,
  imageAlt = "",
  className,
  render,
}: HeroBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {render ? (
        render
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy/40 to-brand-navy-dark/30" />
    </div>
  );
}
