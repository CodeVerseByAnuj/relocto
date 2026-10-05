/**
 * Starter service categories, inserted by `npm run db:seed` when a category
 * with the same slug does not exist yet. After that the admin panel
 * (/admin/services) is the source of truth.
 */
export interface DefaultServiceCategory {
  slug: string;
  name: string;
  description: string;
  services: {
    icon: string;
    title: string;
    description: string;
    features: string[];
  }[];
}

export const DEFAULT_SERVICE_CATEGORIES: DefaultServiceCategory[] = [
  {
    slug: "moving-services",
    name: "Moving Services",
    description:
      "Handpicked crews, tracked trucks, and transparent pricing for every kind of move.",
    services: [
      {
        icon: "Home",
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
        icon: "Globe2",
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
    ],
  },
  {
    slug: "corporate-services",
    name: "Corporate Services",
    description:
      "Relocation programmes for businesses — from a single workstation to an entire workforce.",
    services: [
      {
        icon: "Building2",
        title: "Office Relocation",
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
        icon: "Users",
        title: "Employee Relocation",
        description:
          "Managed household moves for transferring employees, with one point of contact for HR and consolidated billing.",
        features: [
          "Single point of contact for HR",
          "Policy-based move packages",
          "Consolidated corporate invoicing",
          "Move status reporting",
        ],
      },
      {
        icon: "Briefcase",
        title: "Corporate Move Management",
        description:
          "End-to-end planning and reporting for recurring corporate moves across cities and countries.",
        features: [
          "Annual rate contracts",
          "Dedicated account manager",
          "Pan-India and global coverage",
          "Service-level tracking",
        ],
      },
    ],
  },
  {
    slug: "destination-services",
    name: "Destination Services",
    description:
      "On-ground support that helps families and employees settle into a new city.",
    services: [
      {
        icon: "KeyRound",
        title: "Home Search",
        description:
          "Shortlisted rental homes that match your budget, commute, and lifestyle, with accompanied viewings.",
        features: [
          "Needs-based shortlisting",
          "Accompanied property viewings",
          "Lease negotiation support",
          "Move-in inspection",
        ],
      },
      {
        icon: "GraduationCap",
        title: "School Search",
        description:
          "Guidance on schools and admissions so children settle in without losing an academic year.",
        features: [
          "School shortlisting by curriculum",
          "Campus visit coordination",
          "Admission paperwork assistance",
        ],
      },
      {
        icon: "Compass",
        title: "Orientation & Settling-In",
        description:
          "A guided introduction to your new city — neighbourhoods, utilities, banking, and everyday essentials.",
        features: [
          "Area orientation tour",
          "Utility & internet setup",
          "Local registration guidance",
        ],
      },
      {
        icon: "FileCheck",
        title: "Visa & Immigration Assistance",
        description:
          "Documentation support for cross-border moves, coordinated with your relocation timeline.",
        features: [
          "Document checklist & review",
          "Application coordination",
          "Timeline tracking",
        ],
      },
    ],
  },
];
