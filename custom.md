# 🎨 Panduan Kustomisasi Konten Landing Page (custom.md)

Dokumen ini adalah panduan teknis bagi tim konten atau *developer* untuk mengubah teks (*copywriting*) dan gambar (*assets*) pada website agar **100% identik dengan desain asli di folder `ui_references`**.

Karena sistem website kita menggunakan arsitektur komponen (React/Next.js), setiap bagian (Section) dari desain dipisah ke dalam file yang berbeda agar lebih rapi.

---

## 📂 Lokasi File yang Perlu Diubah
Semua file yang mengatur tampilan depan (Landing Page) berada di dalam folder:
👉 `src/components/landing/`

Berikut adalah pemetaan (*mapping*) antara gambar desain di `ui_references` dengan file kode yang harus di-edit:

### 1. `hero.png` (Bagian Atas / Layar Pertama)
*   **File Target:** `src/components/landing/HeroSection.tsx`
*   **Yang harus diubah:**
    *   Teks Headline utama (H1) dan Sub-headline.
    *   Mengganti ilustrasi/foto (saat ini menggunakan ikon placeholder/kosong) dengan foto asli suasana kelas atau gambar ilustrasi pahlawan (*hero image*).
    *   Pastikan gambar baru dimasukkan ke folder `public/images/` dan *path*-nya diperbarui di kode.

### 2. `features.png` (Keunggulan Program)
*   **File Target:** `src/components/landing/FeaturesSection.tsx`
*   **Yang harus diubah:**
    *   Teks judul seksi "KENAPA CREATIVEMU?".
    *   Isi konten dari 6 kotak keunggulan (saat ini teksnya masih umum). Kamu harus menyesuaikan *Title*, *Description*, dan memilih *Icon* yang sesuai dengan gambar asli.

### 3. `roadmap.png` (Kurikulum / Alur Belajar)
*   **File Target:** `src/components/landing/RoadmapSection.tsx`
*   **Yang harus diubah:**
    *   Ini adalah bagian yang paling krusial. Teks materi Bulan 1 sampai Bulan 6 saat ini masih berupa data *dummy*.
    *   Ubah data array `roadmapData` di dalam file tersebut agar isinya sama persis dengan kurikulum Laravel Full-Stack asli yang ada di gambar desain.

### 4. `price.png` (Harga & Fasilitas)
*   **File Target:** `src/components/landing/PricingSection.tsx`
*   **Yang harus diubah:**
    *   *Penting:* Harga utama sebenarnya ditarik otomatis dari *Database Supabase*. Jadi untuk mengubah angka harganya, ubah lewat Dashboard Admin.
    *   Namun, untuk teks *list* fasilitas (contoh: "Akses selamanya", "Sertifikat", dll), kamu harus mengubahnya secara manual di file `PricingSection.tsx` pada variabel `packages` agar sesuai dengan gambar.

### 5. `CTA.png` (Testimoni & Call to Action Akhir)
*   **File Target:** `src/components/landing/CTASection.tsx`
*   **Yang harus diubah:**
    *   Jika di gambar asli terdapat foto mentor atau testimoni alumni, masukkan foto mereka ke folder `public/images/`.
    *   Sesuaikan kata-kata ajakan terakhir agar membangkitkan rasa urgensi (*FOMO*).

### 6. `footer.png` (Bagian Paling Bawah)
*   **File Target:** `src/components/landing/Footer.tsx`
*   **Yang harus diubah:**
    *   Alamat lengkap kantor (saat ini hanya tertulis "Bantul, Yogyakarta").
    *   Nomor WhatsApp, email perusahaan, dan tautan ke akun media sosial (Instagram, TikTok, dll) agar sesuai dengan milik CreativeMU.

---

## 🖼️ Persiapan Aset Gambar (Assets)
Sebelum mulai mengedit kode, sangat disarankan untuk mengumpulkan gambar-gambar berikut (ekspor dari Figma/Canva desain asli):
1.  `logo-creativemu.png` / `.svg` (Untuk Navbar & Footer)
2.  `hero-image.png` (Ilustrasi bagian atas)
3.  Foto Mentor / Alumni (Jika ada)

**Cara Menyimpan Aset:**
1. Masukkan gambar ke dalam folder `public/images/` di proyek ini.
2. Panggil di dalam kode dengan cara: `<img src="/images/nama-file.png" />`

---

> **Kesimpulan:** 
> Ya, proses kustomisasi ini **sangat perlu** dilakukan sebagai langkah final (*finishing*) sebelum website di-publish secara luas, agar tidak ada lagi teks *dummy* (contoh) yang tersisa dan isi website 100% mencerminkan "ruh" asli dari CreativeMU Academy sesuai referensi desain.
