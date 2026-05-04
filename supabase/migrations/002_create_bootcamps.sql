-- ============================================================
-- Migration 002: Create bootcamps table
-- CreativeMU Academy
-- ============================================================

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

-- RLS
ALTER TABLE bootcamps ENABLE ROW LEVEL SECURITY;

-- Public can read active bootcamps
CREATE POLICY "bootcamps_public_select" ON bootcamps
  FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "bootcamps_admin_all" ON bootcamps
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
        AND admins.is_active = true
    )
  );

-- ── Seed: Initial bootcamp data ──────────────────────────────
INSERT INTO bootcamps (
  name, program_type, batch_number, description,
  start_date, end_date, registration_open, registration_close,
  max_capacity, price_reguler, price_premium, price_intensif,
  location, is_active, is_open
) VALUES (
  'Bootcamp Digital Marketing Batch 12',
  'bootcamp',
  12,
  'Bootcamp intensif Digital Marketing bersertifikasi BNSP. Belajar dari mentor praktisi industri, kerjakan proyek nyata, dan siap berkarir dalam 6 bulan.',
  '2026-08-15',
  '2027-02-15',
  '2026-06-01',
  '2026-08-01',
  30,
  3500000,
  5800000,
  12500000,
  'Online & Hybrid',
  true,
  true
);
