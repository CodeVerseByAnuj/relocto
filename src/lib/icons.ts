import {
  Briefcase,
  Building2,
  Car,
  ClipboardList,
  Compass,
  FileCheck,
  Gauge,
  Globe2,
  GraduationCap,
  Home,
  KeyRound,
  MapPinned,
  Package,
  PackageCheck,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCog,
  Users,
  Warehouse,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Icon names an admin can pick in the CMS. Stored as strings on
 * Service.icon / LocationService.icon / LocationFeature.icon and resolved back to components
 * here so no arbitrary code is referenced from the database.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Home,
  Building2,
  Globe2,
  Car,
  PawPrint,
  Warehouse,
  PackageCheck,
  Package,
  Truck,
  ShieldCheck,
  Wrench,
  Sparkles,
  Briefcase,
  Users,
  KeyRound,
  GraduationCap,
  Compass,
  FileCheck,
};

export const FEATURE_ICONS: Record<string, LucideIcon> = {
  UserCog,
  ClipboardList,
  MapPinned,
  PackageCheck,
  Gauge,
  ShieldCheck,
  Wrench,
  Building2,
  Truck,
  Sparkles,
};

export const SERVICE_ICON_NAMES = Object.keys(SERVICE_ICONS);
export const FEATURE_ICON_NAMES = Object.keys(FEATURE_ICONS);

export function resolveServiceIcon(name?: string | null): LucideIcon {
  return (name && SERVICE_ICONS[name]) || PackageCheck;
}

export function resolveFeatureIcon(name?: string | null): LucideIcon {
  return (name && FEATURE_ICONS[name]) || Sparkles;
}
