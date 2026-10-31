import Image from "next/image";
import { QuoteCalculator } from "@/components/sections/quote/QuoteCalculator";
import { QUOTE_SECTION_CONTENT } from "@/constants/quote";
import { getPricing } from "@/lib/queries/pricing";
import { getPosterImage } from "@/lib/queries/siteSettings";

const DEFAULT_HEADING = `${QUOTE_SECTION_CONTENT.heading.prefix} ${QUOTE_SECTION_CONTENT.heading.highlightOne} ${QUOTE_SECTION_CONTENT.heading.connector} ${QUOTE_SECTION_CONTENT.heading.highlightTwo} ${QUOTE_SECTION_CONTENT.heading.suffix}`;

interface QuoteSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
}

export async function QuoteSection({
  badge = QUOTE_SECTION_CONTENT.badge,
  heading = DEFAULT_HEADING,
  description = QUOTE_SECTION_CONTENT.description,
}: QuoteSectionProps = {}) {
  const [{ categories }, poster] = await Promise.all([
    // Like the other page queries: an unreachable database (e.g. at build time)
    // renders the page without items instead of failing it; ISR refreshes it.
    getPricing().catch(() => ({ categories: [] })),
    getPosterImage(),
  ]);

  // Only what the form needs: prices are calculated on the server.
  const calculatorCategories = categories
    .filter((category) => category.items.length > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      items: category.items.map((item) => ({ id: item.id, name: item.name })),
    }));

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-brand-cream py-20 sm:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={poster}
          alt=""
          fill
          unoptimized={poster.startsWith("/api/media/")}
          className="scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-brand-cream/80" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-10 lg:px-10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-700 uppercase">
            <span className="size-1.5 rounded-full bg-slate-600" />
            {badge}
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl">
            {heading}
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <QuoteCalculator categories={calculatorCategories} />
        </div>
      </div>
    </section>
  );
}
