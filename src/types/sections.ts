import type { LucideIcon } from "lucide-react";

export interface ServiceShowcaseItem {
  image: string;
  title: string;
  description: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
}

export interface PartnerCategory {
  icon: LucideIcon;
  title: string;
}

export interface IndustryItem {
  icon: LucideIcon;
  image: string;
  title: string;
  description: string;
}

export interface StatWithIcon {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface MapLocation {
  coordinates: [number, number];
  type: "own" | "partner";
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
