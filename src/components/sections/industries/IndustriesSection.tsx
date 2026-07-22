import { IndustryCard } from "@/components/sections/industries/IndustryCard";
import { INDUSTRIES, INDUSTRIES_SECTION, INDUSTRY_STATS } from "@/constants/industries";

export function IndustriesSection() {
  const { heading, description } = INDUSTRIES_SECTION;

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {heading.prefix}{" "}
            <span className="text-blue-500">{heading.highlight}</span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </div>

        <dl className="mt-10 flex flex-col flex-wrap items-center justify-center gap-y-6 rounded-2xl border border-border bg-white px-8 py-8 sm:flex-row sm:divide-x sm:divide-border">
          {INDUSTRY_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex w-1/2 flex-col items-center gap-2 px-6 sm:w-auto sm:flex-1"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-brand-accent/15 text-brand-navy">
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <dd className="text-2xl font-extrabold text-blue-500 sm:text-3xl">
                {value}
              </dd>
              <dt className="text-sm text-muted-foreground">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
