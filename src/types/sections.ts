import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

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
}

export interface PartnerCategory {
  icon: LucideIcon;
  title: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}
