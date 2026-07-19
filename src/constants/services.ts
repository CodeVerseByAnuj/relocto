import {
  Building2,
  Globe2,
  Home,
  Truck,
  Warehouse,
  Briefcase,
} from "lucide-react";
import type { ServiceItem } from "@/types/sections";

export const SERVICES_SECTION = {
  eyebrow: "What We Do",
  title: "Our Relocation & Mobility Services",
  description:
    "End-to-end relocation support for corporates and families, delivered with structured planning and dedicated coordination at every step.",
} as const;

export const SERVICES: ServiceItem[] = [
  {
    icon: Globe2,
    title: "International Relocation",
    description:
      "Door-to-door moves across borders, backed by customs expertise and a trusted global partner network.",
  },
  {
    icon: Home,
    title: "Domestic Household Moving",
    description:
      "Careful packing, loading & transport for household relocations to any city across India.",
  },
  {
    icon: Building2,
    title: "Office & Corporate Relocation",
    description:
      "Structured, low-downtime moves for offices, planned around your business continuity needs.",
  },
  {
    icon: Truck,
    title: "Vehicle Transportation",
    description:
      "Secure car and bike transport with real-time tracking across cities and countries.",
  },
  {
    icon: Warehouse,
    title: "Storage & Warehousing",
    description:
      "Short and long-term secure storage solutions for household and commercial goods.",
  },
  {
    icon: Briefcase,
    title: "Corporate Mobility Programs",
    description:
      "End-to-end assignment management designed for corporate mobility & HR teams.",
  },
];
