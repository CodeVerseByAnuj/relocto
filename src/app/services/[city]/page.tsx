import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocationHero } from "@/components/sections/locations/LocationHero";
import { LocationAreasSection } from "@/components/sections/locations/LocationAreasSection";
import { ServicesDetailSection } from "@/components/sections/services/ServicesDetailSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { LOCATIONS, getLocationBySlug } from "@/constants/locations";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ city: location.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {};
  }

  return {
    title: `Packers and Movers in ${location.city} | Relocato`,
    description: `${location.description} Get a free, no-obligation quote for household shifting, office relocation, and more in ${location.city}, ${location.state}.`,
  };
}

export default async function LocationServicePage({
  params,
}: LocationPageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  return (
    <>
      <Header />
      <LocationHero location={location} />
      <ServicesDetailSection />
      <LocationAreasSection location={location} />
      <WhyChooseUsSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
