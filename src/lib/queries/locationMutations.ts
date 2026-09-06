import { revalidatePath } from "next/cache";
import type { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  serviceItemSchema,
  type LocationContentParsed,
} from "@/lib/schemas/location";

type ServiceItem = z.output<typeof serviceItemSchema>;

function scalarFields(data: LocationContentParsed) {
  const { services: _services, features: _features, ...scalars } = data;
  void _services;
  void _features;
  return scalars;
}

/** Revalidate every surface that renders this location's content. */
export function revalidateLocation(slug: string) {
  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");
}

export async function createLocationFromContent(data: LocationContentParsed) {
  const location = await prisma.location.create({
    data: {
      ...scalarFields(data),
      services: {
        create: data.services.map((service, index) => ({
          ...service,
          order: index,
        })),
      },
      features: {
        create: data.features.map((feature, index) => ({
          ...feature,
          order: index,
        })),
      },
    },
  });
  revalidateLocation(location.slug);
  return location;
}

export async function saveLocationContent(
  id: string,
  data: LocationContentParsed
) {
  const previous = await prisma.location.findUnique({
    where: { id },
    select: { slug: true },
  });

  const location = await prisma.$transaction(async (tx) => {
    await tx.locationService.deleteMany({ where: { locationId: id } });
    await tx.locationFeature.deleteMany({ where: { locationId: id } });
    return tx.location.update({
      where: { id },
      data: {
        ...scalarFields(data),
        services: {
          create: data.services.map((service, index) => ({
            ...service,
            order: index,
          })),
        },
        features: {
          create: data.features.map((feature, index) => ({
            ...feature,
            order: index,
          })),
        },
      },
    });
  });

  if (previous && previous.slug !== location.slug) {
    revalidateLocation(previous.slug);
  }
  revalidateLocation(location.slug);
  return location;
}

/** Append services to an existing location (used by the bulk-add API). */
export async function addLocationServices(
  locationId: string,
  slug: string,
  services: ServiceItem[]
) {
  const existing = await prisma.locationService.count({ where: { locationId } });
  const created = await prisma.$transaction(
    services.map((service, index) =>
      prisma.locationService.create({
        data: { ...service, locationId, order: existing + index },
      })
    )
  );
  revalidateLocation(slug);
  return created;
}
