import { Separator } from "@/components/ui/separator";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { HeroCTAGroup } from "@/components/sections/hero/HeroCTAGroup";
import { HOME_HERO_CONTENT } from "@/constants/hero";

interface HeroSectionProps {
  imageSrc?: string;
}

export function HeroSection({ imageSrc }: HeroSectionProps) {
  const { heading, subheading, description, primaryCta, secondaryCta } =
    HOME_HERO_CONTENT;

  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden">
      <HeroBackground imageSrc={imageSrc} imageAlt={heading} />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_auto_1fr] lg:gap-10 lg:px-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">
            {subheading}
          </p>
        </div>

        <Separator
          orientation="vertical"
          className="hidden bg-brand-accent/70 lg:block"
        />

        <div className="flex flex-col justify-end gap-6">
          <p className="max-w-md text-base leading-relaxed text-white/90">
            {description}
          </p>
          <HeroCTAGroup
            primaryLabel={primaryCta.label}
            primaryHref={primaryCta.href}
            secondaryLabel={secondaryCta.label}
            secondaryHref={secondaryCta.href}
          />
        </div>
      </div>
    </section>
  );
}
