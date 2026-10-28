import { z } from "zod";

const trimmed = z.string().trim();
const rupees = z.coerce
  .number({ message: "Enter a valid amount" })
  .int("Use whole rupees")
  .min(0, "Amount cannot be negative")
  .max(10_000_000, "Amount is too large");

export const pricingSchema = z.object({
  settings: z.object({
    baseCharge: rupees,
    perKmRate: rupees,
    minCharge: rupees,
  }),
  categories: z
    .array(
      z.object({
        name: trimmed.min(1, "Category name is required"),
        items: z
          .array(
            z.object({
              name: trimmed.min(1, "Item name is required"),
              price: rupees,
            })
          )
          .default([]),
      })
    )
    .default([]),
});

export type PricingParsed = z.output<typeof pricingSchema>;
