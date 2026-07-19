import {
  ClipboardList,
  Gauge,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  UserCog,
  Wrench,
} from "lucide-react";
import type { FeatureItem, StatItem } from "@/types/sections";

export const FEATURES_SECTION = {
  heading: {
    prefix: "Why Corporates & Families Choose",
    highlight: "Relocato Global",
  },
} as const;

export const FEATURES: FeatureItem[] = [
  {
    icon: UserCog,
    title: "Dedicated Move Managers",
    description: "Single point coordination for streamlined communication.",
  },
  {
    icon: ClipboardList,
    title: "Structured Execution Process",
    description: "Professionally managed SOP-based relocation handling.",
  },
  {
    icon: MapPinned,
    title: "PAN India Operational Reach",
    description: "Serving relocations across major cities and regions.",
  },
  {
    icon: PackageCheck,
    title: "Premium Packing Standards",
    description: "High-quality materials & organized handling practices.",
  },
  {
    icon: Gauge,
    title: "Minimal Operational Disruption",
    description: "Efficient execution planning for smooth transitions.",
  },
  {
    icon: ShieldCheck,
    title: "Transit Risk Protection Support",
    description: "Optional transit risk coverage for added peace of mind.",
  },
  {
    icon: Wrench,
    title: "Professional Installation Coordination",
    description:
      "Support for appliance handling & reinstallation requirements.",
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
