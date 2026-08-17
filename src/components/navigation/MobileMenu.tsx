"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Menu, Phone, X } from "lucide-react";
import { cn, isNavItemActive } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-navy/5 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy-dark/50 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-xs flex-col gap-8 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Close menu"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-navy/5"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-brand-navy/90 transition-colors hover:bg-brand-navy/5 hover:text-brand-navy",
                  isNavItemActive(pathname, item.href) &&
                    "bg-brand-navy/5 font-semibold text-brand-navy"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="primary"
            size="xl"
            className="mt-auto w-full"
            render={<a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} />}
          >
            <Phone data-icon="inline-start" />
            Call Now {SITE_CONFIG.phone}
          </Button>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
