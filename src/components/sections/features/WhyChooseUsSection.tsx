import { SectionHeading } from "@/components/common/SectionHeading";
import { FeatureCard } from "@/components/sections/features/FeatureCard";
import { FEATURES, FEATURES_SECTION } from "@/constants/features";

export function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={FEATURES_SECTION.eyebrow}
          title={FEATURES_SECTION.title}
          description={FEATURES_SECTION.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
