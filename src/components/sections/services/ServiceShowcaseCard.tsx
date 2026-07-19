import Image from "next/image";
import type { ServiceShowcaseItem } from "@/types/sections";

export function ServiceShowcaseCard({
  image,
  title,
  description,
}: ServiceShowcaseItem) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy-dark/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-snug text-white/80">
          {description}
        </p>
      </div>
    </div>
  );
}
