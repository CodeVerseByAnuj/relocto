"use client";

import {
  NavDropdown,
  NavDropdownLink,
} from "@/components/navigation/NavDropdown";
import type { NavItem, ServiceMenuCategory } from "@/types/navigation";

interface ServicesDropdownProps {
  item: NavItem;
  categories: ServiceMenuCategory[];
  isActive?: boolean;
}

export function ServicesDropdown({
  item,
  categories,
  isActive = false,
}: ServicesDropdownProps) {
  return (
    <NavDropdown label={item.label} isActive={isActive}>
      {(close) =>
        categories.map((category) => (
          <NavDropdownLink
            key={category.slug}
            href={category.href}
            onClick={close}
          >
            {category.name}
          </NavDropdownLink>
        ))
      }
    </NavDropdown>
  );
}
