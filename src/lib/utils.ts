import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNavItemActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (!path) return false;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
