import type { Metadata } from "next";
import { BadgeCheck, MapPin, PackageCheck, PhoneCall } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HeroBackground } from "@/components/sections/hero/HeroBackground";
import { QuoteCalculator } from "@/components/sections/quote/QuoteCalculator";
import { getPricing } from "@/lib/queries/pricing";
import { getPosterImage } from "@/lib/queries/siteSettings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get Moving Price | Relocato Packers and Movers",
  description:
    "Enter your pickup and drop locations, add your items and get a moving price from Relocato Packers and Movers.",
};

const HOW_IT_WORKS = [
  {
    icon: MapPin,
    title: "Choose your locations",
    description: "Tell us where you are moving from and to. We work out the distance for you.",
  },
  {
    icon: PhoneCall,
    title: "Share your details",
    description: "Tell us your name, phone and email so our team can reach you.",
  },
  {
    icon: PackageCheck,
    title: "Add your items",
    description: "Pick the sofa, bed, fridge and other things you want to move, then get your price with a PDF estimate.",
  },
] as const;

export default async function GetQuotePage() {
  const { categories } = await getPricing();

  // Only what the form needs: prices are calculated on the server.
  const calculatorCategories = categories
    .filter((category) => category.items.length > 0)
    .map((category) => ({
      id: category.id,
      name: category.name,
      items: category.items.map((item) => ({ id: item.id, name: item.name })),
    }));

  return (
    <>
      <Header />

      <section className="relative overflow-hidden pt-36 pb-32 sm:pt-40 sm:pb-36">
        <HeroBackground imageSrc={await getPosterImage()} imageAlt="" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Get Price" }]}
          />
          <span className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand-accent uppercase">
            Instant Price Check
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Check Your Moving Price
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Choose your locations, add the items you are moving and our team
            will share your price.
          </p>
        </div>
      </section>

      <main className="relative bg-brand-cream pb-20 sm:pb-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.5fr] lg:gap-12 lg:px-10">
          <aside className="order-2 pt-2 lg:order-1 lg:pt-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-navy-dark">
              How it works
            </h2>
            <ol className="mt-6 flex flex-col gap-5">
              {HOW_IT_WORKS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold text-brand-navy">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-8 flex flex-col gap-2.5 text-sm font-medium text-brand-navy">
              {["No hidden charges", "100% safe & secure", "Licensed partners"].map(
                (point) => (
                  <li key={point} className="flex items-center gap-2">
                    <BadgeCheck className="size-5 text-emerald-600" aria-hidden="true" />
                    {point}
                  </li>
                )
              )}
            </ul>
          </aside>

          <div className="order-1 -mt-20 flex justify-center sm:-mt-24 lg:order-2 lg:justify-end">
            <QuoteCalculator categories={calculatorCategories} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
