"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" };
  }

  const supabase = await createClient();

  // 1. Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || "Gagal login ke sistem otentikasi" };
  }

  // 2. Cek apakah user ada di tabel admins dan aktif
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("id, is_active")
    .eq("user_id", authData.user.id)
    .single();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    return { error: "Anda tidak memiliki akses admin" };
  }

  if (!admin.is_active) {
    await supabase.auth.signOut();
    return { error: "Akun admin Anda sudah dinonaktifkan" };
  }

  // 3. Login sukses, redirect ke dashboard
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
