import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocationHero } from "@/components/sections/locations/LocationHero";
import { LocationAreasSection } from "@/components/sections/locations/LocationAreasSection";
import { ServicesDetailSection } from "@/components/sections/services/ServicesDetailSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import {
  getPublishedLocation,
  listPublishedSlugs,
} from "@/lib/queries/location";

export const revalidate = 300;
export const dynamicParams = true;

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await listPublishedSlugs();
    return slugs.map(({ slug }) => ({ city: slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const location = await getPublishedLocation(city);
  if (!location) return {};

  return {
    title:
      location.metaTitle ?? `Packers and Movers in ${location.city} | Relocato`,
    description:
      location.metaDescription ??
      `${location.heroDescription} Get a free quote for household shifting, office relocation, and more in ${location.city}, ${location.state}.`,
  };
}

export default async function LocationServicePage({
  params,
}: LocationPageProps) {
  const { city } = await params;
  const location = await getPublishedLocation(city);

  if (!location) {
    notFound();
  }

  return (
    <>
      <Header />
      <LocationHero location={location} />
      <ServicesDetailSection
        eyebrow={location.servicesEyebrow}
        title={location.servicesTitle}
        description={location.servicesDescription}
        services={location.services.map((service) => ({
          icon: service.icon,
          imageUrl: service.imageUrl,
          title: service.title,
          description: service.description,
          features: service.features,
        }))}
      />
      <LocationAreasSection
        title={location.areasTitle}
        description={location.areasDescription}
        areas={location.areas}
      />
      <WhyChooseUsSection
        title={location.whyTitle}
        highlight={location.whyHighlight}
        features={location.features.map((feature) => ({
          icon: feature.icon,
          title: feature.title,
          description: feature.description,
        }))}
      />
      <QuoteSection
        badge={location.quoteBadge}
        heading={location.quoteHeading}
        description={location.quoteDescription}
      />
      <Footer />
    </>
  );
}
