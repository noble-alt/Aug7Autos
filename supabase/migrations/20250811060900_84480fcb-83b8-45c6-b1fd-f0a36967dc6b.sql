
-- Add category column to mobil_oils table
ALTER TABLE public.mobil_oils 
ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'engine oil';

-- Add check constraint to ensure valid categories
ALTER TABLE public.mobil_oils DROP CONSTRAINT IF EXISTS valid_category;
ALTER TABLE public.mobil_oils 
ADD CONSTRAINT valid_category 
CHECK (category IN ('engine oil', 'brake fluid', 'coolant'));
