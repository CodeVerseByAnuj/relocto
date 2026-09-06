import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { NewLocationForm } from "@/components/admin/NewLocationForm";

export default async function NewLocationPage() {
  await requireAdmin();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to locations
      </Link>
      <h1 className="mt-3 text-xl font-bold text-slate-900">New location</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        Create a location page, then edit its content.
      </p>
      <NewLocationForm />
    </div>
  );
}
