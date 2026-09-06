import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Serve an uploaded image by id. IDs are unique per upload, so cache hard. */
export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
    select: { data: true, mimeType: true },
  });

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  const body = new Uint8Array(asset.data);
  return new Response(body, {
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
