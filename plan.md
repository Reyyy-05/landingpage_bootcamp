# 📋 PLAN.md — CreativeMU Academy Website
> **Status:** Draft v1.0 | 2026-05-05  
> **Tech Stack:** Next.js 15 (App Router) + Supabase + shadcn/ui

---

## 1. Gambaran Umum Project

**CreativeMU Academy** adalah lembaga pelatihan digital & teknologi di Bantul, Yogyakarta. Website ini berfungsi sebagai:
1. **Landing Page Publik** — Showcasing program, keunggulan, dan harga
2. **Form Pendaftaran Student** — Mengumpulkan data calon siswa
3. **Confirmation Page** — Redirect ke WA admin setelah daftar
4. **Admin Dashboard** — Manajemen data student, bootcamp, dan voucher

---

## 2. Tech Stack

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Framework | **Next.js 15** (App Router) | Server Components, SSR |
| Database | **Supabase** (PostgreSQL) | Auth, RLS, Realtime |
| UI Components | **shadcn/ui** | Konsisten, accessible, themeable |
| Styling | **Tailwind CSS v4** | Utility-first |
| Auth | **Supabase Auth** | Multi-admin support |
| Form | **React Hook Form + Zod** | Validasi client & server |
| Table | **TanStack Table v8** | Sorting, filtering, pagination |
| Toast | **Sonner** | Notifikasi feedback |
| Icons | **Lucide React** | Konsisten dengan shadcn |
| Font | **next/font** | Zero-CLS, self-hosted |
| Deployment | **Vercel** | Native Next.js deployment |

---

## 3. Struktur Database (Supabase)

### Table: `admins`
| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `uuid` | PK | |
| `user_id` | `uuid` | FK auth.users, UNIQUE | Supabase Auth |
| `full_name` | `text` | NOT NULL | |
| `email` | `text` | NOT NULL, UNIQUE | |
| `is_active` | `boolean` | DEFAULT true | |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

### Table: `bootcamps`
| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `uuid` | PK | |
| `name` | `text` | NOT NULL | Nama program & batch |
| `program_type` | `text` | NOT NULL | bootcamp/magang/sertifikasi |
| `batch_number` | `integer` | NOT NULL | Nomor batch |
| `description` | `text` | | |
| `start_date` | `date` | | |
| `end_date` | `date` | | |
| `registration_open` | `date` | | |
| `registration_close` | `date` | | |
| `max_capacity` | `integer` | NOT NULL | Kapasitas maks |
| `price_reguler` | `bigint` | NOT NULL | Harga Reguler (IDR) |
| `price_premium` | `bigint` | | Harga Premium/BNSP (IDR) |
| `price_intensif` | `bigint` | | Harga Intensif (IDR) |
| `location` | `text` | | Online/Offline/Hybrid |
| `is_active` | `boolean` | DEFAULT true | |
| `is_open` | `boolean` | DEFAULT false | Pendaftaran dibuka? |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

### Table: `vouchers`
| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `uuid` | PK | |
| `code` | `text` | NOT NULL, UNIQUE | Kode voucher |
| `bootcamp_id` | `uuid` | FK bootcamps, NULLABLE | null = berlaku semua |
| `description` | `text` | | |
| `discount_type` | `text` | NOT NULL | fixed / percentage |
| `discount_value` | `bigint` | NOT NULL | Nilai diskon |
| `max_uses` | `integer` | NOT NULL | Maks penggunaan |
| `used_count` | `integer` | DEFAULT 0 | Sudah dipakai |
| `valid_from` | `timestamptz` | | |
| `valid_until` | `timestamptz` | | |
| `is_active` | `boolean` | DEFAULT true | |
| `created_by` | `uuid` | FK admins | |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

### Table: `students` — Field wajib tidak boleh dikurangi
| Kolom | Tipe | Constraint | Keterangan |
|-------|------|------------|------------|
| `id` | `uuid` | PK | |
| `email` | `text` | NOT NULL | |
| `full_name` | `text` | NOT NULL | Nama lengkap |
| `birth_place` | `text` | NOT NULL | Tempat lahir |
| `birth_date` | `date` | NOT NULL | Tanggal lahir |
| `address` | `text` | NOT NULL | Alamat lengkap |
| `phone_wa` | `text` | NOT NULL | Nomor WhatsApp |
| `instagram_handle` | `text` | NOT NULL | Akun Instagram |
| `gender` | `text` | NOT NULL | laki-laki / perempuan |
| `student_status` | `text` | NOT NULL | Enum pelajar/mahasiswa |
| `major` | `text` | NULLABLE | Jurusan/Prodi (opsional) |
| `bootcamp_id` | `uuid` | FK bootcamps | Program dipilih |
| `package_selected` | `text` | | reguler/premium/intensif |
| `voucher_id` | `uuid` | FK vouchers, NULLABLE | |
| `voucher_code_used` | `text` | NULLABLE | History kode voucher |
| `registration_status` | `text` | DEFAULT 'pending' | pending/confirmed/rejected |
| `admin_notes` | `text` | | Catatan admin |
| `confirmed_at` | `timestamptz` | | |
| `confirmed_by` | `uuid` | FK admins | |
| `created_at` | `timestamptz` | DEFAULT now() | |
| `updated_at` | `timestamptz` | DEFAULT now() | |

