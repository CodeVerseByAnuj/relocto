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
    <article className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden lg:min-h-[38rem]">
      <Image
        src={image}
        alt={title}
        fill
        unoptimized={image.startsWith("/api/media/")}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/95 via-brand-navy-dark/50 to-brand-navy-dark/10" />
      <div className="relative p-6 sm:p-10 lg:p-12">
        <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
          {description}
        </p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy-dark transition-colors hover:bg-brand-accent"
        >
          Explore {title}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
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
