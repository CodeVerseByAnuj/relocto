import { SectionHeading } from "@/components/common/SectionHeading";
import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { SERVICES, SERVICES_SECTION } from "@/constants/services";

export function ServicesSection() {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={SERVICES_SECTION.eyebrow}
          title={SERVICES_SECTION.title}
          description={SERVICES_SECTION.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
