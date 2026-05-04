-- ============================================================
-- Migration 005: Additional RLS policies & helper functions
-- CreativeMU Academy
-- ============================================================

-- ── Helper: Get current admin ─────────────────────────────────
CREATE OR REPLACE FUNCTION get_current_admin()
RETURNS UUID AS $$
  SELECT id FROM admins
  WHERE user_id = auth.uid()
    AND is_active = true
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- ── Helper: Validate and apply voucher ────────────────────────
-- Used by API route (service_role) to atomically increment used_count
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
  -- Lock the row to prevent race conditions
  SELECT * INTO v_voucher
  FROM vouchers
  WHERE code = UPPER(TRIM(p_voucher_code))
  FOR UPDATE;

  -- Not found
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Kode voucher tidak ditemukan';
    RETURN;
  END IF;

  -- Not active
  IF NOT v_voucher.is_active THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher sudah tidak aktif';
    RETURN;
  END IF;

  -- Quota exhausted
  IF v_voucher.used_count >= v_voucher.max_uses THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Kuota voucher sudah habis';
    RETURN;
  END IF;

  -- Validity period
  IF v_voucher.valid_from IS NOT NULL AND now() < v_voucher.valid_from THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher belum berlaku';
    RETURN;
  END IF;

  IF v_voucher.valid_until IS NOT NULL AND now() > v_voucher.valid_until THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher sudah kadaluarsa';
    RETURN;
  END IF;

  -- Bootcamp restriction
  IF v_voucher.bootcamp_id IS NOT NULL AND p_bootcamp_id IS NOT NULL
     AND v_voucher.bootcamp_id != p_bootcamp_id THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::BIGINT, 'Voucher tidak berlaku untuk program ini';
    RETURN;
  END IF;

  -- All checks passed — increment used_count
  UPDATE vouchers
  SET used_count = used_count + 1
  WHERE id = v_voucher.id;

  RETURN QUERY SELECT
    true,
    v_voucher.id,
    v_voucher.discount_type::TEXT,
    v_voucher.discount_value,
    NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── View: Student with joins (for dashboard) ──────────────────
CREATE OR REPLACE VIEW students_with_details AS
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

-- ── View: Dashboard stats ─────────────────────────────────────
CREATE OR REPLACE VIEW student_stats AS
  SELECT
    b.id            AS bootcamp_id,
    b.name          AS bootcamp_name,
    b.batch_number,
    b.max_capacity,
    COUNT(s.id)                                                   AS total,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'pending')   AS pending,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'confirmed') AS confirmed,
    COUNT(s.id) FILTER (WHERE s.registration_status = 'rejected')  AS rejected,
    b.max_capacity - COUNT(s.id) FILTER (
      WHERE s.registration_status IN ('pending', 'confirmed')
    )                                                             AS remaining_capacity
  FROM bootcamps b
  LEFT JOIN students s ON s.bootcamp_id = b.id
  WHERE b.is_active = true
  GROUP BY b.id, b.name, b.batch_number, b.max_capacity;

-- RLS on view — inherits from base table policies
