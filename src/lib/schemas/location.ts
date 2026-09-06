import { z } from "zod";

const trimmed = z.string().trim();
const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : null));

const slug = trimmed
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");

export const serviceItemSchema = z.object({
  icon: optionalText,
  imageUrl: optionalText,
  title: trimmed.min(1, "Service title is required"),
  description: trimmed.min(1, "Service description is required"),
  features: z.array(trimmed.min(1)).default([]),
});

export const featureItemSchema = z.object({
  icon: optionalText,
  title: trimmed.min(1, "Feature title is required"),
  description: trimmed.min(1, "Feature description is required"),
});

export const locationContentSchema = z.object({
  slug,
  city: trimmed.min(1, "City is required"),
  state: trimmed.min(1, "State is required"),
  published: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),

  metaTitle: optionalText,
  metaDescription: optionalText,

  heroBadge: trimmed.min(1, "Hero badge is required"),
  heroTitle: trimmed.min(1, "Hero title is required"),
  heroDescription: trimmed.min(1, "Hero description is required"),
  heroPrimaryCtaLabel: trimmed.min(1).default("Get a Free Quote"),
  heroPrimaryCtaHref: trimmed.min(1).default("#contact"),
  heroPhone: optionalText,
  heroImageUrl: optionalText,

  servicesEyebrow: trimmed.min(1, "Services eyebrow is required"),
  servicesTitle: trimmed.min(1, "Services title is required"),
  servicesDescription: trimmed.min(1, "Services description is required"),

  areasTitle: trimmed.min(1, "Areas title is required"),
  areasDescription: trimmed.min(1, "Areas description is required"),
  areas: z.array(trimmed.min(1)).default([]),

  whyTitle: trimmed.min(1, "Why-choose-us title is required"),
  whyHighlight: optionalText,

  quoteBadge: trimmed.min(1, "Quote badge is required"),
  quoteHeading: trimmed.min(1, "Quote heading is required"),
  quoteDescription: trimmed.min(1, "Quote description is required"),

  services: z.array(serviceItemSchema).default([]),
  features: z.array(featureItemSchema).default([]),
});

export type LocationContentInput = z.input<typeof locationContentSchema>;
export type LocationContentParsed = z.output<typeof locationContentSchema>;

export const createLocationSchema = z.object({
  slug,
  city: trimmed.min(1, "City is required"),
  state: trimmed.min(1, "State is required"),
});

/** Payload accepted by POST /api/admin/locations/[slug] for bulk service adds. */
export const bulkServicesSchema = z.object({
  services: z.array(serviceItemSchema).min(1, "Provide at least one service"),
});
