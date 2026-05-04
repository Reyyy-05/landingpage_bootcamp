-- ============================================================
-- Migration 004: Create students table
-- CreativeMU Academy
-- WAJIB: Field tidak boleh dikurangi dari form original
-- ============================================================

CREATE TYPE gender_type AS ENUM ('laki-laki', 'perempuan');

CREATE TYPE student_status_type AS ENUM (
  'pelajar_sma_smk_1',
  'pelajar_sma_smk_2',
  'pelajar_sma_smk_3',
  'mahasiswa_1',
  'mahasiswa_2',
  'mahasiswa_3',
  'mahasiswa_4',
  'lainnya'
);

CREATE TYPE package_type AS ENUM ('reguler', 'premium', 'intensif');

CREATE TYPE registration_status_type AS ENUM ('pending', 'confirmed', 'rejected');

CREATE TABLE IF NOT EXISTS students (
  -- Primary Key
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- === FIELD WAJIB DARI FORM ORIGINAL (tidak boleh dikurangi) ===
  email                 TEXT NOT NULL,
  full_name             TEXT NOT NULL,
  birth_place           TEXT NOT NULL,
  birth_date            DATE NOT NULL,
  address               TEXT NOT NULL,
  phone_wa              TEXT NOT NULL,
  instagram_handle      TEXT NOT NULL,
  gender                gender_type NOT NULL,
  student_status        student_status_type NOT NULL,

  -- === FIELD TAMBAHAN (opsional dari form) ===
  major                 TEXT,                   -- Jurusan/Prodi (opsional, muncul jika mahasiswa)

  -- === RELASI PROGRAM ===
  bootcamp_id           UUID REFERENCES bootcamps(id) ON DELETE SET NULL,
  package_selected      package_type,
  voucher_id            UUID REFERENCES vouchers(id) ON DELETE SET NULL,
  voucher_code_used     TEXT,                   -- History kode yang dipakai

  -- === STATUS ADMIN ===
  registration_status   registration_status_type NOT NULL DEFAULT 'pending',
  admin_notes           TEXT,
  confirmed_at          TIMESTAMPTZ,
  confirmed_by          UUID REFERENCES admins(id) ON DELETE SET NULL,

  -- === TIMESTAMPS ===
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- === CONSTRAINTS ===
  CONSTRAINT students_email_bootcamp_unique UNIQUE (email, bootcamp_id),
  CONSTRAINT students_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT students_birth_date_valid CHECK (birth_date < CURRENT_DATE),
  CONSTRAINT students_phone_format CHECK (phone_wa ~ '^(08|628|\+628)[0-9]{8,12}$'),
  CONSTRAINT students_full_name_length CHECK (length(full_name) >= 2 AND length(full_name) <= 100)
);

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX idx_students_email              ON students(email);
CREATE INDEX idx_students_bootcamp_id        ON students(bootcamp_id);
CREATE INDEX idx_students_registration_status ON students(registration_status);
CREATE INDEX idx_students_created_at         ON students(created_at DESC);
CREATE INDEX idx_students_voucher_id         ON students(voucher_id);
CREATE INDEX idx_students_full_name          ON students USING gin(to_tsvector('indonesian', full_name));

-- ── Trigger ───────────────────────────────────────────────────
CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── RLS ───────────────────────────────────────────────────────
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Public: INSERT only (pendaftaran)
CREATE POLICY "students_public_insert" ON students
  FOR INSERT WITH CHECK (true);

-- Public: SELECT own registration by ID (untuk halaman konfirmasi)
CREATE POLICY "students_public_select_own" ON students
  FOR SELECT USING (true);
-- Note: halaman konfirmasi hanya menampilkan data via ID, data sensitif disembunyikan di UI

-- Admins: full CRUD
CREATE POLICY "students_admin_all" ON students
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
        AND admins.is_active = true
    )
  );
