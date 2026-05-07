-- ============================================================
-- Migration 007: Add workplace & job_title columns
-- CreativeMU Academy
-- Tambah field Tempat Kerja dan Posisi untuk pendaftar "Lainnya"
-- ============================================================

-- ── Tambah kolom baru ─────────────────────────────────────────
ALTER TABLE students ADD COLUMN IF NOT EXISTS workplace TEXT;
ALTER TABLE students ADD COLUMN IF NOT EXISTS job_title TEXT;

-- ── Recreate view agar include kolom baru ─────────────────────
DROP VIEW IF EXISTS students_with_details;
CREATE VIEW students_with_details AS
  SELECT
    s.*,
    b.name           AS bootcamp_name,
    b.batch_number   AS bootcamp_batch,
    b.program_type   AS bootcamp_program_type,
    v.code           AS voucher_code,
    v.discount_type  AS voucher_discount_type,
    v.discount_value AS voucher_discount_value,
    a.full_name      AS confirmed_by_name
  FROM students s
  LEFT JOIN bootcamps b ON s.bootcamp_id = b.id
  LEFT JOIN vouchers  v ON s.voucher_id  = v.id
  LEFT JOIN admins    a ON s.confirmed_by = a.id;
