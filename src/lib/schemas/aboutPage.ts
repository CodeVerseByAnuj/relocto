import { z } from "zod";
import { optionalText, slugSchema } from "@/lib/schemas/location";

const trimmed = z.string().trim();

export const timelineItemSchema = z.object({
  year: trimmed.min(1, "Timeline year is required"),
  title: trimmed.min(1, "Timeline title is required"),
  description: trimmed.default(""),
  imageUrl: optionalText,
});

export const valueItemSchema = z.object({
  title: trimmed.min(1, "Value title is required"),
  description: trimmed.default(""),
});

export const statItemSchema = z.object({
  value: trimmed.min(1, "Number value is required"),
  label: trimmed.min(1, "Number label is required"),
});

export const logoItemSchema = z.object({
  name: trimmed.min(1, "Logo name is required"),
  imageUrl: optionalText,
});

export const aboutPageSchema = z.object({
  slug: slugSchema,
  title: trimmed.min(1, "Page title is required"),
  published: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),

  metaTitle: optionalText,
  metaDescription: optionalText,

  heroDescription: optionalText,
  heroImageUrl: optionalText,

  introEyebrow: optionalText,
  introHeading: optionalText,
  introBody: optionalText,
  introImageUrl: optionalText,

  content: optionalText,

  timelineTitle: optionalText,
  timeline: z.array(timelineItemSchema).default([]),

  valuesTitle: optionalText,
  values: z.array(valueItemSchema).default([]),
  vision: optionalText,
  mission: optionalText,

  statsTitle: optionalText,
  stats: z.array(statItemSchema).default([]),

  logosTitle: optionalText,
  logos: z.array(logoItemSchema).default([]),

  showTestimonials: z.boolean().default(false),
});

export type AboutPageParsed = z.output<typeof aboutPageSchema>;
export type TimelineItem = z.output<typeof timelineItemSchema>;
export type ValueItem = z.output<typeof valueItemSchema>;
export type StatItem = z.output<typeof statItemSchema>;
export type LogoItem = z.output<typeof logoItemSchema>;

/** The four list columns of an AboutPage row, validated. */
const listsSchema = z.object({
  timeline: z.array(timelineItemSchema).catch([]),
  values: z.array(valueItemSchema).catch([]),
  stats: z.array(statItemSchema).catch([]),
  logos: z.array(logoItemSchema).catch([]),
});

/**
 * Turn the Json columns of a database row into typed lists. A list that does
 * not match its shape (e.g. edited by hand in the DB) becomes [] instead of
 * breaking the page.
 */
export function parseAboutLists(row: {
  timeline: unknown;
  values: unknown;
  stats: unknown;
  logos: unknown;
}) {
  return listsSchema.parse(row);
}

export const createAboutPageSchema = z.object({
  title: trimmed.min(1, "Page title is required"),
  /** Optional; generated from the title when left blank. */
  slug: trimmed.optional(),
});
