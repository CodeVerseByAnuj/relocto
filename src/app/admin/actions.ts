"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  hashPassword,
  requireAdmin,
  verifyPassword,
} from "@/lib/auth";
import {
  createLocationSchema,
  locationContentSchema,
} from "@/lib/schemas/location";
import { buildDefaultLocationContent } from "@/lib/defaultLocationContent";
import {
  createLocationFromContent,
  revalidateLocation,
  saveLocationContent,
} from "@/lib/queries/locationMutations";
import {
  createServiceCategorySchema,
  serviceCategorySchema,
} from "@/lib/schemas/serviceCategory";
import {
  createServiceCategory,
  revalidateServiceCategories,
  saveServiceCategory,
} from "@/lib/queries/serviceCategoryMutations";
import { blogPostSchema, createBlogPostSchema } from "@/lib/schemas/blogPost";
import { aboutPageSchema, createAboutPageSchema } from "@/lib/schemas/aboutPage";
import { slugify } from "@/lib/utils";

export type ActionResult = { ok: true } | { ok: false; error: string };

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, error: "Incorrect email or password." };
  }

  await createSession(user.id);
  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function createLocationAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = createLocationSchema.safeParse({
    slug: formData.get("slug"),
    city: formData.get("city"),
    state: formData.get("state"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await prisma.location.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `A location with slug "${parsed.data.slug}" already exists.` };
  }
  // Locations and service categories share the /services/<slug> URL space.
  if (await prisma.serviceCategory.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } })) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by a service category.` };
  }

  const content = locationContentSchema.parse({
    ...parsed.data,
    ...buildDefaultLocationContent(parsed.data),
    published: false,
  });
  const location = await createLocationFromContent(content);
  redirect(`/admin/locations/${location.id}`);
}

export async function saveLocationAction(
  id: string,
  payload: unknown
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = locationContentSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      error: issue
        ? `${issue.path.join(".") || "form"}: ${issue.message}`
        : "Validation failed",
    };
  }

  const clash = await prisma.location.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (clash) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by another location.` };
  }
  if (await prisma.serviceCategory.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } })) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by a service category.` };
  }

  await saveLocationContent(id, parsed.data);
  revalidatePath(`/admin/locations/${id}`);
  return { ok: true };
}

export async function deleteLocationAction(id: string): Promise<void> {
  await requireAdmin();
  const location = await prisma.location.delete({ where: { id } });
  revalidateLocation(location.slug);
  redirect("/admin");
}

export async function togglePublishAction(
  id: string,
  published: boolean
): Promise<void> {
  await requireAdmin();
  const location = await prisma.location.update({
    where: { id },
    data: { published },
  });
  revalidateLocation(location.slug);
  revalidatePath("/admin");
}

export async function createServiceCategoryAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = createServiceCategorySchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const existing = await prisma.serviceCategory.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `A category with slug "${parsed.data.slug}" already exists.` };
  }
  if (await prisma.location.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } })) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by a location page.` };
  }

  const category = await createServiceCategory(parsed.data);
  redirect(`/admin/services/${category.id}`);
}

export async function saveServiceCategoryAction(
  id: string,
  payload: unknown
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = serviceCategorySchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      error: issue
        ? `${issue.path.join(".") || "form"}: ${issue.message}`
        : "Validation failed",
    };
  }

  const clash = await prisma.serviceCategory.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (clash) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by another category.` };
  }
  if (await prisma.location.findUnique({ where: { slug: parsed.data.slug }, select: { id: true } })) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by a location page.` };
  }

  await saveServiceCategory(id, parsed.data);
  revalidatePath(`/admin/services/${id}`);
  return { ok: true };
}

export async function deleteServiceCategoryAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.serviceCategory.delete({ where: { id } });
  revalidateServiceCategories();
  redirect("/admin/services");
}

export async function toggleServiceCategoryPublishAction(
  id: string,
  published: boolean
): Promise<void> {
  await requireAdmin();
  await prisma.serviceCategory.update({ where: { id }, data: { published } });
  revalidateServiceCategories();
}

