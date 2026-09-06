import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Relocato CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    // Unauthenticated: only /admin/login is reachable (middleware blocks the rest).
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        {children}
      </div>
    );
  }

  return <AdminShell admin={admin}>{children}</AdminShell>;
}
