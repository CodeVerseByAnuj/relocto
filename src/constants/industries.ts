import {
  Building2,
  Factory,
  Globe2,
  Landmark,
  Monitor,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import type { IndustryItem, StatWithIcon } from "@/types/sections";

export const INDUSTRIES_SECTION = {
  heading: {
    prefix: "Relocation Expertise,",
    highlight: "Across Industries.",
  },
  description:
    "Tailored relocation solution for businesses of every size. Different industries. Same commitment to excellence.",
} as const;

export const INDUSTRIES: IndustryItem[] = [
  {
    icon: Factory,
    image: "/images/relocate1.png",
    title: "Manufacturing",
    description:
      "Safe and efficient relocation of plants, heavy equipment, and operational assets.",
  },
  {
    icon: ShoppingBag,
    image: "/images/relocate2.png",
    title: "Retail Chains",
    description:
      "Seamless store transitions that minimize downtime and keep your business moving.",
  },
  {
    icon: Monitor,
    image: "/images/relocate3.png",
    title: "IT & Technology",
    description:
      "Secure relocation of IT infrastructure, workstations, and data-critical assets.",
  },
  {
    icon: Landmark,
    image: "/images/relocate4.png",
    title: "Banking & Financial Services",
    description:
      "Secure, compliant relocation with strict confidentiality and minimal disruption.",
  },
  {
    icon: Users,
    image: "/images/relocate5.png",
    title: "Consulting Firms",
    description:
      "Flexible and efficient relocation solutions for dynamic, fast-moving teams.",
  },
  {
    icon: Building2,
    image: "/images/relocate6.png",
    title: "Global Enterprises",
    description:
      "End-to-end relocation support across cities, countries, and continents.",
  },
];

export const INDUSTRY_STATS: StatWithIcon[] = [
  { icon: Users, value: "250+", label: "Corporate Clients" },
  { icon: PackageCheck, value: "10,000+", label: "Moves Executed" },
  { icon: Globe2, value: "50+", label: "Cities Worldwide" },
  { icon: ShieldCheck, value: "98%", label: "Customer Satisfaction" },
];
