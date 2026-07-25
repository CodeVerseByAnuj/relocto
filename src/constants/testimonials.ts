import type { Testimonial } from "@/types/sections";

export const TESTIMONIALS_SECTION = {
  title: "What Our Happy Clients Say",
  description: "Three simple steps to a stress-free move.",
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Moving from Mumbai to Delhi was seamless. The packing was excellent and not even a single glass item broke. Highly recommended!",
    author: "Rahul Sharma",
    role: "Home Relocation",
    rating: 5,
    avatarColor: "bg-blue-500",
  },
  {
    quote:
      "Used their office relocation services. Professional team and extremely quick. We were back to work in the new office within 24 hours.",
    author: "Priya Kapoor",
    role: "Office Move",
    rating: 5,
    avatarColor: "bg-rose-500",
  },
  {
    quote:
      "Most affordable rates I could find online. The service was surprisingly premium despite the low cost. Truly the architects of logistics.",
    author: "Amit Verma",
    role: "Vehicle Shifting",
    rating: 5,
    avatarColor: "bg-teal-500",
  },
];
