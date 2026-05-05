# 📋 NEXT STEPS — CreativeMU Academy
> Dokumen ini berisi daftar penyempurnaan tahap akhir yang perlu dikerjakan, diurutkan berdasarkan prioritas.  
> Status Saat Ini: **Fase 1-5 SELESAI ✅** (Landing Page, Form, Dashboard Admin, Manajemen Konten 100% fungsional).
> Target Selanjutnya: **Fase 6 (SEO, Analytics, & Kustomisasi Konten)**.

---

## 🔴 PRIORITAS TINGGI — Analytics & Tracking

### 1. Integrasi Google Analytics & Meta Pixel
**Problem:** Sebagai landing page untuk konversi iklan, kita membutuhkan tracking yang solid.
**Yang perlu dilakukan:**
- [ ] Buat properti Google Analytics (GA4) dan dapatkan Measurement ID.
- [ ] Buat Meta Pixel ID untuk Facebook/Instagram Ads.
- [ ] Pasang script tracking di `app/layout.tsx` menggunakan `next/third-parties` atau custom script tag.
- [ ] Trigger custom event `purchase` atau `generate_lead` saat siswa berhasil mendaftar dan diarahkan ke `/konfirmasi`.

---

## 🟡 PRIORITAS SEDANG — SEO & Kinerja Pencarian

### 2. Optimasi Metadata & SEO
**Problem:** Tampilan saat dibagikan ke media sosial (WhatsApp/Instagram) masih menggunakan metadata standar.
**Yang perlu dilakukan:**
- [ ] Buat gambar `opengraph-image.png` berukuran 1200x630px yang menarik. Letakkan di root `app/`.
- [ ] Update object `metadata` di `app/layout.tsx` (title, description, openGraph, twitter).
- [ ] Tambahkan file `robots.txt` dan `sitemap.xml` dinamis atau statis.
- [ ] Tambahkan tag `canonical` pada setiap halaman publik.

---

## 🟢 PRIORITAS RENDAH — Kustomisasi Konten & Desain Asli

### 3. Aset Grafis (Logo & Foto)
**Yang perlu dilakukan:**
- [ ] Ganti teks "Creativemu Academy" di Navbar menjadi file SVG/PNG Logo resmi.
- [ ] Update `favicon.ico` dan `apple-icon.png`.
- [ ] Ganti placeholder emoji/foto di **Hero Section** dengan foto nyata suasana belajar offline CreativeMU.
- [ ] Siapkan *assets* logo perusahaan/universitas alumni jika ada section *Social Proof*.

### 4. Konten Copywriting Nyata
**Yang perlu dilakukan:**
- [ ] Minta kurikulum resmi bulan 1 sampai 6 dari tim materi, lalu masukkan ke `RoadmapSection.tsx`.
- [ ] Ganti teks deskripsi keunggulan di `FeaturesSection.tsx` agar sesuai dengan *Unique Selling Proposition* terbaru.
- [ ] Masukkan testimoni asli dari alumni (Nama, Instansi, Quote) untuk menggantikan data dummy.

---

## 🔵 SETUP INFRASTRUKTUR FINAL

### 5. Custom Domain & Production Env
**Yang perlu dilakukan:**
- [ ] Arahkan domain utama (misal: `creativemu.id` atau `daftar.creativemu.id`) ke Vercel Project.
- [ ] Update Environment Variable `NEXT_PUBLIC_APP_URL` di Vercel Dashboard agar mengarah ke domain asli, BUKAN `.vercel.app`.
- [ ] Daftarkan domain asli ke **Redirect URLs** pada Supabase Auth Settings.

---

## 📊 Ringkasan Status Keseluruhan

| Fitur Utama | Status |
|-------------|--------|
| Landing Page Utama (UI/UX) | ✅ Selesai |
| Form Registrasi & Logika | ✅ Selesai |
| Supabase Database & Auth | ✅ Selesai |
| Dashboard: Login & Proteksi | ✅ Selesai |
| Dashboard: Manajemen Pendaftar | ✅ Selesai |
| Dashboard: Manajemen Program & Harga | ✅ Selesai |
| Dashboard: Manajemen Voucher Diskon | ✅ Selesai |
| **Integrasi GA4 & Meta Pixel** | ❌ Belum |
| **Open Graph (SEO) & Sitemap** | ❌ Belum |
| **Custom Domain Setup** | ❌ Belum |

> **Rekomendasi eksekusi berikutnya:**  
> Jika website akan segera diiklankan via FB/IG Ads, segera prioritaskan **Item 1 (Tracking)** dan **Item 2 (SEO/Thumbnail)** sebelum mulai menghabiskan budget iklan.
