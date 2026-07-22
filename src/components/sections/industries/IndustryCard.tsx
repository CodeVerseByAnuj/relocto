import Image from "next/image";
import type { IndustryItem } from "@/types/sections";

export function IndustryCard({
  icon: Icon,
  image,
  title,
  description,
}: IndustryItem) {
  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-white p-5">
      <div className="flex-1">
        <div className="flex size-9 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-navy">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-brand-navy">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl sm:w-32">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 640px) 128px, 112px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
