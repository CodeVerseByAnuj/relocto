import { WorldMap } from "@/components/sections/coverage/WorldMap";
import {
  COVERAGE_LOCATIONS,
  COVERAGE_SECTION,
  COVERAGE_STATS,
} from "@/constants/coverage";

export function GlobalCoverageSection() {
  const { heading, tagline, legend } = COVERAGE_SECTION;

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {heading.prefix} <span className="text-brand-navy-light">{heading.highlight}</span>
          </h2>
          <p className="text-sm font-medium text-muted-foreground sm:text-base">
            {tagline.join("  |  ")}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-white p-4 sm:p-6">
          <div className="relative">
            <WorldMap locations={COVERAGE_LOCATIONS} />

            <div className="absolute top-2 right-2 flex flex-col gap-2 rounded-xl border border-border bg-white/95 px-4 py-3 text-xs shadow-sm backdrop-blur-sm sm:right-4 sm:top-4">
              <span className="flex items-center gap-2 text-brand-navy">
                <span className="size-2 rounded-full bg-brand-navy" />
                {legend.own}
              </span>
              <span className="flex items-center gap-2 text-brand-navy">
                <span className="size-2 rounded-full bg-brand-accent" />
                {legend.partner}
              </span>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 divide-border border-t border-border pt-8 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:divide-x">
            {COVERAGE_STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 px-2 text-center sm:w-auto sm:flex-1 sm:px-6"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-brand-accent/15 text-brand-navy">
                  <Icon className="size-4.5" aria-hidden="true" />
                </div>
                <dd className="text-lg font-extrabold text-brand-navy sm:text-2xl">
                  {value}
                </dd>
                <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
