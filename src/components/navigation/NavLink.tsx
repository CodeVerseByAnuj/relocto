import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/navigation";

interface NavLinkProps {
  item: NavItem;
  isActive?: boolean;
  className?: string;
}

export function NavLink({ item, isActive = false, className }: NavLinkProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "text-sm font-medium text-brand-navy/90 transition-colors hover:text-brand-navy",
        isActive && "font-semibold text-brand-navy",
        className
      )}
    >
      {item.label}
    </Link>
  );
}
