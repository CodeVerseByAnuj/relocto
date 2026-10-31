import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveServiceIcon } from "@/lib/icons";
import type { ServiceShowcaseItem } from "@/types/sections";

export function ServiceShowcaseCard({
  image,
  icon,
  title,
  description,
  href,
}: ServiceShowcaseItem) {
  const Icon = resolveServiceIcon(icon ?? null);

  return (
    <Link
      href={href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-white/10"
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          unoptimized={image.startsWith("/api/media/")}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-start justify-center pt-[18%]">
          <Icon
            className="size-16 text-white/60 transition-transform duration-500 group-hover:scale-105"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy-dark/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/80">
          {description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
          View details
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
