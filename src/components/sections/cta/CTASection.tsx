import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_SECTION } from "@/constants/cta";
import { SITE_CONFIG } from "@/constants/site";

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-brand-navy-light via-brand-navy to-brand-navy-dark py-20 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center lg:px-10">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
          {CTA_SECTION.eyebrow}
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {CTA_SECTION.title}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {CTA_SECTION.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="cream"
            size="xl"
            render={<a href={CTA_SECTION.primaryCta.href} />}
          >
            {CTA_SECTION.primaryCta.label}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="glass"
            size="xl"
            render={
              <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />
            }
          >
            <Phone data-icon="inline-start" />
            {SITE_CONFIG.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
