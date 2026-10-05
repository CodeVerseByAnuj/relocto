import { z } from "zod";
import { serviceItemSchema, slugSchema } from "@/lib/schemas/location";

const trimmed = z.string().trim();

export const serviceCategorySchema = z.object({
  slug: slugSchema,
  name: trimmed.min(1, "Category name is required"),
  description: trimmed
    .optional()
    .transform((v) => (v ? v : null)),
  published: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
  services: z.array(serviceItemSchema).default([]),
});

export type ServiceCategoryParsed = z.output<typeof serviceCategorySchema>;

export const createServiceCategorySchema = z.object({
  slug: slugSchema,
  name: trimmed.min(1, "Category name is required"),
});
