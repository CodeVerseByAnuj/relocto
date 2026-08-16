import {
  Building2,
  Car,
  Globe2,
  Home,
  PackageCheck,
  PawPrint,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import type { ServiceDetailItem } from "@/types/sections";

export const SERVICES_PAGE_HERO = {
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Services" }],
  eyebrow: "What We Offer",
  title: "Our Packers & Movers Services",
  description:
    "From household shifting to global corporate relocation, Relocato delivers structured, insured, and on-time moving solutions across India and beyond.",
} as const;

export const SERVICES_DETAIL_SECTION = {
  eyebrow: "Complete Moving Solutions",
  title: "Everything You Need, Under One Roof",
  description:
    "Handpicked crews, tracked trucks, and transparent pricing — every service is backed by our end-to-end move management.",
} as const;

export const SERVICES_DETAIL: ServiceDetailItem[] = [
  {
    icon: Home,
    title: "Household Shifting",
    description:
      "End-to-end home relocation with professional packing, safe transport, and doorstep delivery — anywhere in India.",
    features: [
      "Free pre-move site survey",
      "Premium packing materials",
      "GPS-tracked dedicated trucks",
      "Damage-free delivery guarantee",
    ],
  },
  {
    icon: Building2,
    title: "Office & Corporate Relocation",
    description:
      "Minimal-downtime relocation for workstations, files, and IT assets — planned and executed with a dedicated move manager.",
    features: [
      "Dedicated move manager",
      "IT & asset inventory tagging",
      "Weekend & after-hours execution",
      "Same-day setup support",
    ],
  },
  {
    icon: Globe2,
    title: "International Relocation",
    description:
      "Door-to-door global moving with customs documentation, air & sea freight, and destination support.",
    features: [
      "Customs clearance assistance",
      "Air & sea freight options",
      "Door-to-door shipment tracking",
      "Destination unpacking support",
    ],
  },
  {
    icon: Car,
    title: "Vehicle Transportation",
    description:
      "Secure car and bike transport using enclosed carriers, with real-time tracking and insurance cover.",
    features: [
      "Enclosed carrier transport",
      "Real-time GPS tracking",
      "Transit insurance available",
      "Pan-India delivery network",
    ],
  },
  {
    icon: PawPrint,
    title: "Pet Relocation",
    description:
      "Safe, stress-free transport for your pets with trained handlers, proper documentation, and comfortable travel crates.",
    features: [
      "IATA-compliant travel crates",
      "Vaccination & health documentation support",
      "Trained pet handling staff",
      "Door-to-door pet transport",
    ],
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage",
    description:
      "Short and long-term storage in secure, monitored warehouses for household and business goods.",
    features: [
      "CCTV-monitored facilities",
      "Climate-controlled storage",
      "Flexible short & long-term plans",
      "Easy pickup on demand",
    ],
  },
  {
    icon: PackageCheck,
    title: "Packing & Unpacking",
    description:
      "Skilled crews use export-quality materials to pack, label, and unpack your belongings safely.",
    features: [
      "Export-quality packing material",
      "Category-wise labeling",
      "Fragile & electronics handling",
      "Full unpacking assistance",
    ],
  },
  {
    icon: Truck,
    title: "Loading & Unloading",
    description:
      "Trained manpower and the right equipment ensure quick, careful loading and unloading at every stop.",
    features: [
      "Trained loading crew",
      "Trolleys & lifting equipment",
      "Careful handling protocols",
      "On-time scheduling",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Insurance & Transit Protection",
    description:
      "Optional transit risk coverage for complete peace of mind, from pickup to final delivery.",
    features: [
      "Optional transit insurance",
      "Coverage for high-value items",
      "Simple claims assistance",
      "Transparent policy terms",
    ],
  },
];
