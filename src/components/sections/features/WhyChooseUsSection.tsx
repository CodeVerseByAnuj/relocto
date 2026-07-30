import { FeatureCard } from "@/components/sections/features/FeatureCard";
import { FEATURES, FEATURES_SECTION } from "@/constants/features";

export function WhyChooseUsSection() {
  const { heading } = FEATURES_SECTION;

  return (
    <section id="why-choose-us" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          {heading.prefix} <span className="text-brand-navy-light">{heading.highlight}</span>
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
