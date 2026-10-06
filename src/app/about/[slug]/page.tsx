import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import {
  AboutIntroSection,
  AboutLogosSection,
  AboutStatsSection,
  AboutTimelineSection,
  AboutValuesSection,
} from "@/components/sections/about/AboutPageSections";
import { ArticleBody } from "@/components/sections/blog/ArticleBody";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import {
  getPublishedAboutPage,
  listPublishedAboutSlugs,
} from "@/lib/queries/aboutPage";

export const revalidate = 300;
export const dynamicParams = true;

interface AboutPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    return await listPublishedAboutSlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedAboutPage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle ?? `${page.title} | Relocato Packers and Movers`,
    description:
      page.metaDescription ?? page.heroDescription ?? page.introHeading ?? undefined,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { slug } = await params;
  const page = await getPublishedAboutPage(slug);

  if (!page) {
    notFound();
  }

  const hasIntro = page.introHeading || page.introBody || page.introImageUrl;
  const hasValues = page.values.length > 0 || page.vision || page.mission;

  return (
    <>
      <Header />
      <ServicesPageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: page.title },
        ]}
        eyebrow="About Us"
        title={page.title}
        description={page.heroDescription}
        imageSrc={page.heroImageUrl ?? undefined}
      />

      {hasIntro ? (
        <AboutIntroSection
          eyebrow={page.introEyebrow}
          heading={page.introHeading}
          body={page.introBody}
          imageUrl={page.introImageUrl}
        />
      ) : null}

      {page.content ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <ArticleBody content={page.content} />
          </div>
        </section>
      ) : null}

      {page.timeline.length > 0 ? (
        <AboutTimelineSection title={page.timelineTitle} items={page.timeline} />
      ) : null}

      {hasValues ? (
        <AboutValuesSection
          title={page.valuesTitle}
          values={page.values}
          vision={page.vision}
          mission={page.mission}
        />
      ) : null}

      {page.stats.length > 0 ? (
        <AboutStatsSection title={page.statsTitle} stats={page.stats} />
      ) : null}

      {page.showTestimonials ? <TestimonialsSection /> : null}

      {page.logos.length > 0 ? (
        <AboutLogosSection title={page.logosTitle} logos={page.logos} />
      ) : null}

      <QuoteSection />
      <Footer />
    </>
  );
}
