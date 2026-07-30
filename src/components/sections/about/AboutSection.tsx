import Image from "next/image";
import { ABOUT_SECTION } from "@/constants/about";

export function AboutSection() {
  const { eyebrow, heading, paragraphs, highlight, image, stats } =
    ABOUT_SECTION;

  return (
    <section id="about" className="scroll-mt-24 bg-brand-cream py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-navy uppercase">
            {eyebrow}
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {heading}
          </h2>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-5 max-w-md text-base leading-relaxed font-medium text-brand-navy-light">
            {highlight}
          </p>
        </div>

        <div className="relative pb-10 sm:pb-12">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image
              src={image}
              alt={heading}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-x-4 -bottom-2 flex overflow-hidden rounded-2xl bg-brand-navy-dark/85 shadow-xl backdrop-blur-md sm:inset-x-8">
            <div className="flex flex-1 items-center gap-3 px-5 py-5">
              <div className="flex items-center">
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="-ml-2.5 size-8 rounded-full border-2 border-brand-navy-dark bg-linear-to-br from-brand-accent to-brand-navy-light first:ml-0"
                    aria-hidden="true"
                  />
                ))}
                <span className="-ml-2.5 flex size-8 items-center justify-center rounded-full border-2 border-brand-navy-dark bg-white text-[0.6rem] font-bold text-brand-navy">
                  {stats.members.value}
                </span>
              </div>
              <p className="text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">
                {stats.members.label}
              </p>
            </div>

            <div className="flex flex-1 items-center gap-2 border-l border-white/10 px-5 py-5">
              <p className="text-2xl font-extrabold text-white sm:text-3xl">
                {stats.experience.value}
              </p>
              <p className="text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">
                {stats.experience.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
