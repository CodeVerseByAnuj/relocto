import { FeatureCard } from "@/components/sections/features/FeatureCard";
import type { FeatureCardProps } from "@/components/sections/features/FeatureCard";
import { FEATURES, FEATURES_SECTION } from "@/constants/features";

interface WhyChooseUsSectionProps {
  title?: string;
  highlight?: string | null;
  features?: FeatureCardProps[];
}

/** Split `title` so the trailing `highlight` phrase renders in the accent colour. */
function renderHeading(title: string, highlight?: string | null) {
  if (highlight && title.endsWith(highlight)) {
    const prefix = title.slice(0, title.length - highlight.length).trimEnd();
    return (
      <>
        {prefix} <span className="text-brand-navy-light">{highlight}</span>
      </>
    );
  }
  return title;
}

export function WhyChooseUsSection({
  title = `${FEATURES_SECTION.heading.prefix} ${FEATURES_SECTION.heading.highlight}`,
  highlight = FEATURES_SECTION.heading.highlight,
  features = FEATURES,
}: WhyChooseUsSectionProps = {}) {
  return (
    <section id="why-choose-us" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          {renderHeading(title, highlight)}
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={`${feature.title}-${index}`} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
