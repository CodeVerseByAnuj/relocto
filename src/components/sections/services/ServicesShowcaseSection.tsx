import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceShowcaseCard } from "@/components/sections/services/ServiceShowcaseCard";
import {
  SERVICES_SHOWCASE,
  SERVICES_SHOWCASE_SECTION,
} from "@/constants/servicesShowcase";
import {
  listPublishedServiceCategories,
  serviceHref,
} from "@/lib/queries/serviceCategory";
import type { ServiceShowcaseItem } from "@/types/sections";

export async function ServicesShowcaseSection() {
  const categories = await listPublishedServiceCategories();
  // No categories means the database is unreachable: show the static panels.
  const panels: ServiceShowcaseItem[] =
    categories.length > 0
      ? SERVICES_SHOWCASE.flatMap((panel) => {
          const category = categories.find((item) => item.slug === panel.slug);
          if (!category) return [];
          return {
            ...panel,
            image: category.imageUrl ?? panel.image,
            title: category.name,
            description: category.description ?? panel.description,
            href: `/services/${category.slug}`,
            links: category.services.slice(0, 4).map((service) => ({
              label: service.title,
              href: serviceHref(category, service),
            })),
          };
        })
      : SERVICES_SHOWCASE;

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-linear-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
            {SERVICES_SHOWCASE_SECTION.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
            {SERVICES_SHOWCASE_SECTION.title}
          </h2>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-0.5 bg-white lg:grid-cols-2">
        {panels.map((panel) => (
          <ServiceShowcaseCard key={panel.slug} {...panel} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            View All Services
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
