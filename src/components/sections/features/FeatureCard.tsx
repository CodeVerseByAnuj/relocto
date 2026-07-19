import type { FeatureItem } from "@/types/sections";

export function FeatureCard({ icon: Icon, title, description }: FeatureItem) {
  return (
    <div className="w-full rounded-2xl border border-border bg-white p-6 sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]">
      <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark text-white">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="mt-3 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
