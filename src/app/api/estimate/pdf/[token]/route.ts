import { buildEstimatePdf } from "@/lib/estimatePdf";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ token: string }>;
}

/** Public, but only reachable with the unguessable token shared with the customer. */
export async function GET(request: Request, { params }: RouteContext) {
  const { token } = await params;
  const disposition =
    new URL(request.url).searchParams.get("download") === "1"
      ? "attachment"
      : "inline";

  const priceRequest = await prisma.priceRequest.findUnique({
    where: { token },
  });
  if (!priceRequest) return new Response("Not found", { status: 404 });

  const bytes = await buildEstimatePdf(priceRequest);
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="moving-estimate.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
