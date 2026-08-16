import type { LocationItem } from "@/types/locations";

export const LOCATIONS_SECTION = {
  eyebrow: "PAN India Presence",
  title: "Packers & Movers Near You",
  description:
    "Local teams, local knowledge — pick your city to see relocation services tailored to your area.",
} as const;

export const LOCATIONS: LocationItem[] = [
  {
    slug: "delhi",
    city: "Delhi",
    state: "Delhi",
    description:
      "Our headquarters city — priority scheduling, our largest fleet, and the fastest response times for household and office moves across Delhi NCR.",
    areas: ["Dwarka", "Rohini", "Saket", "Karol Bagh", "Connaught Place", "Vasant Kunj"],
    image: "/images/relocate1.png",
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    state: "Haryana",
    description:
      "Corporate-grade relocation for Gurugram's business hubs and residential towers, with after-hours execution for offices.",
    areas: ["DLF Cyber City", "Sohna Road", "MG Road", "Sector 29", "Golf Course Road"],
    image: "/images/relocate2.png",
  },
  {
    slug: "noida",
    city: "Noida",
    state: "Uttar Pradesh",
    description:
      "Reliable household and office shifting across Noida and Greater Noida, with dedicated crews for high-rise societies.",
    areas: ["Sector 62", "Sector 18", "Greater Noida", "Noida Extension", "Sector 137"],
    image: "/images/relocate3.png",
  },
  {
    slug: "mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    description:
      "Door-to-door household and office relocation across Mumbai's suburbs, with narrow-lane and high-rise moving expertise.",
    areas: ["Andheri", "Bandra", "Powai", "Thane", "Navi Mumbai", "Borivali"],
    image: "/images/relocate4.png",
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    description:
      "Tech-park to tech-park office relocation and home shifting across Bengaluru, built for tight timelines.",
    areas: ["Whitefield", "Koramangala", "Electronic City", "Indiranagar", "HSR Layout"],
    image: "/images/relocate5.png",
  },
  {
    slug: "pune",
    city: "Pune",
    state: "Maharashtra",
    description:
      "Structured relocation services for Pune's IT corridors and residential townships.",
    areas: ["Hinjewadi", "Kharadi", "Baner", "Viman Nagar", "Wakad"],
    image: "/images/relocate6.png",
  },
  {
    slug: "hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    description:
      "Professional packers and movers for Hyderabad's business districts and gated communities.",
    areas: ["Hitech City", "Gachibowli", "Kondapur", "Banjara Hills", "Madhapur"],
    image: "/images/service1.png",
  },
  {
    slug: "chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    description:
      "Safe and timely household and office relocation across Chennai, including coastal and IT-corridor areas.",
    areas: ["OMR", "Anna Nagar", "Velachery", "T Nagar", "Porur"],
    image: "/images/service2.png",
  },
  {
    slug: "kolkata",
    city: "Kolkata",
    state: "West Bengal",
    description:
      "Trusted moving services across Kolkata, from heritage neighborhoods to new-age business districts.",
    areas: ["Salt Lake", "New Town", "Park Street", "Rajarhat", "Behala"],
    image: "/images/service3.png",
  },
  {
    slug: "ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    description:
      "Dependable packing and moving services across Ahmedabad's residential and commercial hubs.",
    areas: ["SG Highway", "Bopal", "Satellite", "Vastrapur", "Maninagar"],
    image: "/images/service4.png",
  },
];

export function getLocationBySlug(slug: string) {
  return LOCATIONS.find((location) => location.slug === slug);
}
