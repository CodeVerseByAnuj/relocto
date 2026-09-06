import { ServiceDetailCard } from "@/components/sections/services/ServiceDetailCard";
import type { ServiceDetailCardProps } from "@/components/sections/services/ServiceDetailCard";
import {
  SERVICES_DETAIL,
  SERVICES_DETAIL_SECTION,
} from "@/constants/servicesDetail";

interface ServicesDetailSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  services?: ServiceDetailCardProps[];
}

export function ServicesDetailSection({
  eyebrow = SERVICES_DETAIL_SECTION.eyebrow,
  title = SERVICES_DETAIL_SECTION.title,
  description = SERVICES_DETAIL_SECTION.description,
  services = SERVICES_DETAIL,
}: ServicesDetailSectionProps = {}) {
  return (
    <section className="bg-white py-20 sm:py-24">
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
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceDetailCard key={`${service.title}-${index}`} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
