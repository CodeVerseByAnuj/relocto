import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_SECTION } from "@/constants/cta";

export function CTASection() {
  const { heading, primaryCta, secondaryCta } = CTA_SECTION;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative min-h-105 overflow-hidden rounded-3xl sm:aspect-2/1 sm:min-h-0">
          <Image
            src="/images/partner.png"
            alt="Relocato mover loading a delivery truck"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            priority={false}
          />

          <div className="relative flex h-full min-h-105 items-center px-8 py-12 sm:min-h-0 sm:px-12 lg:px-16">
            <div className="max-w-md">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {heading.line1}
                <br />
                <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {heading.line2}
                </span>
              </h2>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  variant="cream"
                  size="xl"
                  render={<a href={primaryCta.href} />}
                >
                  {primaryCta.label}
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button
                  variant="glass"
                  size="xl"
                  render={<a href={secondaryCta.href} />}
                >
                  {secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
