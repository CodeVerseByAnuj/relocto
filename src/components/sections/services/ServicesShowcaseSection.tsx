import { ServiceShowcaseCard } from "@/components/sections/services/ServiceShowcaseCard";
import {
  SERVICES_SHOWCASE,
  SERVICES_SHOWCASE_SECTION,
} from "@/constants/servicesShowcase";

export function ServicesShowcaseSection() {
  return (
    <section className="bg-gradient-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
            {SERVICES_SHOWCASE_SECTION.eyebrow}
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
            {SERVICES_SHOWCASE_SECTION.title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_SHOWCASE.map((service) => (
            <ServiceShowcaseCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
