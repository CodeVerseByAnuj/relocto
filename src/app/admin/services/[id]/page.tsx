import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ServiceCategoryEditor } from "@/components/admin/ServiceCategoryEditor";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServiceCategoryPage({
  params,
}: EditPageProps) {
  await requireAdmin();
  const { id } = await params;

  const category = await prisma.serviceCategory.findUnique({
    where: { id },
    include: { services: { orderBy: { order: "asc" } } },
  });

  if (!category) notFound();

  return (
    <div>
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to service categories
      </Link>
      <h1 className="mt-3 mb-6 text-xl font-bold text-slate-900">
        {category.name}
      </h1>
      <ServiceCategoryEditor category={category} />
    </div>
  );
}
