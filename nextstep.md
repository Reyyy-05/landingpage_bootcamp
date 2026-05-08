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
- [x] Ganti teks "Creativemu Academy" di Navbar dan Footer menjadi file gambar Logo resmi.
- [ ] Update `favicon.ico` dan `apple-icon.png`.
- [x] Siapkan *assets* logo perusahaan/universitas alumni jika ada section *Social Proof*.
- [x] Download & pasang 8 logo mitra baru: Bank Indonesia, SMKN 1 Bantul, SMKN 1 Godean, SMK 1 Argomulyo, UNISA, UNU Jogja, UMBY, Smile Group Jogja.
- [ ] **Upload 5 logo mitra yang masih kurang** (file belum tersedia, website mereka error/tidak accessible):
  - `public/logos/smkn1-sanden.png` — SMKN 1 Sanden
  - `public/logos/smkn1-tempel.png` — SMKN 1 Tempel
  - `public/logos/smk17-seyegan.png` — SMK 17 Seyegan
  - `public/logos/smkn1-gedangsari.png` — SMKN 1 Gedangsari
  - `public/logos/nuansa-global.png` — Nuansa Global
  > Setelah file di-upload ke folder tersebut, uncomment entri di `TrustedSection.tsx`.

### 4. Konten Copywriting Nyata
**Yang perlu dilakukan:**
- [ ] Minta kurikulum resmi bulan 1 sampai 6 dari tim materi, lalu masukkan ke `RoadmapSection.tsx`.
- [x] Ganti teks deskripsi keunggulan di `FeaturesSection.tsx` agar sesuai dengan *Unique Selling Proposition* terbaru. (Selesai pada revisi terbaru: Sertif BNSP, Job Connection, Career Support, dll)
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
| Landing Page Utama (UI/UX) | ✅ Selesai (Logo resmi, navigasi, social links, promo banner, 14 logo mitra) |
| Form Registrasi & Logika | ✅ Selesai (Pemisahan field status Pendidikan/Lainnya) |
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
