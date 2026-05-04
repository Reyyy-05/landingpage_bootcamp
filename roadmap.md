# 🗺️ ROADMAP.md — CreativeMU Academy Website
> **Total Estimasi:** ~5–6 Minggu  
> **Metodologi:** Sprint-based, 1 minggu per fase  
> **Stack:** Next.js 15 + Supabase + shadcn/ui (nova preset)

---

## Overview Timeline

```
Minggu 1   → Phase 1: Setup & Fondasi
Minggu 2   → Phase 2: Landing Page
Minggu 3   → Phase 3: Form Pendaftaran & Confirmation
Minggu 4   → Phase 4: Admin Dashboard Core
Minggu 5   → Phase 5: Dashboard Advanced + Polish
Minggu 6   → Phase 6: Testing, SEO & Deployment
```

---

## Phase 1 — Project Setup & Fondasi
**Estimasi: 3–4 hari**

### 1.1 Inisialisasi Project
- [ ] `npx create-next-app@latest creativemu-academy --typescript --tailwind --app`
- [ ] Setup shadcn/ui: `npx shadcn@latest init --preset nova`
- [ ] Konfigurasi `next.config.ts` (images, domains)
- [ ] Setup path alias `@/` di `tsconfig.json`
- [ ] Install dependencies:
  ```bash
  npm i @supabase/supabase-js @supabase/ssr
  npm i react-hook-form @hookform/resolvers zod
  npm i @tanstack/react-table
  npm i sonner zustand
  npm i next/font (built-in)
  ```

### 1.2 Supabase Setup
- [ ] Buat tabel di Supabase: `admins`, `bootcamps`, `vouchers`, `students`
- [ ] Setup Row Level Security (RLS) policies
- [ ] Buat admin user pertama via Supabase Auth dashboard
- [ ] Setup Supabase client: `lib/supabase/client.ts`, `server.ts`
- [ ] Seed data: 1 bootcamp aktif + 2–3 voucher contoh

### 1.3 Design System
- [ ] Konfigurasi Tailwind CSS v4 tokens (colors, fonts)
- [ ] Install & setup fonts: Syne + Plus Jakarta Sans via `next/font`
- [ ] Setup global CSS variables (violet palette)
- [ ] Apply shadcn `nova` theme + custom overrides
- [ ] Buat `lib/utils.ts` (cn, formatCurrency, formatDate)
- [ ] Buat `types/index.ts` (TypeScript types untuk semua tabel)
- [ ] Buat `constants/index.ts` (WA_NUMBER, APP_URL, dll)

### 1.4 Layout Dasar
- [ ] Public layout: `(public)/layout.tsx`
- [ ] Dashboard layout: `dashboard/layout.tsx` (sidebar placeholder)
- [ ] Middleware auth: proteksi route `/dashboard/*`

**✅ Deliverable Phase 1:** Project running, DB connected, design tokens ready

---

## Phase 2 — Landing Page
**Estimasi: 5–6 hari**

### 2.1 Navbar
- [ ] Logo CreativeMU Academy
- [ ] Menu anchor links (Kurikulum, Mentor, Harga, Showcase)
- [ ] CTA button "Daftar Sekarang" → `/daftar`
- [ ] Mobile responsive (hamburger menu)
- [ ] Sticky + scroll effect (transparent → solid)

### 2.2 Hero Section
- [ ] Headline bold: "Jadi Digital Marketer Profesional..."
- [ ] Badge "Sertifikasi Resmi BNSP"
- [ ] Sub-headline + CTA buttons ("Daftar Batch", "Konsultasi Gratis")
- [ ] Batch info card (batch number, status, sisa kursi dari DB)
- [ ] Foto/ilustrasi kanan
- [ ] Lavender/violet gradient background
- [ ] Animasi entrance (staggered reveal)

