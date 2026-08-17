import Image from "next/image";
import { ArrowRight, Check, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PET_RELOCATION_SECTION } from "@/constants/petRelocation";

export function PetRelocationSection() {
  const { eyebrow, heading, description, features, cta, image, badge } =
    PET_RELOCATION_SECTION;

  return (
    <section
      id="pet-relocation"
      className="scroll-mt-24 bg-brand-cream py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <span className="inline-flex items-center rounded-full border border-brand-navy/20 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-navy uppercase">
            {eyebrow}
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {heading}
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-brand-navy-light"
                  aria-hidden="true"
                />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            variant="primary"
            size="xl"
            className="mt-8"
            render={<a href={cta.href} />}
          >
            {cta.label}
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="relative pb-10 sm:pb-12">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt="Illustration of a dog and cat traveling together safely in a pet carrier"
              fill
              unoptimized
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-right"
            />
          </div>

          <div className="absolute inset-x-4 -bottom-2 flex items-center gap-3 rounded-2xl bg-brand-navy-dark/85 px-5 py-5 shadow-xl backdrop-blur-md sm:inset-x-8">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/20 text-brand-accent">
              <PawPrint className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-white sm:text-2xl">
                {badge.value}
              </p>
              <p className="text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">
                {badge.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
