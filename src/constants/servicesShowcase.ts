import type { ServiceShowcaseItem } from "@/types/sections";

export const SERVICES_SHOWCASE_SECTION = {
  eyebrow: "Our Services",
  title: "Our Relocation & Mobility Services",
} as const;

export const SERVICES_SHOWCASE: ServiceShowcaseItem[] = [
  {
    image: "/images/service1.png",
    title: "Corporate Relocation",
    description: "Employee mobility & transfer support.",
  },
  {
    image: "/images/service2.png",
    title: "Household Relocation",
    description: "Premium domestic moving solutions.",
  },
  {
    image: "/images/service3.png",
    title: "Office Relocation",
    description: "Structured commercial movement execution.",
  },
  {
    image: "/images/service4.png",
    title: "International Relocation",
    description: "Global moving & transition assistance.",
  },
  {
    image: "/images/service5.png",
    title: "Vehicle Transportation",
    description: "Secure car & bike relocation support.",
  },
  {
    image: "/images/service6.png",
    title: "Mobility Coordination",
    description: "Dedicated planning & move management.",
  },
];
