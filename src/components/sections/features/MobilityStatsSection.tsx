import Image from "next/image";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MOBILITY_STATS, MOBILITY_STATS_SECTION } from "@/constants/features";

interface MobilityStatsSectionProps {
  imageSrc?: string;
}

export function MobilityStatsSection({ imageSrc }: MobilityStatsSectionProps) {
  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={MOBILITY_STATS_SECTION.title}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark" />
          )}
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow={MOBILITY_STATS_SECTION.eyebrow}
            title={MOBILITY_STATS_SECTION.title}
            description={MOBILITY_STATS_SECTION.description}
          />
          <dl className="mt-10 grid grid-cols-2 gap-8">
            {MOBILITY_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
