-- ============================================================
-- Seeder: Pelatihan Laravel & Voucher GOCREATIVE
-- ============================================================

-- 1. Buat Bootcamp Pelatihan Laravel
WITH new_bootcamp AS (
  INSERT INTO bootcamps (
    name, 
    description, 
    batch_number, 
    start_date, 
    end_date, 
    price_reguler, 
    price_premium, 
    price_intensif, 
    max_capacity, 
    is_open
  )
  VALUES (
    'Bootcamp Full-Stack Web Development dengan Laravel',
    'Pelatihan intensif membangun aplikasi web skala industri menggunakan Laravel dan framework frontend modern. Dibimbing langsung oleh praktisi.',
    1,
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '45 days',
    499000, -- Harga Reguler
    899000, -- Harga Premium (dengan BNSP/Sertifikat)
    1499000, -- Harga Intensif (dengan 1on1 mentoring)
    50, -- Kuota maksimal
    true
  )
  RETURNING id
)

-- 2. Buat Voucher GOCREATIVE
INSERT INTO vouchers (
  code,
  discount_type,
  discount_value,
  max_uses,
  valid_until,
  is_active
  -- Catatan: karena tidak spesifik bootcamp_id, voucher ini bisa dipakai untuk semua bootcamp aktif
)
VALUES (
  'GOCREATIVE',
  'percentage', -- Tipe diskon: percentage atau fixed
  15, -- Diskon 15%
  100, -- Kuota voucher 100 orang
  CURRENT_DATE + INTERVAL '30 days',
  true
);

-- Cek hasilnya:
-- SELECT * FROM bootcamps;
-- SELECT * FROM vouchers;
