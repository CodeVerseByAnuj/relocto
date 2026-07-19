import { Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  COVERAGE_REGIONS,
  COVERAGE_SECTION,
  COVERAGE_STATS,
} from "@/constants/coverage";

export function GlobalCoverageSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-dark py-20 sm:py-24">
      <Globe2
        className="pointer-events-none absolute -right-24 -top-24 size-[28rem] text-white/5"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          variant="light"
          eyebrow={COVERAGE_SECTION.eyebrow}
          title={COVERAGE_SECTION.title}
          description={COVERAGE_SECTION.description}
        />

        <dl className="mt-14 grid grid-cols-2 gap-8 border-b border-white/10 pb-14 lg:grid-cols-4">
          {COVERAGE_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-extrabold text-brand-accent sm:text-4xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {COVERAGE_REGIONS.map((region) => (
            <span
              key={region}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/90"
            >
              {region}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
