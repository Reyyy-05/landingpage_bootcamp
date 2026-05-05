"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateRegistrationStatus(
  studentId: string,
  newStatus: "confirmed" | "rejected",
  notes?: string
) {
  const supabase = await createClient();

  // 1. Get current admin to record 'confirmed_by'
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    return { error: "Admin not found" };
  }

  // 2. Update the student
  const { error } = await supabase
    .from("students")
    .update({
      registration_status: newStatus,
      admin_notes: notes,
      confirmed_by: admin.id,
      confirmed_at: new Date().toISOString(),
    })
    .eq("id", studentId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/students");
  revalidatePath(`/dashboard/students/${studentId}`);

  return { success: true };
}
