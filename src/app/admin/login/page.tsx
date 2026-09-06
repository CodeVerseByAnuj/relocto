import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentAdmin } from "@/lib/auth";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  if (await getCurrentAdmin()) {
    redirect("/admin");
  }
  const { next } = await searchParams;
  return <LoginForm next={next} />;
}
