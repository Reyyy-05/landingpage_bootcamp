"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleBootcampStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bootcamps")
    .update({ is_open: !currentStatus })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/bootcamps");
  revalidatePath("/daftar"); // Revalidate public registration page too
  return { success: true };
}

export async function createBootcamp(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const batch_number = parseInt(formData.get("batch_number") as string);
  const start_date = formData.get("start_date") as string;
  const end_date = formData.get("end_date") as string;
  const price_reguler = parseInt(formData.get("price_reguler") as string);
  const price_premium = parseInt(formData.get("price_premium") as string);
  const price_intensif = parseInt(formData.get("price_intensif") as string);
  const max_capacity = parseInt(formData.get("max_capacity") as string);

  if (!name || !batch_number || !price_reguler || !max_capacity) {
    return { error: "Kolom wajib belum diisi semua" };
  }

  const { error } = await supabase.from("bootcamps").insert({
    name,
    description,
    batch_number,
    start_date: start_date || null,
    end_date: end_date || null,
    price_reguler,
    price_premium: price_premium || null,
    price_intensif: price_intensif || null,
    max_capacity,
    is_open: true,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/bootcamps");
  revalidatePath("/daftar");
  return { success: true };
}
