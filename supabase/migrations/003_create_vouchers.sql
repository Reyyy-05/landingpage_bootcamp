-- ============================================================
-- Migration 003: Create vouchers table
-- CreativeMU Academy
-- ============================================================

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

  CONSTRAINT vouchers_discount_positive   CHECK (discount_value >= 0),
  CONSTRAINT vouchers_max_uses_positive   CHECK (max_uses > 0),
  CONSTRAINT vouchers_used_count_valid    CHECK (used_count >= 0 AND used_count <= max_uses),
  CONSTRAINT vouchers_percentage_max      CHECK (
    discount_type = 'fixed' OR (discount_type = 'percentage' AND discount_value <= 100)
  ),
  CONSTRAINT vouchers_code_format         CHECK (length(code) >= 3 AND length(code) <= 50)
);

CREATE INDEX idx_vouchers_code      ON vouchers(code);
CREATE INDEX idx_vouchers_is_active ON vouchers(is_active);
CREATE INDEX idx_vouchers_bootcamp  ON vouchers(bootcamp_id);

CREATE TRIGGER vouchers_updated_at
  BEFORE UPDATE ON vouchers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;

-- Public: can only validate (SELECT with conditions — done via API route using service_role)
-- No direct public SELECT to prevent code harvesting
-- Admins: full access
CREATE POLICY "vouchers_admin_all" ON vouchers
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.user_id = auth.uid()
        AND admins.is_active = true
    )
  );

-- ── Seed: Sample vouchers ─────────────────────────────────────
INSERT INTO vouchers (
  code, description, discount_type, discount_value,
  max_uses, valid_from, valid_until, is_active
) VALUES
  (
    'CM2026',
    'Voucher Early Bird Batch 12 - Diskon Rp 500.000',
    'fixed',
    500000,
    50,
    '2026-06-01 00:00:00+07',
    '2026-08-01 23:59:59+07',
    true
  ),
  (
    'BNSP20',
    'Diskon 20% untuk paket Premium BNSP',
    'percentage',
    20,
    20,
    '2026-06-01 00:00:00+07',
    '2026-07-15 23:59:59+07',
    true
  ),
  (
    'GRATIS100',
    'Demo voucher - diskon Rp 100.000',
    'fixed',
    100000,
    5,
    NULL,
    NULL,
    false
  );
