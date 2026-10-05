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
import { listPublishedServiceCategories } from "@/lib/queries/serviceCategory";

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

  const categories = await listPublishedServiceCategories();

  return (
    <>
      <Header />
      <ServicesPageHero />
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <ServicesDetailSection
            key={category.id}
            id={category.slug}
            className={index % 2 === 1 ? "bg-muted/40" : undefined}
            eyebrow={index === 0 ? undefined : null}
            title={category.name}
            description={category.description}
            services={category.services.map((service) => ({
              icon: service.icon,
              imageUrl: service.imageUrl,
              title: service.title,
              description: service.description,
              features: service.features,
            }))}
          />
        ))
      ) : (
        <ServicesDetailSection />
      )}
      <PetRelocationSection />
      <LocationsGridSection searchEntries={searchEntries} />
      <WhyChooseUsSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
