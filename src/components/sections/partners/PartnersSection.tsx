import { SectionHeading } from "@/components/common/SectionHeading";
import { PARTNER_CATEGORIES, PARTNERS_SECTION } from "@/constants/partners";

export function PartnersSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={PARTNERS_SECTION.eyebrow}
          title={PARTNERS_SECTION.title}
          description={PARTNERS_SECTION.description}
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNER_CATEGORIES.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white px-4 py-6 text-center shadow-sm"
            >
              <Icon className="size-7 text-brand-navy" aria-hidden="true" />
              <span className="text-xs font-semibold text-brand-navy/80">
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
