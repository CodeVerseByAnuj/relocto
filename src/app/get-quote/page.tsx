import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteCalculator } from "@/components/sections/quote/QuoteCalculator";
import { getPricing } from "@/lib/queries/pricing";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Check Moving Prices | Relocato Packers and Movers",
  description:
    "Enter your pickup and drop locations, add your items and get a moving price estimate.",
};

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
      <main className="bg-brand-cream py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-6 lg:px-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy-dark sm:text-4xl">
              Check Your Moving Price
            </h1>
            <p className="mt-3 text-muted-foreground">
              Choose your locations, add your items and get an instant estimate.
            </p>
          </div>
          <QuoteCalculator categories={calculatorCategories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
