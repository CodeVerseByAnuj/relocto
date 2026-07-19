import type { ProcessStep } from "@/types/sections";

export const PROCESS_SECTION = {
  eyebrow: "How It Works",
  title: "The Relocation Method",
  description:
    "A clear, five-step process that keeps you informed from the first survey to final settling-in.",
} as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Consultation & Survey",
    description:
      "We understand your requirements and conduct a detailed survey — in person or virtual.",
  },
  {
    step: "02",
    title: "Planning & Documentation",
    description:
      "A structured move plan and all customs & compliance documentation is prepared.",
  },
  {
    step: "03",
    title: "Packing & Loading",
    description:
      "Trained crews pack and load using export-grade materials for maximum protection.",
  },
  {
    step: "04",
    title: "Transit & Customs Clearance",
    description:
      "Real-time shipment tracking with dedicated support through transit and clearance.",
  },
  {
    step: "05",
    title: "Delivery & Settling-In",
    description:
      "Unpacking, placement & settling-in support at your new home or office.",
  },
];
