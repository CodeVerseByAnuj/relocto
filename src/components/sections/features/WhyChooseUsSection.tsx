import { FeatureCard } from "@/components/sections/features/FeatureCard";
import { FEATURES, FEATURES_SECTION } from "@/constants/features";

export function WhyChooseUsSection() {
  const { heading } = FEATURES_SECTION;

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          {heading.prefix} <span className="text-blue-600">{heading.highlight}</span>
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
