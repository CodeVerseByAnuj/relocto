import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CityIllustration } from "@/components/common/CityIllustration";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { SITE_CONFIG } from "@/constants/site";
import type { LocationWithContent } from "@/lib/queries/location";

interface LocationHeroProps {
  location: LocationWithContent;
}

export function LocationHero({ location }: LocationHeroProps) {
  const phone = location.heroPhone?.trim() || SITE_CONFIG.phone;
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20">
      <HeroBackground
        imageSrc={location.heroImageUrl ?? undefined}
        imageAlt={`Packers and movers in ${location.city}`}
        render={
          location.heroImageUrl ? undefined : (
            <CityIllustration
              slug={location.slug}
              city={location.city}
              state={location.state}
              variant="hero"
              className="size-full"
            />
          )
        }
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: location.city },
          ]}
        />

        <span className="mt-6 inline-flex w-fit items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
          {location.heroBadge}
        </span>

        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {location.heroTitle}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          {location.heroDescription}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            variant="cream"
            size="xl"
            render={<a href={location.heroPrimaryCtaHref} />}
          >
            {location.heroPrimaryCtaLabel}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button variant="glass" size="xl" render={<a href={telHref} />}>
            <Phone data-icon="inline-start" />
            {phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
