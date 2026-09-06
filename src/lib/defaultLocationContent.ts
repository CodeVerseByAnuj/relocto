import type { LocationContentParsed } from "@/lib/schemas/location";

type DefaultContent = Omit<LocationContentParsed, "slug" | "city" | "state">;

const DEFAULT_SERVICES: DefaultContent["services"] = [
  {
    icon: "Home",
    imageUrl: null,
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
    icon: "Building2",
    imageUrl: null,
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
    icon: "Globe2",
    imageUrl: null,
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
    icon: "Car",
    imageUrl: null,
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
    icon: "PawPrint",
    imageUrl: null,
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
    icon: "Warehouse",
    imageUrl: null,
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
    icon: "PackageCheck",
    imageUrl: null,
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
    icon: "Truck",
    imageUrl: null,
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
    icon: "ShieldCheck",
    imageUrl: null,
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

const DEFAULT_FEATURES: DefaultContent["features"] = [
  {
    icon: "UserCog",
    title: "Dedicated Move Managers",
    description: "Single point coordination for streamlined communication.",
  },
  {
    icon: "ClipboardList",
    title: "Structured Execution Process",
    description: "Professionally managed SOP-based relocation handling.",
  },
  {
    icon: "MapPinned",
    title: "PAN India Operational Reach",
    description: "Serving relocations across major cities and regions.",
  },
  {
    icon: "PackageCheck",
    title: "Premium Packing Standards",
    description: "High-quality materials & organized handling practices.",
  },
  {
    icon: "Gauge",
    title: "Minimal Operational Disruption",
    description: "Efficient execution planning for smooth transitions.",
  },
  {
    icon: "ShieldCheck",
    title: "Transit Risk Protection Support",
    description: "Optional transit risk coverage for added peace of mind.",
  },
  {
    icon: "Wrench",
    title: "Professional Installation Coordination",
    description: "Support for appliance handling & reinstallation requirements.",
  },
];

/**
 * Full starting content for a location, mirroring the copy the page used to
 * render from constants. Used by the seed script and the "new location" flow so
 * a fresh location looks complete and is then tweaked in the admin panel.
 */
export function buildDefaultLocationContent(args: {
  city: string;
  state: string;
  description?: string;
  areas?: string[];
}): DefaultContent {
  const { city, state } = args;
  const description =
    args.description ??
    `Reliable household and office shifting across ${city} and nearby areas, with dedicated crews for homes, offices and high-rise societies.`;

  return {
    published: true,
    order: 0,
    metaTitle: `Packers and Movers in ${city} | Relocato`,
    metaDescription: `${description} Get a free, no-obligation quote for household shifting, office relocation, and more in ${city}, ${state}.`,

    heroBadge: `Packers & Movers in ${city}`,
    heroTitle: `Reliable Packers & Movers in ${city}, ${state}`,
    heroDescription: description,
    heroPrimaryCtaLabel: "Get a Free Quote",
    heroPrimaryCtaHref: "#contact",
    heroPhone: null,
    heroImageUrl: null,

    servicesEyebrow: "Complete Moving Solutions",
    servicesTitle: "Everything You Need, Under One Roof",
    servicesDescription:
      "Handpicked crews, tracked trucks, and transparent pricing — every service is backed by our end-to-end move management.",

    areasTitle: `Areas We Cover in ${city}`,
    areasDescription: `Wherever you are in ${city}, our local teams are ready to help you move.`,
    areas: args.areas ?? [],

    whyTitle: "Why Corporates & Families Choose Relocato Global",
    whyHighlight: "Relocato Global",

    quoteBadge: "India's Most Trusted Logistics",
    quoteHeading: "Hassle-Free Packers & Movers at Best Prices",
    quoteDescription:
      "Compare quotes and book trusted movers instantly. We handle the heavy lifting while you focus on your new beginning.",

    services: DEFAULT_SERVICES.map((s) => ({ ...s, features: [...s.features] })),
    features: DEFAULT_FEATURES.map((f) => ({ ...f })),
  };
}
