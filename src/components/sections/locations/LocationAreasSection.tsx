import { MapPin } from "lucide-react";

interface LocationAreasSectionProps {
  title: string;
  description: string;
  areas: string[];
}

export function LocationAreasSection({
  title,
  description,
  areas,
}: LocationAreasSectionProps) {
  if (areas.length === 0) return null;

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {areas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-brand-navy-dark"
            >
              <MapPin
                className="size-3.5 text-brand-navy-light"
                aria-hidden="true"
              />
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
