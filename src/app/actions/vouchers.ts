"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleVoucherStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("vouchers")
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/vouchers");
  return { success: true };
}

export async function createVoucher(formData: FormData) {
  const supabase = await createClient();

  const code = formData.get("code") as string;
  const discount_type = formData.get("discount_type") as string;
  const discount_value = parseInt(formData.get("discount_value") as string);
  const max_uses = parseInt(formData.get("max_uses") as string);
  const valid_until = formData.get("valid_until") as string;

  if (!code || !discount_type || !discount_value || !max_uses || !valid_until) {
    return { error: "Semua kolom wajib diisi" };
  }

  const { error } = await supabase.from("vouchers").insert({
    code: code.toUpperCase().trim(),
    discount_type,
    discount_value,
    max_uses,
    valid_until,
    is_active: true,
  });

  if (error) {
    // Handling duplicate code error
    if (error.code === "23505") {
      return { error: "Kode voucher ini sudah pernah dibuat" };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard/vouchers");
  return { success: true };
}
