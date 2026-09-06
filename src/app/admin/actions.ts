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
