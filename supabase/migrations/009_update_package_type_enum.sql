-- ============================================================
-- Migration 009: Update package_type enum
-- CreativeMU Academy
-- ============================================================

-- Tambahkan value 'laravel_full_online' ke dalam enum package_type
ALTER TYPE package_type ADD VALUE IF NOT EXISTS 'laravel_full_online';
