import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PricingParsed } from "@/lib/schemas/pricing";

const SETTINGS_ID = "default";

export async function getPricing() {
  const [categories, settings] = await Promise.all([
    prisma.itemCategory.findMany({
      orderBy: { order: "asc" },
      include: { items: { orderBy: { order: "asc" } } },
    }),
    prisma.pricingSettings.findUnique({ where: { id: SETTINGS_ID } }),
  ]);

  return {
    categories,
    settings: settings ?? { id: SETTINGS_ID, baseCharge: 0, perKmRate: 0, minCharge: 0 },
  };
}

export type PricingData = Awaited<ReturnType<typeof getPricing>>;

/** Replaces the whole price list in one transaction. */
export async function savePricing({ settings, categories }: PricingParsed) {
  await prisma.$transaction(async (tx) => {
    await tx.pricingSettings.upsert({
      where: { id: SETTINGS_ID },
      create: { id: SETTINGS_ID, ...settings },
      update: settings,
    });

    await tx.itemCategory.deleteMany();
    for (const [categoryIndex, category] of categories.entries()) {
      await tx.itemCategory.create({
        data: {
          name: category.name,
          order: categoryIndex,
          items: {
            create: category.items.map((item, itemIndex) => ({
              ...item,
              order: itemIndex,
            })),
          },
        },
      });
    }
  });

  revalidatePath("/get-quote");
}
