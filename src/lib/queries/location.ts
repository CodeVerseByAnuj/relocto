import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type LocationWithContent = Prisma.LocationGetPayload<{
  include: {
    services: true;
    features: true;
  };
}>;

export type LocationListItem = Pick<
  Prisma.LocationGetPayload<object>,
  "id" | "slug" | "city" | "state" | "order"
>;

const serviceOrder = { order: "asc" } as const;

/** Full content for one published location page, or null. */
export function getPublishedLocation(
  slug: string
): Promise<LocationWithContent | null> {
  return prisma.location.findFirst({
    where: { slug, published: true },
    include: {
      services: { orderBy: serviceOrder },
      features: { orderBy: serviceOrder },
    },
  });
}

/** Lightweight list of published locations for the switcher / grid. */
export function listPublishedLocations(): Promise<LocationListItem[]> {
  return prisma.location.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { city: "asc" }],
    select: { id: true, slug: true, city: true, state: true, order: true },
  });
}

export function listPublishedSlugs(): Promise<{ slug: string }[]> {
  return prisma.location.findMany({
    where: { published: true },
    select: { slug: true },
  });
}

/** City/state/areas for every published location — feeds the location search. */
export function listLocationSearchEntries(): Promise<
  { slug: string; city: string; state: string; areas: string[] }[]
> {
  return prisma.location.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { city: "asc" }],
    select: { slug: true, city: true, state: true, areas: true },
  });
}
