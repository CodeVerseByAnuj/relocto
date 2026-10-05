import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { BlogPostSummary } from "@/lib/queries/blogPost";

interface BlogCardProps {
  post: BlogPostSummary;
  /** Wide two-column layout used for the newest article. */
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg hover:shadow-brand-navy-dark/5",
        featured && "lg:flex-row"
      )}
    >
      <div
        className={cn(
          "relative aspect-video shrink-0 overflow-hidden bg-linear-to-br from-brand-navy-light to-brand-navy-dark",
          featured && "lg:aspect-auto lg:min-h-80 lg:w-1/2"
        )}
      >
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt=""
            fill
            unoptimized
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 90vw"
                : "(min-width: 1024px) 30vw, 90vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-white/30">
            <Newspaper className="size-12" aria-hidden="true" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6 sm:p-7",
          featured && "lg:justify-center lg:p-10"
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {post.category ? (
            <span className="rounded-full bg-brand-accent/15 px-3 py-1 font-semibold tracking-wide text-brand-navy uppercase">
              {post.category}
            </span>
          ) : null}
          {post.publishedAt ? (
            <time dateTime={post.publishedAt.toISOString()}>
              {formatDate(post.publishedAt)}
            </time>
          ) : null}
        </div>

        <h2
          className={cn(
            "mt-3 text-lg font-bold text-brand-navy-dark",
            featured && "text-2xl sm:text-3xl"
          )}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p
          className={cn(
            "mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground",
            featured && "sm:text-base"
          )}
        >
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy-light">
          Read article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
