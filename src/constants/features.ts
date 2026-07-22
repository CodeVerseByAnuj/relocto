import {
  ClipboardList,
  Gauge,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  UserCog,
  Wrench,
} from "lucide-react";
import type { FeatureItem } from "@/types/sections";

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
