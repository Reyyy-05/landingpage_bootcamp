-- ============================================================
-- Migration 008: Update Bootcamp and add Voucher
-- CreativeMU Academy
-- ============================================================

-- ── 1. Nonaktifkan semua bootcamp yang ada ────────────────────
UPDATE bootcamps
SET is_active = false, is_open = false;

-- ── 2. Buat/Update Bootcamp Laravel Full Online ───────────────
-- Kita insert baru saja agar lebih aman dan menjadi bootcamp aktif satu-satunya
INSERT INTO bootcamps (
    name, 
    program_type, 
    batch_number, 
    description, 
    start_date, 
    end_date, 
    registration_open, 
    registration_close, 
    max_capacity, 
    price_reguler, 
    location, 
    is_active, 
    is_open
) VALUES (
    'Bootcamp Laravel Full Online (Juni-Oktober)',
    'bootcamp',
    13, -- Asumsi batch selanjutnya
    'Bootcamp intensif framework Laravel secara full online. Tersedia satu paket lengkap untuk semua.',
    '2026-05-08',
    '2026-10-31',
    '2026-05-01',
    '2026-05-07',
    50,
    3500000,
    'Full Online',
    true,
    true
);

-- ── 3. Tambah Voucher LVBOOT ──────────────────────────────────
INSERT INTO vouchers (
    code,
    description,
    discount_type,
    discount_value,
    max_uses,
    is_active
) VALUES (
    'LVBOOT',
    'Voucher Spesial Bootcamp Laravel',
    'fixed',
    250000,
    1000,
    true
)
ON CONFLICT (code) DO UPDATE 
SET 
    discount_value = 250000, 
    discount_type = 'fixed', 
    is_active = true;
