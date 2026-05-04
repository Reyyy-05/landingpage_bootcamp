# 📋 NEXT STEPS — CreativeMU Academy
> Dokumen ini berisi daftar penyempurnaan yang perlu dikerjakan, diurutkan berdasarkan prioritas.  
> Status: **Deployed ✅** | Form & Landing Page selesai | Phase 4, 5, Customisasi belum

---

## 🔴 PRIORITAS TINGGI — Perbaikan Form Pendaftaran

### 1. Tambah Field "Nama Sekolah" untuk Pelajar SMA/SMK
**Problem:** Saat user memilih status Pelajar Kelas 1/2/3 SMA/SMK, tidak ada field untuk mengisi nama sekolah asal.

**Yang perlu dilakukan:**
- [ ] Tambah kolom `school_name TEXT` di tabel `students` (migration SQL)
- [ ] Tambah field conditional di form: jika status = `pelajar_sma_smk_*` → tampilkan input "Nama Sekolah"
- [ ] Tambah validasi Zod untuk `school_name`
- [ ] Update API route `/api/students` agar menyimpan `school_name`
- [ ] Update TypeScript type `Student` di `types/index.ts`

**Migration SQL yang perlu dijalankan di Supabase:**
```sql
ALTER TABLE students ADD COLUMN IF NOT EXISTS school_name TEXT;
```

---

### 2. Tambah Field "Nama Kampus/Universitas" untuk Mahasiswa
**Problem:** Mahasiswa sudah ada field `major` (jurusan), tapi tidak ada field nama kampus/universitas.

**Yang perlu dilakukan:**
- [ ] Tambah kolom `university_name TEXT` di tabel `students` (migration SQL)
- [ ] Tambah field conditional di form: jika status = `mahasiswa_*` → tampilkan input "Nama Kampus/Universitas"
- [ ] Tambah validasi Zod untuk `university_name`
- [ ] Update API route `/api/students` agar menyimpan `university_name`
- [ ] Update TypeScript type `Student` di `types/index.ts`

**Migration SQL yang perlu dijalankan di Supabase:**
```sql
ALTER TABLE students ADD COLUMN IF NOT EXISTS university_name TEXT;
```

---

### 3. Perbaikan Logika Conditional Form
**Problem:** Saat ini hanya ada satu kondisi (mahasiswa → tampil jurusan). Perlu diperluas.

**Logika yang benar:**
```
Jika status = pelajar_sma_smk_1/2/3:
  → tampil: Nama Sekolah (required)
  → sembunyikan: Nama Kampus, Jurusan/Prodi

Jika status = mahasiswa_1/2/3/4:
  → tampil: Nama Kampus (required), Jurusan/Prodi (optional)
  → sembunyikan: Nama Sekolah

Jika status = lainnya:
  → semua field opsional
```

---

### 4. SQL Migration Lengkap Perbaikan Form
Jalankan di Supabase SQL Editor:

```sql
ALTER TABLE students ADD COLUMN IF NOT EXISTS school_name TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS university_name TEXT;

-- Update view agar include kolom baru
CREATE OR REPLACE VIEW students_with_details AS
  SELECT s.*,
    b.name AS bootcamp_name, b.batch_number AS bootcamp_batch,
    b.program_type AS bootcamp_program_type,
    v.code AS voucher_code, v.discount_type AS voucher_discount_type,
    v.discount_value AS voucher_discount_value,
    a.full_name AS confirmed_by_name
  FROM students s
  LEFT JOIN bootcamps b ON s.bootcamp_id = b.id
  LEFT JOIN vouchers  v ON s.voucher_id  = v.id
  LEFT JOIN admins    a ON s.confirmed_by = a.id;
```

---

## 🟡 PRIORITAS SEDANG — Phase 4: Admin Dashboard

### 5. Admin Login Page (`/admin/login`)
- [ ] Form email + password dengan tampilan premium
- [ ] Supabase Auth `signInWithPassword`
- [ ] Validasi: hanya user yang ada di tabel `admins` dengan `is_active = true`
- [ ] Error handling + loading state

### 6. Dashboard Sidebar & Header
- [ ] Sidebar navigasi: Overview, Students, Bootcamps, Vouchers
- [ ] Avatar admin + logout button
- [ ] Header dengan breadcrumb dan nama admin
- [ ] Responsive: collapsible di mobile

### 7. Dashboard Overview (`/dashboard`)
- [ ] 4 stats cards: Total, Pending, Confirmed, Rejected
- [ ] Mini table: 5 pendaftar terbaru
- [ ] Filter by bootcamp/batch

