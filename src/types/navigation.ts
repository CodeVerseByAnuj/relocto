export interface NavItem {
  label: string;
  href: string;
}

/** One category in the header "Services" dropdown. */
export interface ServiceMenuCategory {
  slug: string;
  name: string;
  href: string;
}

/** One city in the header "Locations" dropdown. */
export interface LocationMenuItem {
  slug: string;
  city: string;
  href: string;
}

/** One page in the header "About Us" dropdown. */
export interface AboutMenuItem {
  slug: string;
  title: string;
  href: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
