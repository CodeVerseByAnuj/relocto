import type { ServiceShowcaseItem } from "@/types/sections";

export const SERVICES_SHOWCASE_SECTION = {
  eyebrow: "Our Services",
  title: "Our Relocation & Mobility Services",
} as const;

/** The two home page panels. The slug links each one to its admin category. */
export const SERVICES_SHOWCASE: ServiceShowcaseItem[] = [
  {
    slug: "individuals-families",
    image: "/images/service2.png",
    title: "Individuals & Families",
    description:
      "Handpicked crews, tracked trucks, and transparent pricing for every kind of move.",
    href: "/services/individuals-families",
    links: [
      {
        label: "Household Shifting",
        href: "/services/individuals-families/household-shifting",
      },
      {
        label: "International Relocation",
        href: "/services/individuals-families/international-relocation",
      },
      {
        label: "Vehicle Transportation",
        href: "/services/individuals-families/vehicle-transportation",
      },
    ],
  },
  {
    slug: "corporate-services",
    image: "/images/service1.png",
    title: "Corporate Services",
    description:
      "Relocation programmes for businesses — from a single workstation to an entire workforce.",
    href: "/services/corporate-services",
    links: [
      {
        label: "Office Relocation",
        href: "/services/corporate-services/office-relocation",
      },
      {
        label: "Corporate Move Management",
        href: "/services/corporate-services/corporate-move-management",
      },
    ],
  },
];
