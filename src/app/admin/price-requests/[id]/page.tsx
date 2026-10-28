import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { PriceRequestEditor } from "@/components/admin/PriceRequestEditor";
import { getPricing } from "@/lib/queries/pricing";
import { quotedPrice, requestItems } from "@/lib/priceRequest";

export const dynamic = "force-dynamic";

interface PriceRequestPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPriceRequestPage({
  params,
}: PriceRequestPageProps) {
  await requireAdmin();
  const { id } = await params;

  const request = await prisma.priceRequest.findUnique({ where: { id } });
  if (!request) notFound();

  const { categories } = await getPricing();
  const catalog = categories.flatMap((category) =>
    category.items.map((item) => ({
      category: category.name,
      name: item.name,
      price: item.price,
    }))
  );

  return (
    <div>
      <Link
        href="/admin/price-requests"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to price requests
      </Link>
      <h1 className="mt-3 mb-6 text-xl font-bold text-slate-900">
        Price request from {request.name}
      </h1>
      <PriceRequestEditor
        catalog={catalog}
        request={{
          id: request.id,
          token: request.token,
          name: request.name,
          email: request.email,
          phone: request.phone,
          fromLabel: request.fromLabel,
          toLabel: request.toLabel,
          km: request.km,
          items: requestItems(request),
          itemsTotal: request.itemsTotal,
          distanceCharge: request.distanceCharge,
          estimate: request.estimate,
          price: quotedPrice(request),
          notes: request.notes ?? "",
          status: request.status,
        }}
      />
    </div>
  );
}
