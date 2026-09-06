import Image from "next/image";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { resolveServiceIcon } from "@/lib/icons";

export interface ServiceDetailCardProps {
  icon: LucideIcon | string | null;
  imageUrl?: string | null;
  title: string;
  description: string;
  features: string[];
}

export function ServiceDetailCard({
  icon,
  imageUrl,
  title,
  description,
  features,
}: ServiceDetailCardProps) {
  const Icon = typeof icon === "function" ? icon : resolveServiceIcon(icon);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-navy-dark/5 sm:p-7">
      {imageUrl ? (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark text-white">
        <Icon className="size-5.5" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-brand-navy-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {features.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-brand-navy-light"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