**Unique constraint:** `(email, bootcamp_id)` — 1 email hanya bisa daftar 1x per bootcamp

---

## 4. Struktur Routes

```
app/
├── (public)/
│   ├── layout.tsx            # Navbar + Footer
│   ├── page.tsx              # Landing page utama
│   ├── daftar/page.tsx       # Form pendaftaran
│   └── konfirmasi/page.tsx   # Konfirmasi + WA redirect
├── (auth)/admin/login/page.tsx
├── dashboard/
│   ├── layout.tsx            # Sidebar + header
│   ├── page.tsx              # Overview & stats
│   ├── students/page.tsx     # Tabel student lengkap
│   ├── students/[id]/page.tsx
│   ├── bootcamps/page.tsx
│   ├── bootcamps/[id]/page.tsx
│   ├── vouchers/page.tsx
│   └── vouchers/[id]/page.tsx
└── api/
    ├── students/route.ts
    └── vouchers/validate/route.ts
```

---

## 5. Landing Page Sections

| # | Section | Konten Utama |
|---|---------|--------------|
| 1 | Navbar | Logo, menu anchor, CTA "Daftar Sekarang" |
| 2 | Hero | Headline bold, badge BNSP, batch info card, foto |
| 3 | Features | 6 keunggulan program (BNSP, Mentor, Proyek, dll) |
| 4 | Roadmap | Timeline kurikulum per bulan |
| 5 | Pricing | 3 paket dengan harga dinamis dari DB |
| 6 | CTA | Split: info batch kiri + mini form kanan |
| 7 | Footer | Logo, sosmed, links, kontak |

---

## 6. Form Field Order

```tsx
interface StudentFormData {
  email: string
  full_name: string
  birth_place: string
  birth_date: Date
  address: string
  phone_wa: string           // 08xxx format
  instagram_handle: string   // @username
  gender: 'laki-laki' | 'perempuan'
  student_status: StudentStatus
  major?: string             // tampil jika mahasiswa
  bootcamp_id: string        // dari DB
  package_selected: string
  voucher_code?: string      // validate on blur
}
```

---

## 7. Dashboard Features

### Students Table
- Multi-select rows, sort semua kolom
- Filter: status, program, batch, gender, student_status
- Search: nama, email, WA
- Pagination: 10/25/50 per page
- Row actions: View, Edit, Ubah Status, **Buka WA Chat**, Hapus
- Bulk: confirm, reject, export CSV

### Bootcamps Management
- CRUD bootcamp/batch
- Toggle is_open (buka/tutup pendaftaran)
- Progress bar kapasitas
- Lihat student per batch

### Vouchers Management
- CRUD voucher + toggle aktif
- View usage & sisa kuota
- Auto-generate kode random

### Phase 5: Dashboard Advanced & UX Polish (Selesai 100%)
**Fokus**: Melengkapi fitur manajemen konten (bootcamp & voucher) serta menyempurnakan alur pendaftaran.

*   [x] **Bootcamp Management**
    *   [x] Buat komponen list/tabel untuk melihat semua bootcamp (`/dashboard/bootcamps`).
    *   [x] Tambahkan fitur toggle (aktif/non-aktif) status pendaftaran menggunakan *Server Actions*.
    *   [x] Buat modal/form untuk menambah & mengedit data bootcamp.
*   [x] **Voucher Management**
    *   [x] Buat komponen list/tabel untuk manajemen voucher (`/dashboard/vouchers`).
    *   [x] Buat form pembuatan voucher baru dengan validasi tanggal dan jumlah maksimal pemakaian.
*   [x] **UI/UX Polish**
    *   [x] Sempurnakan tampilan admin dashboard agar sepenuhnya responsif di semua ukuran layar (termasuk *overflow-x-auto* pada tabel).
    *   [x] Perbaiki *state management* pemilihan paket pada form pendaftaran agar lebih intuitif.
    *   [x] Tangani error dari sisi server dengan memberikan pesan error yang jelas kepada pengguna (termasuk *raw database error* saat *debugging*).
    *   [x] Perbaiki fungsi *Logout* di dashboard admin menggunakan `useTransition`.

---

## 8. Confirmation Page Flow

```
[Form Submit] → [DB Insert] → [Konfirmasi Page]
                                    |
                         Tampilkan nama, program, ID registrasi
                                    |
                         [Button: Chat Admin WA]
                         wa.me/6285177114036?text=...
                         (pre-filled: Nama + Program + ID)
```

---

## 9. Design System

```
Colors:
  Primary:    #5B21B6 (violet-800)
  Accent:     #7C3AED (violet-600)
  Light bg:   #F5F3FF → white gradient
  Dark:       #0F0F1A (footer + sidebar)

Typography:
  Display:  "Syne" (bold headlines)
  Body:     "Plus Jakarta Sans"

Shadcn: style=nova, radius=0.5rem
Dashboard: dark sidebar + light content
```

---

## 10. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://sdzkekjmamsbussetjam.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_ADMIN_WA_NUMBER=6285177114036
NEXT_PUBLIC_APP_URL=https://creativemuacademy.com
```
