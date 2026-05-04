import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1).replace(".0", "")}jt`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatWANumber(phone: string): string {
  // Normalize: 08xx → 628xx
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }
  return cleaned;
}

export function buildWALink(
  phone: string,
  message?: string
): string {
  const number = formatWANumber(phone);
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${encoded}`;
}

export function buildStudentWAMessage(params: {
  name: string;
  program: string;
  registrationId: string;
}): string {
  return `Halo Admin Creativemu Academy,\n\nSaya *${params.name}* ingin mengkonfirmasi pendaftaran saya:\n\n📚 Program: ${params.program}\n🔖 No. Registrasi: ${params.registrationId}\n\nMohon informasi lebih lanjut mengenai proses pendaftaran saya. Terima kasih!`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
