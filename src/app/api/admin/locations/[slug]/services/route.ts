import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminOrNull } from "@/lib/auth";
import { bulkServicesSchema } from "@/lib/schemas/location";
import { addLocationServices } from "@/lib/queries/locationMutations";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/** Bulk-add one or more service cards to a location. */
export async function POST(request: Request, { params }: RouteContext) {
  if (!(await getAdminOrNull())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const location = await prisma.location.findUnique({
    where: { slug },
    select: { id: true, slug: true },
  });
  if (!location) {
    return NextResponse.json({ error: "Location not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bulkServicesSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const created = await addLocationServices(
    location.id,
    location.slug,
    parsed.data.services
  );

  return NextResponse.json({ count: created.length, services: created }, {
    status: 201,
  });
}
