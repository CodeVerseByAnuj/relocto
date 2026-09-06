import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mirrors src/constants/servicesDetail.ts, with lucide icon names as strings.
const services = [
  {
    slug: "household-shifting",
    title: "Household Shifting",
    icon: "Home",
    image: "/images/service2.png",
    description:
      "End-to-end home relocation with professional packing, safe transport, and doorstep delivery — anywhere in India.",
    features: [
      "Free pre-move site survey",
      "Premium packing materials",
      "GPS-tracked dedicated trucks",
      "Damage-free delivery guarantee",
    ],
    category: "Relocation",
    order: 1,
  },
  {
    slug: "office-corporate-relocation",
    title: "Office & Corporate Relocation",
    icon: "Building2",
    image: "/images/service3.png",
    description:
      "Minimal-downtime relocation for workstations, files, and IT assets — planned and executed with a dedicated move manager.",
    features: [
      "Dedicated move manager",
      "IT & asset inventory tagging",
      "Weekend & after-hours execution",
      "Same-day setup support",
    ],
    category: "Relocation",
    order: 2,
  },
  {
    slug: "international-relocation",
    title: "International Relocation",
    icon: "Globe2",
    image: "/images/service4.png",
    description:
      "Door-to-door global moving with customs documentation, air & sea freight, and destination support.",
    features: [
      "Customs clearance assistance",
      "Air & sea freight options",
      "Door-to-door shipment tracking",
      "Destination unpacking support",
    ],
    category: "Relocation",
    order: 3,
  },
  {
    slug: "vehicle-transportation",
    title: "Vehicle Transportation",
    icon: "Car",
    image: "/images/service5.png",
    description:
      "Secure car and bike transport using enclosed carriers, with real-time tracking and insurance cover.",
    features: [
      "Enclosed carrier transport",
      "Real-time GPS tracking",
      "Transit insurance available",
      "Pan-India delivery network",
    ],
    category: "Transport",
    order: 4,
  },
  {
    slug: "pet-relocation",
    title: "Pet Relocation",
    icon: "PawPrint",
    image: "/images/service1.png",
    description:
      "Safe, stress-free transport for your pets with trained handlers, proper documentation, and comfortable travel crates.",
    features: [
      "IATA-compliant travel crates",
      "Vaccination & health documentation support",
      "Trained pet handling staff",
      "Door-to-door pet transport",
    ],
    category: "Transport",
    order: 5,
  },
  {
    slug: "warehousing-storage",
    title: "Warehousing & Storage",
    icon: "Warehouse",
    description:
      "Short and long-term storage in secure, monitored warehouses for household and business goods.",
    features: [
      "CCTV-monitored facilities",
      "Climate-controlled storage",
      "Flexible short & long-term plans",
      "Easy pickup on demand",
    ],
    category: "Storage",
    order: 6,
  },
  {
    slug: "packing-unpacking",
    title: "Packing & Unpacking",
    icon: "PackageCheck",
    description:
      "Skilled crews use export-quality materials to pack, label, and unpack your belongings safely.",
    features: [
      "Export-quality packing material",
      "Category-wise labeling",
      "Fragile & electronics handling",
      "Full unpacking assistance",
    ],
    category: "Add-on",
    order: 7,
  },
  {
    slug: "loading-unloading",
    title: "Loading & Unloading",
    icon: "Truck",
    description:
      "Trained manpower and the right equipment ensure quick, careful loading and unloading at every stop.",
    features: [
      "Trained loading crew",
      "Trolleys & lifting equipment",
      "Careful handling protocols",
      "On-time scheduling",
    ],
    category: "Add-on",
    order: 8,
  },
  {
    slug: "insurance-transit-protection",
    title: "Insurance & Transit Protection",
    icon: "ShieldCheck",
    description:
      "Optional transit risk coverage for complete peace of mind, from pickup to final delivery.",
    features: [
      "Optional transit insurance",
      "Coverage for high-value items",
      "Simple claims assistance",
      "Transparent policy terms",
    ],
    category: "Add-on",
    order: 9,
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
