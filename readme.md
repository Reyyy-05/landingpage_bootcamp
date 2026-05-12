# CreativeMU Academy — Website Pendaftaran

> Platform pendaftaran digital resmi **CreativeMU Academy** — lembaga pelatihan Digital Marketing & Teknologi bersertifikasi BNSP di Yogyakarta.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-nova-violet)](https://ui.shadcn.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-blue?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## 📖 Tentang Project

Website ini dibangun untuk **CreativeMU Academy** sebagai platform:

| Fitur | Deskripsi |
|-------|-----------|
| 🏠 **Landing Page** | Showcase program, keunggulan, kurikulum, dan harga |
| 📝 **Form Pendaftaran** | Formulir lengkap data calon siswa |
| ✅ **Konfirmasi** | Halaman konfirmasi + redirect ke WhatsApp admin |
| 🔐 **Admin Dashboard** | Manajemen student, bootcamp, dan kode voucher |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| UI Library | shadcn/ui (nova preset) |
| Styling | Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Table | TanStack Table v8 |
| State | Zustand |
| Notifications | Sonner |
| Fonts | Syne + Plus Jakarta Sans (via next/font) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm / pnpm / bun
- Akun Supabase
- Akun Vercel (untuk deployment)

### 1. Clone Repository

```bash
git clone https://github.com/[org]/creativemu-academy.git
cd creativemu-academy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# App Config
NEXT_PUBLIC_ADMIN_WA_NUMBER=6285177114036
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **Jangan commit** `SUPABASE_SERVICE_ROLE_KEY` ke repository!

### 4. Setup Database

Jalankan migration SQL berikut di Supabase SQL Editor secara berurutan:

```
supabase/migrations/
├── 001_create_admins.sql
├── 002_create_bootcamps.sql
├── 003_create_vouchers.sql
├── 004_create_students.sql
└── 005_rls_policies.sql
```

Atau jalankan via Supabase CLI:

```bash
npx supabase db push
```

### 5. Buat Admin User

1. Buka **Supabase Dashboard** → Authentication → Users
2. Klik "Invite User" → masukkan email admin
3. Setelah user membuat password, tambahkan ke tabel `admins`:

```sql
INSERT INTO admins (user_id, full_name, email)
VALUES (
  'uuid-dari-auth-users',
  'Nama Admin',
  'admin@email.com'
);
```

### 6. Seed Data (Development)

```bash
npm run db:seed
```

Ini akan membuat:
- 1 bootcamp aktif (Batch 12 - 2026)
- 3 voucher contoh (CM2026, EARLY10, BNSP20)

### 7. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Project

```
creativemu-academy/
├── app/
│   ├── (public)/              # Landing page & form publik
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing page
│   │   ├── daftar/page.tsx    # Form pendaftaran
│   │   └── konfirmasi/page.tsx
│   ├── (auth)/
│   │   └── admin/login/page.tsx
│   ├── dashboard/             # Admin dashboard (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── students/
│   │   ├── bootcamps/
│   │   └── vouchers/
│   └── api/
│       ├── students/route.ts
│       └── vouchers/validate/route.ts
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── landing/               # Landing page sections
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── SocialProof.tsx      # Avatar stack social proof
│   │   ├── UrgencyBlock.tsx     # Countdown timer (unused)
│   │   ├── FeaturesSection.tsx
│   │   ├── RoadmapSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── dashboard/             # Dashboard components
│   │   ├── StudentsTable.tsx
│   │   ├── StudentFilters.tsx
│   │   ├── BootcampCard.tsx
│   │   └── VoucherCard.tsx
│   └── shared/                # Reusable components
│       ├── StatusBadge.tsx
│       └── WAButton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Browser Supabase client
│   │   ├── server.ts          # Server Supabase client
│   │   └── middleware.ts      # Middleware client
│   ├── validations/
│   │   ├── student.ts         # Zod schema pendaftaran
│   │   └── bootcamp.ts
│   └── utils.ts               # Helper: cn, formatCurrency
├── hooks/
│   ├── useStudents.ts
│   └── useBootcamps.ts
├── types/
│   └── index.ts               # TypeScript interfaces
├── constants/
│   └── index.ts               # WA_NUMBER, STATUS_OPTIONS
├── supabase/
│   └── migrations/            # SQL migration files
├── public/
│   └── images/
├── .env.local                 # Environment variables (gitignored)
├── components.json            # shadcn/ui config
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Schema

### `students` — Data Pendaftar
```sql
id, email, full_name, birth_place, birth_date, address,
phone_wa, instagram_handle, gender, student_status, school_name,
university_name, major, bootcamp_id, package_selected, voucher_id, 
voucher_code_used, registration_status, admin_notes, confirmed_at, 
confirmed_by, created_at, updated_at
```

### `bootcamps` — Program & Batch
```sql
id, name, program_type, batch_number, description,
start_date, end_date, registration_open, registration_close,
max_capacity, price_reguler, price_premium, price_intensif,
location, is_active, is_open, created_at, updated_at
```

### `vouchers` — Kode Diskon
```sql
id, code, bootcamp_id, description, discount_type,
discount_value, max_uses, used_count, valid_from, valid_until,
is_active, created_by, created_at, updated_at
```

### `admins` — Admin Users
```sql
id, user_id, full_name, email, is_active, created_at, updated_at
```

---

## 🔐 Autentikasi & Akses

| Route | Akses |
|-------|-------|
| `/` | Public |
| `/daftar` | Public |
| `/konfirmasi` | Public |
| `/admin/login` | Public (redirect jika sudah login) |
| `/dashboard/*` | Private — hanya admin aktif |

Admin dibuat manual via Supabase Auth + insert ke tabel `admins`. Tidak ada registrasi publik.

---

## 📱 Halaman Utama

### Landing Page `/`
Sections: **Navbar → Hero (Benefit Chips, Social Proof, Stats Bar) → Trusted → Features → Roadmap → CTA → Footer**

### Form Pendaftaran `/daftar`
Field wajib sesuai form original:
1. Email, Nama Lengkap, Tempat Lahir, Tanggal Lahir
2. Alamat, No. WhatsApp, Akun Instagram
3. Jenis Kelamin, Status (Pelajar/Mahasiswa), Jurusan
4. Pilih Program, Pilih Paket, Kode Voucher (opsional)

### Konfirmasi `/konfirmasi`
Setelah submit → tampil ringkasan + tombol chat WA admin:
```
wa.me/6285177114036?text=Halo+Admin...
```

### Admin Dashboard `/dashboard`
- **Overview:** Stats pendaftar + tabel terbaru
- **Students:** Tabel lengkap (filter, sort, search, export, WA)
- **Bootcamps:** CRUD program & batch + kapasitas
- **Vouchers:** CRUD kode voucher + usage tracking

---

## 🎨 Design System

```
Color Palette:
  Primary:     #5B21B6  (violet-800)
  Accent:      #7C3AED  (violet-600)
  Background:  #F5F3FF → white gradient
  Dark:        #0F0F1A  (footer, sidebar)

Typography:
  Display:     Syne (700, 800) — headlines
  Body:        Plus Jakarta Sans (400, 500, 600)

shadcn/ui:
  Style:       nova
  Radius:      0.5rem
  Icon lib:    lucide-react
```

---

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
npm run db:seed      # Seed database (development only)
```

---

## 🌐 Environment Variables

| Variable | Required | Keterangan |
|----------|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ | Publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service role (server only) |
| `NEXT_PUBLIC_ADMIN_WA_NUMBER` | ✅ | Nomor WA admin |
| `NEXT_PUBLIC_APP_URL` | ✅ | URL aplikasi |

---

## 📞 Kontak Admin

- **WhatsApp:** [+62 851-7711-4036](https://wa.me/6285177114036)
- **Website:** [creativemu.id](https://creativemu.id)
- **Email:** info@creativemu.id
- **Instagram:** [@creativemuid](https://instagram.com/creativemuid)
- **Lokasi:** Bantul, Yogyakarta

---

## 📄 Lisensi

© 2026 CreativeMU Academy. All rights reserved.  
Project ini adalah website resmi milik CreativeMU Academy.
