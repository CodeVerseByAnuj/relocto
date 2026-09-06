import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface ServiceInput {
  slug?: string;
  title?: string;
  description?: string;
  icon?: string | null;
  image?: string | null;
  features?: unknown;
  category?: string | null;
  order?: number;
  published?: boolean;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(input: ServiceInput, index: number) {
  const title = input.title?.trim();
  if (!title) {
    throw new ValidationError(`services[${index}]: "title" is required.`);
  }

  const description = input.description?.trim();
  if (!description) {
    throw new ValidationError(`services[${index}]: "description" is required.`);
  }

  let features: string[] = [];
  if (input.features !== undefined) {
    if (
      !Array.isArray(input.features) ||
      !input.features.every((f) => typeof f === "string")
    ) {
      throw new ValidationError(
        `services[${index}]: "features" must be an array of strings.`
      );
    }
    features = input.features.map((f) => f.trim()).filter(Boolean);
  }

  const slug = (input.slug?.trim() || slugify(title)) as string;
  if (!slug) {
    throw new ValidationError(
      `services[${index}]: could not derive a valid "slug" from the title.`
    );
  }

  return {
    slug,
    title,
    description,
    icon: input.icon?.toString().trim() || null,
    image: input.image?.toString().trim() || null,
    features,
    category: input.category?.toString().trim() || null,
    order: Number.isFinite(input.order) ? Number(input.order) : 0,
    published: typeof input.published === "boolean" ? input.published : true,
  };
}

class ValidationError extends Error {}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeUnpublished = searchParams.get("all") === "true";

  const services = await prisma.service.findMany({
    where: includeUnpublished ? undefined : { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ count: services.length, services });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Accept a bare array, a single object, or { services: [...] }.
  const rawList = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && "services" in payload
      ? (payload as { services: unknown }).services
      : [payload];

  if (!Array.isArray(rawList) || rawList.length === 0) {
    return NextResponse.json(
      { error: "Provide at least one service (array, object, or { services: [] })." },
      { status: 400 }
    );
  }

  let data;
  try {
    data = rawList.map((item, i) => normalize((item ?? {}) as ServiceInput, i));
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  // Reject duplicate slugs within the same request.
  const seen = new Set<string>();
  for (const s of data) {
    if (seen.has(s.slug)) {
      return NextResponse.json(
        { error: `Duplicate slug in request: "${s.slug}".` },
        { status: 400 }
      );
    }
    seen.add(s.slug);
  }

  try {
    const result = await prisma.$transaction(
      data.map((service) => prisma.service.create({ data: service }))
    );

    return NextResponse.json(
      { count: result.length, services: result },
      { status: 201 }
    );
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "One or more slugs already exist." },
        { status: 409 }
      );
    }
    console.error("Failed to create services:", err);
    return NextResponse.json(
      { error: "Failed to create services." },
      { status: 500 }
    );
  }
}
