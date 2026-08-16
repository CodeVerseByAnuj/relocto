import { MapPin } from "lucide-react";
import type { LocationItem } from "@/types/locations";

interface LocationAreasSectionProps {
  location: LocationItem;
}

export function LocationAreasSection({ location }: LocationAreasSectionProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Areas We Cover in{" "}
            <span className="text-brand-navy-light">{location.city}</span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Wherever you are in {location.city}, our local teams are ready to
            help you move.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {location.areas.map((area) => (
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
