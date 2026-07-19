import type { FeatureItem } from "@/types/sections";

export function FeatureCard({ icon: Icon, title, description }: FeatureItem) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-navy">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-bold text-brand-navy">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
