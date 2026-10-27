import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DistanceChecker } from "@/components/sections/quote/DistanceChecker";

export const metadata: Metadata = {
  title: "Check Moving Prices | Relocato Packers and Movers",
  description:
    "Enter your pickup and drop locations to get a moving price estimate.",
};

export default function GetQuotePage() {
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
              Enter your pickup and drop locations to get started.
            </p>
          </div>
          <DistanceChecker />
        </div>
      </main>
      <Footer />
    </>
  );
}