### 8. Students Table (`/dashboard/students`)
- [ ] TanStack Table v8 dengan semua fitur:
  - Column sorting, Multi-select checkbox
  - Filter panel (status, program, gender, student_status)
  - Search bar (nama, email, WA)
  - Pagination (10/25/50 per page)
- [ ] Kolom baru: Nama Sekolah / Nama Kampus (sesuai status)
- [ ] Row actions: View Detail, Edit, Confirm, Reject, Chat WA, Delete
- [ ] Bulk actions: Confirm semua, Reject semua
- [ ] Export CSV button

### 9. Student Detail & Edit (`/dashboard/students/[id]`)
- [ ] View semua data lengkap termasuk `school_name` dan `university_name`
- [ ] Form edit semua field
- [ ] Ubah status (Pending/Confirmed/Rejected) + admin notes
- [ ] WA chat button dengan pesan pre-filled

---

## 🟡 PRIORITAS SEDANG — Phase 5: Bootcamp & Voucher Management

### 10. Bootcamp Management (`/dashboard/bootcamps`)
- [ ] List semua bootcamp dengan progress bar kapasitas
- [ ] Toggle `is_open` langsung dari list
- [ ] Create / Edit / Delete bootcamp
- [ ] Klik bootcamp → lihat daftar student

### 11. Voucher Management (`/dashboard/vouchers`)
- [ ] List voucher dengan usage stats & badge status
- [ ] Create voucher + auto-generate kode
- [ ] Edit, toggle aktif, delete
- [ ] View siapa saja yang pakai voucher
- [ ] Copy kode ke clipboard

---

## 🟢 PRIORITAS RENDAH — Kustomisasi Konten & Desain

### 12. Logo & Branding
- [ ] Ganti teks "Creativemu Academy" di Navbar → image logo asli
- [ ] Update favicon (`app/favicon.ico`)
- [ ] OG image untuk social media preview

### 13. Konten Landing Page
- [ ] **Hero:** Foto/ilustrasi nyata (ganti placeholder emoji 🎓)
- [ ] **Roadmap:** Update konten kurikulum bulan 1-6
- [ ] **CTA:** Update testimoni alumni (nama, foto, quote nyata)
- [ ] **Footer:** Update email kontak, alamat lengkap

### 14. Mentor Section (Baru)
- [ ] Section baru antara Features dan Roadmap
- [ ] Hardcode data mentor (foto, nama, jabatan, bio singkat)

### 15. Showcase Alumni (Baru)
- [ ] Section baru di atas CTA
- [ ] Hardcode portofolio alumni + carousel/grid layout

---

## 🔵 PENYEMPURNAAN TEKNIS

### 16. Update `NEXT_PUBLIC_APP_URL` di Vercel
- [ ] Buka Vercel → Settings → Environment Variables
- [ ] Update `NEXT_PUBLIC_APP_URL` ke URL Vercel production
- [ ] Redeploy

### 17. Supabase Auth Settings
- [ ] Tambahkan URL Vercel production ke **Supabase Auth → URL Configuration → Site URL**
- [ ] Tambahkan ke **Redirect URLs**

### 18. Custom Domain (Opsional)
- [ ] Setup custom domain di Vercel
- [ ] Update semua URL terkait

---

## 📊 Ringkasan Status

| Item | Status |
|------|--------|
| Landing Page (Hero, Features, Roadmap, Pricing, CTA, Footer) | ✅ Done |
| Form Pendaftaran (dasar) | ✅ Done |
| Confirmation Page + WA redirect | ✅ Done |
| API: Students, Vouchers, Bootcamps | ✅ Done |
| Supabase DB + Migration | ✅ Done |
| Deploy Vercel | ✅ Done |
| **Form: Nama Sekolah (pelajar SMA/SMK)** | ❌ Belum |
| **Form: Nama Kampus (mahasiswa)** | ❌ Belum |
| Admin Login | ❌ Belum |
| Admin Dashboard (Overview + Students Table) | ❌ Belum |
| Student Detail & Edit | ❌ Belum |
| Bootcamp Management | ❌ Belum |
| Voucher Management | ❌ Belum |
| Logo asli + Favicon | ❌ Belum |
| Konten nyata (foto, mentor, alumni) | ❌ Belum |
| Custom Domain | ❌ Belum |

---

> **Rekomendasi eksekusi berikutnya:**  
> Mulai dari **Item 1-4** (perbaikan form) karena paling kritis — langsung terasa oleh calon pendaftar.  
> Setelah itu lanjut **Item 5-9** (admin dashboard) agar tim bisa mulai mengelola data masuk.
