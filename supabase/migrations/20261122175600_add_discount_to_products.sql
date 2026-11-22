-- Add discount_percentage and discount_valid_until to products
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS discount_percentage NUMERIC(5,2) NOT NULL DEFAULT 0
    CHECK (discount_percentage >= 0 AND discount_percentage <= 100);

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS discount_valid_until TIMESTAMPTZ DEFAULT NULL;
