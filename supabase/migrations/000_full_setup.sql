-- ============================================================
-- CREATIVEMU ACADEMY — FULL DATABASE SETUP SCRIPT
-- Jalankan file ini di Supabase SQL Editor (satu kali)
-- Urutan: 001 → 002 → 003 → 004 → 005
-- ============================================================

-- ── STEP 1: Shared trigger function ──────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── STEP 2: Admins ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins_select_own" ON admins FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "admins_service_role_all" ON admins USING (auth.role() = 'service_role');

-- ── STEP 3: Bootcamps ─────────────────────────────────────────
CREATE TYPE program_type AS ENUM ('bootcamp', 'magang', 'sertifikasi');

CREATE TABLE IF NOT EXISTS bootcamps (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  program_type        program_type NOT NULL DEFAULT 'bootcamp',
  batch_number        INTEGER NOT NULL,
  description         TEXT,
  start_date          DATE,
  end_date            DATE,
  registration_open   DATE,
  registration_close  DATE,
  max_capacity        INTEGER NOT NULL DEFAULT 30,
  price_reguler       BIGINT NOT NULL DEFAULT 0,
  price_premium       BIGINT,
  price_intensif      BIGINT,
  location            TEXT DEFAULT 'Online & Hybrid',
  is_active           BOOLEAN NOT NULL DEFAULT true,
  is_open             BOOLEAN NOT NULL DEFAULT false,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT bootcamps_batch_unique UNIQUE (program_type, batch_number),
  CONSTRAINT bootcamps_capacity_positive CHECK (max_capacity > 0),
  CONSTRAINT bootcamps_price_positive CHECK (price_reguler >= 0)
);

CREATE INDEX idx_bootcamps_is_active ON bootcamps(is_active);
CREATE INDEX idx_bootcamps_is_open   ON bootcamps(is_open);
CREATE INDEX idx_bootcamps_program   ON bootcamps(program_type);

CREATE TRIGGER bootcamps_updated_at
  BEFORE UPDATE ON bootcamps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE bootcamps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "bootcamps_public_select" ON bootcamps FOR SELECT USING (is_active = true);
CREATE POLICY "bootcamps_admin_all" ON bootcamps
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid() AND admins.is_active = true));

-- ── STEP 4: Vouchers ──────────────────────────────────────────
CREATE TYPE discount_type AS ENUM ('fixed', 'percentage');

CREATE TABLE IF NOT EXISTS vouchers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT NOT NULL UNIQUE,
  bootcamp_id     UUID REFERENCES bootcamps(id) ON DELETE SET NULL,
  description     TEXT,
  discount_type   discount_type NOT NULL DEFAULT 'fixed',
  discount_value  BIGINT NOT NULL DEFAULT 0,
  max_uses        INTEGER NOT NULL DEFAULT 1,
  used_count      INTEGER NOT NULL DEFAULT 0,
  valid_from      TIMESTAMPTZ,
  valid_until     TIMESTAMPTZ,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_by      UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT vouchers_discount_positive CHECK (discount_value >= 0),
  CONSTRAINT vouchers_max_uses_positive CHECK (max_uses > 0),
  CONSTRAINT vouchers_used_count_valid  CHECK (used_count >= 0 AND used_count <= max_uses),
  CONSTRAINT vouchers_percentage_max    CHECK (
    discount_type = 'fixed' OR (discount_type = 'percentage' AND discount_value <= 100)
  ),
  CONSTRAINT vouchers_code_format CHECK (length(code) >= 3 AND length(code) <= 50)
);

CREATE INDEX idx_vouchers_code      ON vouchers(code);
CREATE INDEX idx_vouchers_is_active ON vouchers(is_active);
CREATE INDEX idx_vouchers_bootcamp  ON vouchers(bootcamp_id);

CREATE TRIGGER vouchers_updated_at
  BEFORE UPDATE ON vouchers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vouchers_admin_all" ON vouchers
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid() AND admins.is_active = true));

-- ── STEP 5: Students ──────────────────────────────────────────
CREATE TYPE gender_type AS ENUM ('laki-laki', 'perempuan');

CREATE TYPE student_status_type AS ENUM (
  'pelajar_sma_smk_1','pelajar_sma_smk_2','pelajar_sma_smk_3',
  'mahasiswa_1','mahasiswa_2','mahasiswa_3','mahasiswa_4','lainnya'
);

CREATE TYPE package_type AS ENUM ('reguler', 'premium', 'intensif');

CREATE TYPE registration_status_type AS ENUM ('pending', 'confirmed', 'rejected');

CREATE TABLE IF NOT EXISTS students (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Form wajib
  email                 TEXT NOT NULL,
  full_name             TEXT NOT NULL,
  birth_place           TEXT NOT NULL,
  birth_date            DATE NOT NULL,
  address               TEXT NOT NULL,
  phone_wa              TEXT NOT NULL,
  instagram_handle      TEXT NOT NULL,
  gender                gender_type NOT NULL,
  student_status        student_status_type NOT NULL,
  -- Tambahan
  major                 TEXT,
  -- Program
  bootcamp_id           UUID REFERENCES bootcamps(id) ON DELETE SET NULL,
  package_selected      package_type,
  voucher_id            UUID REFERENCES vouchers(id) ON DELETE SET NULL,
  voucher_code_used     TEXT,
  -- Status admin
  registration_status   registration_status_type NOT NULL DEFAULT 'pending',
  admin_notes           TEXT,
  confirmed_at          TIMESTAMPTZ,
  confirmed_by          UUID REFERENCES admins(id) ON DELETE SET NULL,
  -- Timestamps
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Constraints
  CONSTRAINT students_email_bootcamp_unique UNIQUE (email, bootcamp_id),
  CONSTRAINT students_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  CONSTRAINT students_birth_date_valid CHECK (birth_date < CURRENT_DATE),
  CONSTRAINT students_phone_format CHECK (phone_wa ~ '^(08|628|\+628)[0-9]{8,12}$'),
  CONSTRAINT students_full_name_length CHECK (length(full_name) >= 2 AND length(full_name) <= 100)
);

