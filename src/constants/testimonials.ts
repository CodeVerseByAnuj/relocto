import type { Testimonial } from "@/types/sections";

export const TESTIMONIALS_SECTION = {
  eyebrow: "Client Stories",
  title: "What Our Happy Clients Say",
  description:
    "Trusted by corporates and families for structured, stress-free relocations.",
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Relocato managed our entire office move over a single weekend with zero disruption to operations. Every milestone was communicated clearly.",
    author: "Corporate Relocation Client",
    role: "Office Relocation, Delhi to Bengaluru",
  },
  {
    quote:
      "Our international move involved customs, storage, and delivery across two countries. The team handled every detail so we didn't have to worry.",
    author: "Household Move Client",
    role: "International Relocation, Delhi to Singapore",
  },
  {
    quote:
      "Transparent pricing, insured handling, and a dedicated point of contact throughout — exactly what we needed for our mobility program.",
    author: "HR Mobility Lead",
    role: "Corporate Mobility Program",
  },
];
