import { requireAdmin } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export default async function AccountPage() {
  const admin = await requireAdmin();

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Account</h1>
      <dl className="mt-4 text-sm text-slate-600">
        <div className="flex gap-2">
          <dt className="font-semibold text-slate-800">Email:</dt>
          <dd>{admin.email}</dd>
        </div>
      </dl>

      <h2 className="mt-8 mb-3 text-sm font-bold text-slate-900">
        Change password
      </h2>
      <ChangePasswordForm />

      <p className="mt-8 max-w-md text-xs text-slate-500">
        To add another admin, run <code>npm run db:seed</code> with a different{" "}
        <code>ADMIN_EMAIL</code> / <code>ADMIN_PASSWORD</code>, or add a row to{" "}
        <code>AdminUser</code> via <code>npm run db:studio</code>.
      </p>
    </div>
  );
}
