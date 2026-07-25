export const CTA_SECTION = {
  heading: {
    line1: "Looking for a Reliable",
    line2: "Global Mobility Partner?",
  },
  primaryCta: { label: "Request Consultation", href: "/contact#proposal" },
  secondaryCta: { label: "Connect With Our Team", href: "/contact#survey" },
} as const;

export const FOOTER_DESCRIPTION =
  "Experience a hassle-free, safe, and affordable relocation of your household or office anywhere in India. Safe and damage-free car transport service for personal and dealer vehicles. We offer dedicated trucks, honest pricing, and on-time delivery — request a quote now.";

export const FOOTER_NAV_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Why Choose Us", href: "/#why-choose-us" },
      { label: "Gallery", href: "/gallery" },
      { label: "Testimonial", href: "/#testimonials" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Home Relocation", href: "/services#home-relocation" },
      { label: "Office Relocation", href: "/services#office-relocation" },
      { label: "Car Moving", href: "/services#car-moving" },
      { label: "Bike Moving", href: "/services#bike-moving" },
      { label: "IBA Approved", href: "/services#iba-approved" },
      { label: "Transportation", href: "/services#transportation" },
    ],
  },
] as const;
