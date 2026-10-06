import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { NewAboutPageForm } from "@/components/admin/NewAboutPageForm";

export default async function NewAboutPagePage() {
  await requireAdmin();

  return (
    <div>
      <Link
        href="/admin/about"
        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="size-3.5" /> Back to about pages
      </Link>
      <h1 className="mt-3 text-xl font-bold text-slate-900">New about page</h1>
      <p className="mt-1 mb-6 text-sm text-slate-500">
        Name the page, then add its content.
      </p>
      <NewAboutPageForm />
    </div>
  );
}
