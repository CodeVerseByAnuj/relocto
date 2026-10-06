import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseAboutLists } from "@/lib/schemas/aboutPage";
import type { AboutMenuItem } from "@/types/navigation";

type AboutPageRow = Prisma.AboutPageGetPayload<object>;

/** An AboutPage row with its Json list columns parsed into typed arrays. */
export type AboutPageContent = Omit<
  AboutPageRow,
  "timeline" | "values" | "stats" | "logos"
> &
  ReturnType<typeof parseAboutLists>;

export function toAboutPageContent(row: AboutPageRow): AboutPageContent {
  return { ...row, ...parseAboutLists(row) };
}

/** One published about page, or null. Cached per request. */
export const getPublishedAboutPage = cache(
  async (slug: string): Promise<AboutPageContent | null> => {
    const row = await prisma.aboutPage.findFirst({
      where: { slug, published: true },
    });
    return row ? toAboutPageContent(row) : null;
  }
);

/** Published pages for the header "About Us" dropdown; [] if the DB is down. */
export async function getAboutMenu(): Promise<AboutMenuItem[]> {
  try {
    const pages = await prisma.aboutPage.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { title: "asc" }],
      select: { slug: true, title: true },
    });
    return pages.map(({ slug, title }) => ({
      slug,
      title,
      href: `/about/${slug}`,
    }));
  } catch {
    return [];
  }
}

export function listPublishedAboutSlugs(): Promise<{ slug: string }[]> {
  return prisma.aboutPage.findMany({
    where: { published: true },
    select: { slug: true },
  });
}
