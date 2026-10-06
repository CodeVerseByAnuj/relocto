import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { LOCATIONS } from "@/constants/locations";
import { DEFAULT_SERVICE_CATEGORIES } from "@/constants/serviceCategories";
import { DEFAULT_BLOG_POSTS } from "@/constants/blogPosts";
import { DEFAULT_ABOUT_PAGES } from "@/constants/aboutPages";
import { buildDefaultLocationContent } from "@/lib/defaultLocationContent";

/**
 * Install one set of starter content exactly once per database.
 *
 * The marker row is what makes it "once": after it exists the content is never
 * touched again, so anything an admin edits or deletes stays that way. A table
 * that already has rows (e.g. a production database that predates this) is
 * left alone and just marked as done.
 */
async function installOnce(
  key: string,
  isEmpty: () => Promise<boolean>,
  install: () => Promise<unknown>
) {
  const done = await prisma.appliedSeed.findUnique({ where: { key } });
  if (done) return;

  if (await isEmpty()) {
    await install();
    console.log(`[bootstrap] Installed starter content: ${key}`);
  }
  await prisma.appliedSeed.create({ data: { key } });
}

/** Create the first admin from ADMIN_EMAIL / ADMIN_PASSWORD; never updates one. */
async function ensureAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const existing = await prisma.adminUser.findUnique({
    where: { email },
    select: { id: true },
  });
  if (existing) return;

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      name: "Admin",
    },
  });
  console.log(`[bootstrap] Created admin user: ${email}`);
}

/**
 * Bring a database up to a usable state after its migrations have run: the
 * first admin user and the starter content the admin panel then manages.
 * Runs on every server start (see src/instrumentation.ts) and is safe to
 * repeat — it only ever adds what has never been installed.
 */
export async function bootstrapDatabase() {
  await ensureAdmin();

  await installOnce(
    "locations",
    async () => (await prisma.location.count()) === 0,
    async () => {
      for (const [index, loc] of LOCATIONS.entries()) {
        const { services, features, ...scalars } = buildDefaultLocationContent({
          city: loc.city,
          state: loc.state,
          description: loc.description,
          areas: loc.areas,
        });
        await prisma.location.create({
          data: {
            ...scalars,
            order: index,
            slug: loc.slug,
            city: loc.city,
            state: loc.state,
            services: { create: services.map((s, i) => ({ ...s, order: i })) },
            features: { create: features.map((f, i) => ({ ...f, order: i })) },
          },
        });
      }
    }
  );

  await installOnce(
    "service-categories",
    async () => (await prisma.serviceCategory.count()) === 0,
    async () => {
      for (const [index, category] of DEFAULT_SERVICE_CATEGORIES.entries()) {
        const { services, ...scalars } = category;
        await prisma.serviceCategory.create({
          data: {
            ...scalars,
            order: index,
            services: { create: services.map((s, i) => ({ ...s, order: i })) },
          },
        });
      }
    }
  );

  await installOnce(
    "blog-posts",
    async () => (await prisma.blogPost.count()) === 0,
    async () => {
      const now = Date.now();
      for (const [index, post] of DEFAULT_BLOG_POSTS.entries()) {
        await prisma.blogPost.create({
          data: {
            ...post,
            published: true,
            // A few days apart so the list has a stable newest-first order.
            publishedAt: new Date(now - index * 3 * 24 * 60 * 60 * 1000),
          },
        });
      }
    }
  );

  await installOnce(
    "about-pages",
    async () => (await prisma.aboutPage.count()) === 0,
    async () => {
      for (const [index, page] of DEFAULT_ABOUT_PAGES.entries()) {
        await prisma.aboutPage.create({
          data: { ...page, order: index, published: true },
        });
      }
    }
  );
}
