"use client";

import { useState } from "react";
import Link from "next/link";
import { Popover } from "@base-ui/react/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  label: string;
  isActive?: boolean;
  className?: string;
  /** Receives a `close` callback to pass to links inside the panel. */
  children: (close: () => void) => React.ReactNode;
}

/** Header nav item that opens a dark panel on hover or click. */
export function NavDropdown({
  label,
  isActive = false,
  className,
  children,
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        openOnHover
        delay={100}
        closeDelay={150}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap text-brand-navy/90 transition-colors outline-none hover:text-brand-navy focus-visible:text-brand-navy data-popup-open:text-brand-navy",
          isActive && "font-semibold text-brand-navy"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          side="bottom"
          align="start"
          sideOffset={20}
          className="z-50"
        >
          <Popover.Popup
            className={cn(
              "flex min-w-64 origin-(--transform-origin) flex-col bg-brand-navy-dark py-2 shadow-xl transition-[opacity,scale] duration-200 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
              className
            )}
          >
            {children(() => setOpen(false))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function NavDropdownLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "px-6 py-3 text-base text-white/85 transition-colors outline-none hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white",
        className
      )}
      {...props}
    />
  );
}
