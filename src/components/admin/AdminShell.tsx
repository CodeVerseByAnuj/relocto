import Link from "next/link";
import { LogOut, MapPin, UserCog } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

interface AdminShellProps {
  admin: { email: string; name: string | null };
  children: React.ReactNode;
}

export function AdminShell({ admin, children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-sm font-bold text-slate-900">Relocato CMS</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{admin.email}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <MapPin className="size-4" /> Locations
          </Link>
          <Link
            href="/admin/account"
            className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
          >
            <UserCog className="size-4" /> Account
          </Link>
        </nav>
        <form action={logoutAction} className="border-t border-slate-200 p-3">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
