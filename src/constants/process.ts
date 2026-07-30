import type { ProcessStep } from "@/types/sections";

export const PROCESS_SECTION = {
  title: "The Relocato Method",
  subtitle: "Three simple steps to a stress-free move.",
} as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Mobility Planning",
    description:
      "Comprehensive audit of assets and spatial planning of the destination site.",
    image: "/images/service6.png",
  },
  {
    step: "02",
    title: "Pre-Move Survey",
    description:
      "Allocating premium logistics tech and specialized relocation specialists.",
    image: "/images/service4.png",
  },
  {
    step: "03",
    title: "Packing & Handling Standards",
    description: "High-grade protective architecture for high-value assets.",
    image: "/images/service3.png",
  },
  {
    step: "04",
    title: "Transportation & Tracking",
    description:
      "Real-time tracking and climate-controlled secure transport networks.",
    image: "/images/service5.png",
  },
  {
    step: "05",
    title: "Delivery & Settling Support",
    description:
      "White-glove unpacking and exact placement as per architecture plan.",
    image: "/images/service2.png",
  },
];

export const PROCESS_CTA = {
  title: "Ready for a Precision Move?",
  description:
    "Experience the difference of architectural relocation. Our team of experts is ready to map out your next move with millimetre precision.",
  cta: { label: "Start Planning", href: "/#contact" },
} as const;
