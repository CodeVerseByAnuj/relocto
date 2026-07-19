import type { StatItem } from "@/types/sections";

export const COVERAGE_SECTION = {
  eyebrow: "Global Coverage",
  title: "Wherever You're Headed, We're Already There",
  description:
    "A relocation network spanning six continents, so your move is handled with local expertise at both ends.",
} as const;

export const COVERAGE_STATS: StatItem[] = [
  { value: "50+", label: "Countries" },
  { value: "120+", label: "Cities" },
  { value: "10,000+", label: "Successful Relocations" },
  { value: "6", label: "Continents Covered" },
];

export const COVERAGE_REGIONS: string[] = [
  "North America",
  "Europe",
  "Middle East",
  "Asia Pacific",
  "Africa",
  "South America",
];
