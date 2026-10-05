import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type BlogPost = Prisma.BlogPostGetPayload<object>;

/** Card data for listings — everything except the article body. */
export type BlogPostSummary = Omit<BlogPost, "content">;

const newestFirst = [
  { publishedAt: "desc" },
  { createdAt: "desc" },
] satisfies Prisma.BlogPostOrderByWithRelationInput[];

/**
 * Published articles, newest first. Returns [] when the database is
 * unreachable (e.g. during a Docker build) so /blog still renders.
 */
export async function listPublishedPosts(
  limit = 60
): Promise<BlogPostSummary[]> {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: newestFirst,
      take: limit,
      omit: { content: true },
    });
  } catch {
    return [];
  }
}

/** One published article with its body, or null. Cached per request. */
export const getPublishedPost = cache(
  (slug: string): Promise<BlogPost | null> =>
    prisma.blogPost.findFirst({ where: { slug, published: true } })
);

/** Other recent articles to show under an article, same category first. */
export async function listRelatedPosts(
  post: Pick<BlogPost, "id" | "category">,
  limit = 3
): Promise<BlogPostSummary[]> {
  const others = await prisma.blogPost.findMany({
    where: { published: true, NOT: { id: post.id } },
    orderBy: newestFirst,
    take: 12,
    omit: { content: true },
  });
  const sameCategory = others.filter(
    (other) => post.category && other.category === post.category
  );
  const rest = others.filter((other) => !sameCategory.includes(other));
  return [...sameCategory, ...rest].slice(0, limit);
}

export function listPublishedPostSlugs(): Promise<{ slug: string }[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
}

/** Minutes to read at ~200 words per minute, at least 1. */
export function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
