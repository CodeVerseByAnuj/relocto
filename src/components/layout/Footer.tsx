import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Separator } from "@/components/ui/separator";
import { FOOTER_NAV_COLUMNS } from "@/constants/cta";
import { SITE_CONFIG } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy-dark">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Logo variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Structured relocation solutions for corporate mobility, premium
              household transitions, office relocations & international
              assignments.
            </p>
          </div>

          {FOOTER_NAV_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {year} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="font-serif italic">{SITE_CONFIG.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
