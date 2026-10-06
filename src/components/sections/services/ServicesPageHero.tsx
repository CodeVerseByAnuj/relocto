import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { SERVICES_PAGE_HERO } from "@/constants/servicesDetail";
import { SITE_CONFIG } from "@/constants/site";
import type { BreadcrumbItem } from "@/types/navigation";

interface ServicesPageHeroProps {
  breadcrumb?: BreadcrumbItem[];
  eyebrow?: string;
  title?: string;
  description?: string | null;
  imageSrc?: string;
}

export function ServicesPageHero({
  breadcrumb = [...SERVICES_PAGE_HERO.breadcrumb],
  eyebrow = SERVICES_PAGE_HERO.eyebrow,
  title = SERVICES_PAGE_HERO.title,
  description = SERVICES_PAGE_HERO.description,
  imageSrc = "/images/poster.png",
}: ServicesPageHeroProps = {}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20">
      <HeroBackground imageSrc={imageSrc} imageAlt={title} />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Breadcrumb items={breadcrumb} />

        <span className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
          {eyebrow}
        </span>

        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {description}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="cream" size="xl" render={<a href="#contact" />}>
            Get a Free Quote
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="glass"
            size="xl"
            render={<a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />}
          >
            <Phone data-icon="inline-start" />
            {SITE_CONFIG.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
