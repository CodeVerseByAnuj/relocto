import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminOrNull } from "@/lib/auth";
import {
  MAX_UPLOAD_BYTES,
  isAllowedImageType,
  mediaUrl,
  ALLOWED_IMAGE_TYPES,
} from "@/lib/media";

export const runtime = "nodejs";

/** List recent uploads (for reuse / a simple media library). */
export async function GET() {
  if (!(await getAdminOrNull())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
    select: { id: true, filename: true, mimeType: true, size: true, createdAt: true },
  });

  return NextResponse.json({
    assets: assets.map((a) => ({ ...a, url: mediaUrl(a.id) })),
  });
}

/** Upload one image file. Expects multipart/form-data with a `file` field. */
export async function POST(request: Request) {
  if (!(await getAdminOrNull())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart/form-data." },
      { status: 400 }
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!isAllowedImageType(file.type)) {
    return NextResponse.json(
      {
        error: `Unsupported type "${file.type || "unknown"}". Allowed: ${ALLOWED_IMAGE_TYPES.join(
          ", "
        )}.`,
      },
      { status: 415 }
    );
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "File is empty." }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File is too large (max ${MAX_UPLOAD_BYTES / (1024 * 1024)} MB).` },
      { status: 413 }
    );
  }

  const data = Buffer.from(await file.arrayBuffer());
  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name || "upload",
      mimeType: file.type,
      size: data.byteLength,
      data,
    },
    select: { id: true, filename: true, mimeType: true, size: true },
  });

  return NextResponse.json(
    { ...asset, url: mediaUrl(asset.id) },
    { status: 201 }
  );
}
