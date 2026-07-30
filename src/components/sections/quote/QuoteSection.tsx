import Image from "next/image";
import { QuoteForm } from "@/components/sections/quote/QuoteForm";
import { QUOTE_SECTION_CONTENT } from "@/constants/quote";

export function QuoteSection() {
  const { badge, heading, description } = QUOTE_SECTION_CONTENT;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-brand-cream py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/poster.png"
          alt=""
          fill
          className="scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-brand-cream/80" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 uppercase">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            {badge}
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl">
            {heading.prefix} <span className="text-brand-navy-light">{heading.highlightOne}</span>{" "}
            {heading.connector} <span className="text-brand-navy-light">{heading.highlightTwo}</span>{" "}
            {heading.suffix}
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
