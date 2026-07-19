import {
  BadgeCheck,
  Clock,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { FeatureItem, StatItem } from "@/types/sections";

export const FEATURES_SECTION = {
  eyebrow: "Relocato Advantage",
  title: "Why Corporate & Families Choose Relocato",
  description:
    "A structured, transparent approach to relocation — built on experience, insured handling, and a global network you can rely on.",
} as const;

export const FEATURES: FeatureItem[] = [
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Years of relocation expertise across corporate and residential moves.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured & Secure",
    description:
      "Comprehensive insurance coverage for complete peace of mind on every move.",
  },
  {
    icon: Globe2,
    title: "Global Network",
    description:
      "Trusted partners worldwide ensure smooth international transitions.",
  },
  {
    icon: Clock,
    title: "24/7 Dedicated Support",
    description:
      "Round-the-clock assistance from initial survey to final delivery.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Pricing",
    description: "No hidden costs — clear, upfront quotes for every service.",
  },
  {
    icon: HeartHandshake,
    title: "Customized Solutions",
    description:
      "Relocation plans tailored to your timeline, budget & requirements.",
  },
];

export const MOBILITY_STATS_SECTION = {
  eyebrow: "Mobility Index",
  title: "India's Fast-Growing Global Mobility Market",
  description:
    "As corporate mobility and cross-border relocation accelerate across India, Relocato delivers the structured, compliant support that HR and mobility teams need.",
} as const;

export const MOBILITY_STATS: StatItem[] = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Corporate Clients" },
  { value: "50+", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
];