CREATE INDEX idx_students_email               ON students(email);
CREATE INDEX idx_students_bootcamp_id         ON students(bootcamp_id);
CREATE INDEX idx_students_registration_status ON students(registration_status);
CREATE INDEX idx_students_created_at          ON students(created_at DESC);
CREATE INDEX idx_students_voucher_id          ON students(voucher_id);

CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "students_public_insert" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "students_public_select_own" ON students FOR SELECT USING (true);
CREATE POLICY "students_admin_all" ON students
  USING (EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid() AND admins.is_active = true));

-- ── STEP 6: Functions ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION apply_voucher(
  p_voucher_code TEXT,
  p_bootcamp_id  UUID DEFAULT NULL
)
RETURNS TABLE (
  success        BOOLEAN,
  voucher_id     UUID,
  discount_type  TEXT,
  discount_value BIGINT,
  error_message  TEXT
) AS $$
DECLARE
  v_voucher vouchers%ROWTYPE;
BEGIN
  SELECT * INTO v_voucher FROM vouchers
  WHERE code = UPPER(TRIM(p_voucher_code)) FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Kode voucher tidak ditemukan';
    RETURN;
  END IF;
  IF NOT v_voucher.is_active THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher sudah tidak aktif';
    RETURN;
  END IF;
  IF v_voucher.used_count >= v_voucher.max_uses THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Kuota voucher sudah habis';
    RETURN;
  END IF;
  IF v_voucher.valid_from IS NOT NULL AND now() < v_voucher.valid_from THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher belum berlaku';
    RETURN;
  END IF;
  IF v_voucher.valid_until IS NOT NULL AND now() > v_voucher.valid_until THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher sudah kadaluarsa';
    RETURN;
  END IF;
  IF v_voucher.bootcamp_id IS NOT NULL AND p_bootcamp_id IS NOT NULL
     AND v_voucher.bootcamp_id != p_bootcamp_id THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher tidak berlaku untuk program ini';
    RETURN;
  END IF;

  UPDATE vouchers SET used_count = used_count + 1 WHERE id = v_voucher.id;

  RETURN QUERY SELECT true, v_voucher.id, v_voucher.discount_type::TEXT,
    v_voucher.discount_value, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── STEP 7: Views ─────────────────────────────────────────────
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

CREATE OR REPLACE VIEW student_stats AS
  SELECT b.id AS bootcamp_id, b.name AS bootcamp_name,
    b.batch_number, b.max_capacity,
    COUNT(s.id) AS total,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'pending')   AS pending,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'confirmed') AS confirmed,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'rejected')  AS rejected,
    b.max_capacity - COUNT(s.id) FILTER (
      WHERE s.registration_status IN ('pending', 'confirmed')
    ) AS remaining_capacity
  FROM bootcamps b
  LEFT JOIN students s ON s.bootcamp_id = b.id
  WHERE b.is_active = true
  GROUP BY b.id, b.name, b.batch_number, b.max_capacity;

-- ── STEP 8: Seed Data ─────────────────────────────────────────
INSERT INTO bootcamps (
  name, program_type, batch_number, description,
  start_date, end_date, registration_open, registration_close,
  max_capacity, price_reguler, price_premium, price_intensif,
  location, is_active, is_open
) VALUES (
  'Bootcamp Digital Marketing Batch 12', 'bootcamp', 12,
  'Bootcamp intensif Digital Marketing bersertifikasi BNSP. Belajar dari mentor praktisi industri, kerjakan proyek nyata, dan siap berkarir dalam 6 bulan.',
  '2026-08-15', '2027-02-15', '2026-06-01', '2026-08-01',
  30, 3500000, 5800000, 12500000, 'Online & Hybrid', true, true
) ON CONFLICT DO NOTHING;

INSERT INTO vouchers (code, description, discount_type, discount_value, max_uses, valid_from, valid_until, is_active)
VALUES
  ('CM2026', 'Early Bird Batch 12 - Diskon Rp 500.000', 'fixed', 500000, 50, '2026-06-01 00:00:00+07', '2026-08-01 23:59:59+07', true),
  ('BNSP20', 'Diskon 20% untuk paket Premium BNSP', 'percentage', 20, 20, '2026-06-01 00:00:00+07', '2026-07-15 23:59:59+07', true)
ON CONFLICT DO NOTHING;

-- ── DONE ──────────────────────────────────────────────────────
DO $$
BEGIN
  RAISE NOTICE '✅ CreativeMU Academy database setup complete!';
  RAISE NOTICE '👉 Next step: Create admin user via Supabase Auth, then insert into admins table.';
END $$;
