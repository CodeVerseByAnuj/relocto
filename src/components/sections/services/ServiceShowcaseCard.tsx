import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceShowcaseItem } from "@/types/sections";

export function ServiceShowcaseCard({
  image,
  title,
  description,
  href,
  links,
}: ServiceShowcaseItem) {
  return (
    <article className="group relative flex min-h-80 flex-col justify-end overflow-hidden lg:min-h-96">
      <Image
        src={image}
        alt={title}
        fill
        unoptimized={image.startsWith("/api/media/")}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/95 via-brand-navy-dark/50 to-brand-navy-dark/10" />
      <div className="relative p-6 lg:p-8">
        <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
          {description}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy-dark transition-colors hover:bg-brand-accent"
        >
          Explore {title}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-semibold tracking-wider text-white/80 uppercase transition-colors hover:text-brand-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
