export const CTA_SECTION = {
  eyebrow: "Get Started",
  title: "Looking for a Reliable Global Mobility Partner?",
  description:
    "Talk to our relocation specialists and get a structured proposal tailored to your move — corporate or household, local or international.",
  primaryCta: { label: "Request Proposal", href: "/contact#proposal" },
  secondaryCta: { label: "Schedule Survey", href: "/contact#survey" },
} as const;

export const FOOTER_NAV_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Insights / Resources", href: "/insights" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "International Relocation", href: "/services#international" },
      { label: "Domestic Moving", href: "/services#domestic" },
      { label: "Office Relocation", href: "/services#office" },
      { label: "Vehicle Transportation", href: "/services#vehicle" },
      { label: "Storage & Warehousing", href: "/services#storage" },
    ],
  },
] as const;