### 2.3 Features Section
- [ ] Label "KENAPA CREATIVEMU?"
- [ ] Headline "Keunggulan Program"
- [ ] 6 feature cards dengan icon Lucide:
  - Sertifikasi Resmi BNSP
  - Mentor Praktisi Industri
  - Proyek Portfolio Nyata
  - Career Support 1 Tahun
  - Kurikulum Selalu Update
  - Komunitas Discord Aktif
- [ ] Hover effect pada cards

### 2.4 Roadmap/Curriculum Section
- [ ] Timeline vertikal numbered (1, 2, 3...)
- [ ] Data dari bootcamp aktif (atau hardcoded kurikulum)
- [ ] Rounded cards per tahap
- [ ] Badge "FINAL STAGE" pada tahap terakhir

### 2.5 Pricing Section
- [ ] Label "INVESTASI KARIR"
- [ ] 3 paket cards: Reguler, Premium (BNSP) ⭐, Intensif
- [ ] Harga dinamis dari DB bootcamp aktif
- [ ] Feature checklist per paket
- [ ] "PALING POPULER" badge pada Premium
- [ ] CTA button per paket → `/daftar?package=...`

### 2.6 CTA Section
- [ ] Split layout: kiri (info batch) + kanan (mini form)
- [ ] Kiri: judul CTA, tanggal mulai, lokasi, testimoni alumni
- [ ] Kanan: mini form (nama, email, WA, paket, kirim)
- [ ] Ini mini form → redirect ke `/daftar` dengan pre-fill data

