import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ServiceCategoryParsed } from "@/lib/schemas/serviceCategory";

/** The header dropdown is on every public page, so revalidate all of them. */
export function revalidateServiceCategories() {
  revalidatePath("/", "layout");
}

export async function createServiceCategory(data: {
  slug: string;
  name: string;
}) {
  const last = await prisma.serviceCategory.aggregate({ _max: { order: true } });
  return prisma.serviceCategory.create({
    data: { ...data, published: false, order: (last._max.order ?? -1) + 1 },
  });
}

export async function saveServiceCategory(
  id: string,
  data: ServiceCategoryParsed
) {
  const { services, ...scalars } = data;

  const category = await prisma.$transaction(async (tx) => {
    await tx.service.deleteMany({ where: { categoryId: id } });
    return tx.serviceCategory.update({
      where: { id },
      data: {
        ...scalars,
        services: {
          create: services.map((service, index) => ({
            ...service,
            order: index,
          })),
        },
      },
    });
  });

  revalidateServiceCategories();
  return category;
}
