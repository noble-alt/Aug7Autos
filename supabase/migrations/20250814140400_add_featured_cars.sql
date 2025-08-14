-- Add the is_featured column to the cars table
ALTER TABLE public.cars ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Set the two oldest cars as featured to start
WITH oldest_cars AS (
  SELECT id FROM public.cars
  ORDER BY created_at
  LIMIT 2
)
UPDATE public.cars
SET is_featured = true
WHERE id IN (SELECT id FROM oldest_cars);
