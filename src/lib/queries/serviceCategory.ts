import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { ServiceMenuCategory } from "@/types/navigation";

export type ServiceCategoryWithServices = Prisma.ServiceCategoryGetPayload<{
  include: { services: true };
}>;

/**
 * Published categories that have at least one service, in display order.
 * Returns [] when the database is unreachable so the header and /services
 * fall back to their static content. Cached per request.
 */
export const listPublishedServiceCategories = cache(
  async (): Promise<ServiceCategoryWithServices[]> => {
    try {
      return await prisma.serviceCategory.findMany({
        where: { published: true, services: { some: {} } },
        orderBy: [{ order: "asc" }, { name: "asc" }],
        include: { services: { orderBy: { order: "asc" } } },
      });
    } catch {
      return [];
    }
  }
);

/** One published category with its services, for /services/[slug], or null. */
export async function getPublishedServiceCategory(slug: string) {
  const categories = await listPublishedServiceCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

/** Services have no slug column: their page URL is derived from the title. */
export function serviceHref(
  category: { slug: string },
  service: { title: string }
) {
  return `/services/${category.slug}/${slugify(service.title)}`;
}

/** One service of a published category, for /services/[category]/[service]. */
export async function getPublishedService(
  categorySlug: string,
  serviceSlug: string
) {
  const category = await getPublishedServiceCategory(categorySlug);
  const service = category?.services.find(
    (item) => slugify(item.title) === serviceSlug
  );
  return category && service ? { category, service } : null;
}

/** Published categories shaped for the header "Services" dropdown. */
export async function getServiceMenu(): Promise<ServiceMenuCategory[]> {
  const categories = await listPublishedServiceCategories();
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    href: `/services/${category.slug}`,
  }));
}