function revalidateBlog(...slugs: string[]) {
  revalidatePath("/blog");
  for (const slug of slugs) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPostAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = createBlogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  if (!slug) {
    return { ok: false, error: "Enter a URL slug using letters or numbers." };
  }
  const existing = await prisma.blogPost.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `An article with slug "${slug}" already exists.` };
  }

  const post = await prisma.blogPost.create({
    data: { slug, title: parsed.data.title, excerpt: "", content: "" },
  });
  redirect(`/admin/blog/${post.id}`);
}

export async function saveBlogPostAction(
  id: string,
  payload: unknown
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = blogPostSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      error: issue
        ? `${issue.path.join(".") || "form"}: ${issue.message}`
        : "Validation failed",
    };
  }

  const clash = await prisma.blogPost.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (clash) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by another article.` };
  }

  const previous = await prisma.blogPost.findUnique({
    where: { id },
    select: { slug: true, publishedAt: true },
  });
  if (!previous) return { ok: false, error: "This article no longer exists." };

  // An explicit date wins; otherwise stamp the first time it is published.
  const publishedAt =
    parsed.data.publishedAt ??
    previous.publishedAt ??
    (parsed.data.published ? new Date() : null);

  await prisma.blogPost.update({
    where: { id },
    data: { ...parsed.data, publishedAt },
  });
  revalidateBlog(previous.slug, parsed.data.slug);
  revalidatePath(`/admin/blog/${id}`);
  return { ok: true };
}

export async function deleteBlogPostAction(id: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidateBlog(post.slug);
  redirect("/admin/blog");
}

/** Drafts are published from the editor, where missing content is reported. */
export async function unpublishBlogPostAction(id: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.blogPost.update({
    where: { id },
    data: { published: false },
  });
  revalidateBlog(post.slug);
  revalidatePath("/admin/blog");
}

/** The About Us dropdown is in the header of every public page. */
function revalidateAbout() {
  revalidatePath("/", "layout");
}

export async function createAboutPageAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = createAboutPageSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug") ?? undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const slug = slugify(parsed.data.slug || parsed.data.title);
  if (!slug) {
    return { ok: false, error: "Enter a URL slug using letters or numbers." };
  }
  const existing = await prisma.aboutPage.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `A page with slug "${slug}" already exists.` };
  }

  const last = await prisma.aboutPage.aggregate({ _max: { order: true } });
  const page = await prisma.aboutPage.create({
    data: { slug, title: parsed.data.title, order: (last._max.order ?? -1) + 1 },
  });
  redirect(`/admin/about/${page.id}`);
}

export async function saveAboutPageAction(
  id: string,
  payload: unknown
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = aboutPageSchema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      error: issue
        ? `${issue.path.join(".") || "form"}: ${issue.message}`
        : "Validation failed",
    };
  }

  const clash = await prisma.aboutPage.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (clash) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is used by another page.` };
  }

  await prisma.aboutPage.update({ where: { id }, data: parsed.data });
  revalidateAbout();
  revalidatePath(`/admin/about/${id}`);
  return { ok: true };
}

export async function deleteAboutPageAction(id: string): Promise<void> {
  await requireAdmin();
  await prisma.aboutPage.delete({ where: { id } });
  revalidateAbout();
  redirect("/admin/about");
}

export async function toggleAboutPagePublishAction(
  id: string,
  published: boolean
): Promise<void> {
  await requireAdmin();
  await prisma.aboutPage.update({ where: { id }, data: { published } });
  revalidateAbout();
}

const passwordSchema = z
  .object({
    current: z.string().min(1, "Current password is required"),
    next: z.string().min(8, "New password must be at least 8 characters"),
  });

export async function changePasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const parsed = passwordSchema.safeParse({
    current: formData.get("current"),
    next: formData.get("next"),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: admin.id } });
  if (!user || !(await verifyPassword(parsed.data.current, user.passwordHash))) {
    return { ok: false, error: "Current password is incorrect." };
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: await hashPassword(parsed.data.next) },
  });
  return { ok: true };
}
