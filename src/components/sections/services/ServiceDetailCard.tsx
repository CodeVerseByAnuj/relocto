import { Check } from "lucide-react";
import type { ServiceDetailItem } from "@/types/sections";

export function ServiceDetailCard({
  icon: Icon,
  title,
  description,
  features,
}: ServiceDetailItem) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-navy-dark/5 sm:p-7">
      <div className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark text-white">
        <Icon className="size-5.5" aria-hidden="true" />
      </div>

      <h3 className="mt-4 text-lg font-bold text-brand-navy-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
            <Check
              className="mt-0.5 size-4 shrink-0 text-brand-navy-light"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
