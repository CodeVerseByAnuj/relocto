import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { NewServiceCategoryForm } from "@/components/admin/NewServiceCategoryForm";

export default async function NewServiceCategoryPage() {
  await requireAdmin();

  return (
    <div>
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to service categories
      </Link>
      <h1 className="mt-3 text-xl font-bold text-slate-900">New category</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        Create a service category, then add its services.
      </p>
      <NewServiceCategoryForm />
    </div>
  );
}
