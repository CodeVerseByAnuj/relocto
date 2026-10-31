import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ServicesPageHero } from "@/components/sections/services/ServicesPageHero";
import { ServicesDetailSection } from "@/components/sections/services/ServicesDetailSection";
import { WhyChooseUsSection } from "@/components/sections/features/WhyChooseUsSection";
import { QuoteSection } from "@/components/sections/quote/QuoteSection";
import { SITE_CONFIG } from "@/constants/site";
import { resolveServiceIcon } from "@/lib/icons";
import {
  getPublishedService,
  listPublishedServiceCategories,
  serviceHref,
} from "@/lib/queries/serviceCategory";
import { slugify } from "@/lib/utils";

export const revalidate = 300;
export const dynamicParams = true;

interface ServicePageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const categories = await listPublishedServiceCategories();
  return categories.flatMap((category) =>
    category.services.map((service) => ({
      city: category.slug,
      service: slugify(service.title),
    }))
  );
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { city, service: serviceSlug } = await params;
  const found = await getPublishedService(city, serviceSlug);
  if (!found) return {};

  return {
    title: `${found.service.title} | ${found.category.name} | Relocato`,
    description: found.service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { city, service: serviceSlug } = await params;
  const found = await getPublishedService(city, serviceSlug);
  if (!found) notFound();

  const { category, service } = found;
  const Icon = resolveServiceIcon(service.icon);
  const others = category.services.filter((item) => item.id !== service.id);

  return (
    <>
      <Header />
      <ServicesPageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: category.name, href: `/services/${category.slug}` },
          { label: service.title },
        ]}
        eyebrow={category.name}
        title={service.title}
        description={service.description}
        imageSrc={category.imageUrl ?? undefined}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:items-center lg:px-10">
          {service.imageUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className={service.imageUrl ? undefined : "lg:col-span-2"}>
            <div className="flex size-14 items-center justify-center rounded-xl bg-linear-to-br from-brand-navy-light to-brand-navy-dark text-white">
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-brand-navy">
              What&apos;s included
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>

            {service.features.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-foreground/80"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-brand-navy-light"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button variant="primary" size="xl" render={<a href="#contact" />}>
                Get a Free Quote
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                render={
                  <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />
                }
              >
                <Phone data-icon="inline-start" />
                {SITE_CONFIG.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <ServicesDetailSection
          className="bg-muted/40"
          eyebrow={null}
          title={`More ${category.name}`}
          description={null}
          services={others.map((item) => ({
            href: serviceHref(category, item),
            icon: item.icon,
            imageUrl: item.imageUrl,
            title: item.title,
            description: item.description,
            features: item.features,
          }))}
        />
      ) : null}

      <WhyChooseUsSection />
      <QuoteSection />
      <Footer />
    </>
  );
}
