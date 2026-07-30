import { IndustryCard } from "@/components/sections/industries/IndustryCard";
import { INDUSTRIES, INDUSTRIES_SECTION, INDUSTRY_STATS } from "@/constants/industries";

export function IndustriesSection() {
  const { heading, description } = INDUSTRIES_SECTION;

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {heading.prefix}{" "}
            <span className="text-brand-navy-light">{heading.highlight}</span>
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

        <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 rounded-2xl border border-border bg-white px-6 py-8 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-0 sm:divide-x sm:divide-border sm:px-8">
          {INDUSTRY_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-2 text-center sm:w-auto sm:flex-1 sm:px-6"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-brand-accent/15 text-brand-navy">
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <dd className="text-xl font-extrabold text-brand-navy sm:text-3xl">
                {value}
              </dd>
              <dt className="text-xs leading-snug text-muted-foreground sm:text-sm">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
