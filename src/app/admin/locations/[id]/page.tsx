import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { LocationEditor } from "@/components/admin/LocationEditor";

export const dynamic = "force-dynamic";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLocationPage({ params }: EditPageProps) {
  await requireAdmin();
  const { id } = await params;

  const location = await prisma.location.findUnique({
    where: { id },
    include: {
      services: { orderBy: { order: "asc" } },
      features: { orderBy: { order: "asc" } },
    },
  });

  if (!location) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to locations
      </Link>
      <h1 className="mt-3 mb-6 text-xl font-bold text-slate-900">
        {location.city}, {location.state}
      </h1>
      <LocationEditor location={location} />
    </div>
  );
}
