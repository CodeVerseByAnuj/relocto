import {
  Building,
  FileCheck2,
  Landmark,
  ShieldCheck,
  Truck,
  Warehouse,
} from "lucide-react";
import type { PartnerCategory } from "@/types/sections";

export const PARTNERS_SECTION = {
  eyebrow: "Relocation In Partnership",
  title: "Backed by a Trusted Network of Specialists",
  description:
    "We coordinate with a vetted network of partners across every stage of your move, so nothing falls through the cracks.",
} as const;

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  { icon: Truck, title: "Freight & Logistics Partners" },
  { icon: FileCheck2, title: "Customs & Documentation Experts" },
  { icon: ShieldCheck, title: "Insurance Providers" },
  { icon: Warehouse, title: "Storage & Warehousing Partners" },
  { icon: Building, title: "Destination Service Providers" },
  { icon: Landmark, title: "Corporate Housing Networks" },
];
