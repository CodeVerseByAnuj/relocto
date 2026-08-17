"use client";

import { usePathname } from "next/navigation";
import { cn, isNavItemActive } from "@/lib/utils";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { NavLink } from "@/components/navigation/NavLink";

interface MainNavigationProps {
  className?: string;
}

export function MainNavigation({ className }: MainNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden items-center gap-8 lg:flex", className)}>
      {MAIN_NAV_ITEMS.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          isActive={isNavItemActive(pathname, item.href)}
        />
      ))}
    </nav>
  );
}
