import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CityIllustration } from "@/components/common/CityIllustration";
import { LocationSearch } from "@/components/sections/locations/LocationSearch";
import { LOCATIONS, LOCATIONS_SECTION } from "@/constants/locations";
import type { LocationSearchEntry } from "@/lib/locationSearch";

interface LocationsGridSectionProps {
  searchEntries?: LocationSearchEntry[];
}

export function LocationsGridSection({
  searchEntries,
}: LocationsGridSectionProps = {}) {
  const { eyebrow, title, description } = LOCATIONS_SECTION;

  const entries: LocationSearchEntry[] =
    searchEntries && searchEntries.length > 0
      ? searchEntries
      : LOCATIONS.map(({ slug, city, state, areas }) => ({
          slug,
          city,
          state,
          areas,
        }));

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full bg-brand-accent/15 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-navy uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <div className="mt-2 w-full max-w-md">
            <LocationSearch
              entries={entries}
              tone="light"
              placeholder="Search your city or area…"
              className="mx-auto"
            />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {entries.map((location) => (
            <Link
              key={location.slug}
              href={`/services/${location.slug}`}
              className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl"
            >
              <CityIllustration
                slug={location.slug}
                city={location.city}
                state={location.state}
                variant="tile"
                className="absolute inset-0 size-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-navy-dark/90 via-brand-navy-dark/20 to-transparent" />
              <div className="relative flex items-center justify-between gap-2 p-4">
                <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <MapPin
                    className="size-3.5 text-brand-accent"
                    aria-hidden="true"
                  />
                  {location.city}
                </span>
                <ArrowRight
                  className="size-4 text-white/70 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
