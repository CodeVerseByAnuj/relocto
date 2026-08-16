import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { SITE_CONFIG } from "@/constants/site";
import type { LocationItem } from "@/types/locations";

interface LocationHeroProps {
  location: LocationItem;
}

export function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20">
      <HeroBackground
        imageSrc={location.image}
        imageAlt={`Relocato movers in ${location.city}`}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: location.city },
          ]}
        />

        <span className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
          Packers & Movers in {location.city}
        </span>

        <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Reliable Packers & Movers in {location.city}, {location.state}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          {location.description}
        </p>

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