### 2.7 Footer
- [ ] Logo + deskripsi CreativeMU Academy
- [ ] Sosmed links (Instagram, YouTube, Facebook)
- [ ] Links: Program, Keunggulan, Kurikulum, Harga & Paket, Daftar Sekarang
- [ ] Kontak: email, telepon, alamat
- [ ] Copyright
- [ ] Dark background (#0F0F1A)

**✅ Deliverable Phase 2:** Landing page lengkap, responsive, data dinamis dari DB

---

## Phase 3 — Form Pendaftaran & Confirmation
**Estimasi: 3–4 hari**

### 3.1 Halaman Form Pendaftaran (`/daftar`)
- [ ] Multi-step form (opsional: step 1 data pribadi, step 2 program)
- [ ] Field sesuai urutan form Google:
  1. Email
  2. Nama Lengkap
  3. Tempat Lahir
  4. Tanggal Lahir (date picker)
  5. Alamat (textarea)
  6. Nomor WhatsApp
  7. Akun Instagram
  8. Jenis Kelamin (radio)
  9. Status (select: pelajar kelas 1-3 SMA/SMK, mahasiswa tahun 1-4, lainnya)
  10. Jurusan/Prodi (conditional: tampil jika mahasiswa)
  11. Pilih Program (select dari DB)
  12. Pilih Paket (radio: Reguler/Premium/Intensif)
  13. Kode Voucher (input + validasi real-time via API)
- [ ] Validasi Zod + React Hook Form
- [ ] Error messages per field
- [ ] Pre-fill dari query params (jika dari CTA)
- [ ] Loading state saat submit
- [ ] Unique constraint check (email + bootcamp)

### 3.2 API Route: Voucher Validation
- [ ] `POST /api/vouchers/validate`
- [ ] Validasi: kode valid, aktif, belum habis, masih dalam periode
- [ ] Return: discount info atau error message
- [ ] Tampilkan diskon yang diterapkan real-time

### 3.3 API Route: Student Registration
- [ ] `POST /api/students`
- [ ] Validasi server-side (Zod)
- [ ] Check duplicate (email + bootcamp_id)
- [ ] Insert ke tabel students
- [ ] Increment `voucher.used_count` jika ada voucher
- [ ] Return student ID

### 3.4 Halaman Konfirmasi (`/konfirmasi`)
- [ ] Tampilkan ringkasan pendaftaran:
  - Nama lengkap
  - Program & paket dipilih
  - Nomor registrasi (ID)
  - Status: "Menunggu Konfirmasi"
- [ ] Instruksi langkah selanjutnya
- [ ] CTA button "Chat Admin via WhatsApp"
  - Link: `wa.me/6285177114036?text=Halo+Admin...`
  - Pre-filled: nama, program, nomor registrasi
- [ ] Countdown/urgency element (optional)

**✅ Deliverable Phase 3:** Form submit → DB → Konfirmasi → WA redirect berjalan sempurna

---

## Phase 4 — Admin Dashboard Core
**Estimasi: 5–6 hari**

### 4.1 Login Admin (`/admin/login`)
- [ ] Form email + password
- [ ] Supabase Auth signInWithPassword
- [ ] Validasi: hanya user yang ada di tabel `admins` dengan `is_active=true`
- [ ] Redirect ke `/dashboard` setelah login
- [ ] Error handling (invalid credentials)

### 4.2 Dashboard Layout
- [ ] Sidebar navigation (shadcn Sidebar component):
  - Overview
  - Students
  - Bootcamps
  - Vouchers
  - (Avatar + Logout button di bottom)
- [ ] Header dengan breadcrumb
- [ ] Dark sidebar + light content (custom theme)
- [ ] Responsive: sidebar collapsible di mobile

### 4.3 Overview Page (`/dashboard`)
- [ ] Stats cards:
  - Total Pendaftar
  - Pending (kuning)
  - Confirmed (hijau)
  - Rejected (merah)
- [ ] Mini table: 5 pendaftar terbaru
- [ ] Filter by bootcamp/batch

### 4.4 Students Table (`/dashboard/students`)
- [ ] TanStack Table v8 dengan shadcn Table component
- [ ] Kolom: No, Nama, Email, WA, Program, Paket, Status, Tanggal Daftar, Actions
- [ ] ✅ Column sorting (semua kolom)
- [ ] ✅ Multi-select checkbox
- [ ] ✅ Filter panel (Sheet):
  - Filter status: All / Pending / Confirmed / Rejected
  - Filter program/batch
  - Filter gender
  - Filter student_status
- [ ] ✅ Search bar (nama, email, WA)
- [ ] ✅ Pagination (10/25/50 per page)
- [ ] ✅ Row actions (DropdownMenu):
  - View Detail
  - Edit Data
  - Confirm / Reject (dengan AlertDialog konfirmasi)
  - **Buka WA Chat** → wa.me link langsung
  - Hapus (dengan AlertDialog)
- [ ] ✅ Bulk actions (muncul saat ada row terpilih):
  - Bulk Confirm
  - Bulk Reject
  - Export CSV
- [ ] Export semua data ke CSV

### 4.5 Student Detail & Edit (`/dashboard/students/[id]`)
- [ ] View semua data student lengkap
- [ ] Form edit (sama seperti form pendaftaran, semua field bisa diedit)
- [ ] Ubah status (select: pending/confirmed/rejected)
- [ ] Admin notes textarea
- [ ] History log (kapan confirmed, oleh siapa)
- [ ] WA chat button

**✅ Deliverable Phase 4:** Admin bisa login, lihat, filter, search, ubah status student

---

## Phase 5 — Dashboard Advanced (Bootcamp & Voucher)
**Estimasi: 4–5 hari**

### 5.1 Bootcamp Management (`/dashboard/bootcamps`)
- [ ] List semua bootcamp (card/table view)
- [ ] Progress bar: terdaftar/kapasitas per batch
- [ ] Badge status: Aktif/Tutup/Penuh
- [ ] Toggle is_open langsung dari list
- [ ] Create bootcamp baru (Dialog form)
- [ ] Edit bootcamp (full page atau sheet)
- [ ] Delete dengan konfirmasi
- [ ] Klik bootcamp → lihat list student yang terdaftar

### 5.2 Voucher Management (`/dashboard/vouchers`)
- [ ] List semua voucher dengan usage stats (dipakai/maks)
- [ ] Progress bar penggunaan
- [ ] Badge: aktif/expired/habis
- [ ] Create voucher:
  - Kode (manual input atau auto-generate)
  - Bootcamp target (semua atau spesifik)
  - Tipe diskon (fixed/percentage)
  - Nilai diskon
  - Maks penggunaan
  - Tanggal berlaku
- [ ] Edit & toggle aktif/nonaktif
- [ ] View siapa saja yang pakai voucher ini (sub-table)
- [ ] Copy kode voucher ke clipboard

### 5.3 Polish & UX
- [ ] Loading skeletons untuk semua tabel
- [ ] Empty states (gambar + teks jika data kosong)
- [ ] Toast notifications untuk semua aksi (sukses/gagal)
- [ ] Konfirmasi dialog untuk aksi destruktif
- [ ] Keyboard navigation di tabel
- [ ] Optimistic updates

**✅ Deliverable Phase 5:** Dashboard lengkap semua fitur berjalan

---

## Phase 6 — Testing, SEO & Deployment
**Estimasi: 3–4 hari**

### 6.1 SEO & Metadata
- [ ] `generateMetadata()` di semua halaman publik
- [ ] Title tags (50–60 karakter)
- [ ] Meta descriptions (120–155 karakter)
- [ ] OG images (`app/opengraph-image.tsx`)
- [ ] Structured data (JSON-LD untuk Organization)
- [ ] `sitemap.xml` + `robots.txt`

### 6.2 Performance
- [ ] `next/image` untuk semua gambar
- [ ] Lazy loading sections
- [ ] Font preloading
- [ ] Bundle analysis

### 6.3 Accessibility
- [ ] Semantic HTML (h1, h2, landmarks)
- [ ] ARIA labels pada form & interactive elements
- [ ] Keyboard navigability
- [ ] Color contrast check

### 6.4 Testing End-to-End
- [ ] Test form pendaftaran: submit → DB → konfirmasi → WA link
- [ ] Test voucher: valid, expired, habis kuota
- [ ] Test admin login + semua CRUD
- [ ] Test di mobile (iOS Safari, Android Chrome)
- [ ] Test di berbagai ukuran layar

### 6.5 Deployment
- [ ] Push ke GitHub (repo private)
- [ ] Connect ke Vercel
- [ ] Set environment variables di Vercel
- [ ] Setup custom domain
- [ ] Enable Vercel Analytics
- [ ] Test production build

**✅ Deliverable Phase 6:** Website live di production, semua fitur berjalan

---

## Milestones Summary

| Fase | Target | Status |
|------|--------|--------|
| Phase 1: Setup | Minggu 1 | ⬜ Belum |
| Phase 2: Landing Page | Minggu 2 | ⬜ Belum |
| Phase 3: Form & Konfirmasi | Minggu 3 | ⬜ Belum |
| Phase 4: Dashboard Core | Minggu 4 | ⬜ Belum |
| Phase 5: Dashboard Advanced | Minggu 5 | ⬜ Belum |
| Phase 6: Testing & Deploy | Minggu 6 | ⬜ Belum |

---

## Dependensi Antar Phase

```
Phase 1 (Setup)
    ↓
Phase 2 (Landing)  ←→  Phase 3 (Form) ← bisa paralel setelah Phase 1
    ↓                      ↓
Phase 4 (Dashboard Core) ← butuh DB dari Phase 1 + 3
    ↓
Phase 5 (Dashboard Advanced)
    ↓
Phase 6 (Deploy)
```

---

## Pertanyaan yang Perlu Didiskusikan

> ❓ **Kurikulum Roadmap:** Apakah konten roadmap (timeline bulan 1-6) dikelola dari dashboard admin atau hardcoded?  
> ❓ **Mentor Section:** Apakah perlu section showcase mentor? Jika ya, data dari DB atau hardcoded?  
> ❓ **Showcase/Portfolio:** Apakah perlu section showcase proyek alumni?  
> ❓ **Multi-step Form:** Satu halaman panjang atau dibagi 2-3 step dengan progress indicator?
