import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import { ServicesDetailSection } from "@/components/sections/services/ServicesDetailSection";
import { PetRelocationSection } from "@/components/sections/services/PetRelocationSection";
import { LocationsGridSection } from "@/components/sections/locations/LocationsGridSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { listLocationSearchEntries } from "@/lib/queries/location";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Services | Relocato Packers and Movers",
  description:
    "Household shifting, office relocation, international moving, vehicle transportation, warehousing, packing & insurance — explore Relocato's complete range of packers and movers services.",
};

export default async function ServicesPage() {
  let searchEntries: Awaited<ReturnType<typeof listLocationSearchEntries>> = [];
  try {
    searchEntries = await listLocationSearchEntries();
  } catch {
    searchEntries = [];
  }

  return (
    <>
      <Header />
      <ServicesPageHero />
      <ServicesDetailSection />
      <PetRelocationSection />
      <LocationsGridSection searchEntries={searchEntries} />
      <WhyChooseUsSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
