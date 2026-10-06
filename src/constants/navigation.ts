import type { NavItem } from "@/types/navigation";

/** Nav item that expands into the category-wise services dropdown. */
export const SERVICES_NAV_HREF = "/services";

/** Nav item that expands into the About Us pages dropdown. */
export const ABOUT_NAV_HREF = "/#about";

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: ABOUT_NAV_HREF },
  { label: "Services", href: SERVICES_NAV_HREF },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "#contact" },
];
