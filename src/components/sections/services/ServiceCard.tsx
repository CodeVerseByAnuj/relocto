import type { ServiceItem } from "@/types/sections";

export function ServiceCard({ icon: Icon, title, description }: ServiceItem) {
  return (
    <div className="group flex flex-col gap-4 rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-navy text-white transition-colors group-hover:bg-brand-accent group-hover:text-brand-navy">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
