import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard Admin",
    template: "%s | Dashboard Creativemu Academy",
  },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Verify user is an active admin
  const { data: admin } = await supabase
    .from("admins")
    .select("id, full_name, email, is_active")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar admin={admin} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader admin={admin} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
