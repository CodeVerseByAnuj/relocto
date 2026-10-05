import type { NavItem } from "@/types/navigation";

/** Nav item that expands into the category-wise services dropdown. */
export const SERVICES_NAV_HREF = "/services";

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Services", href: SERVICES_NAV_HREF },
  { label: "Process", href: "/#process" },
  { label: "Contact Us", href: "#contact" },
];
