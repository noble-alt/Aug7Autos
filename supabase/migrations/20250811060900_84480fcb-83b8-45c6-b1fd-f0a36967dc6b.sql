
-- Add category column to mobil_oils table
ALTER TABLE public.mobil_oils 
ADD COLUMN category text NOT NULL DEFAULT 'engine oil';

-- Add check constraint to ensure valid categories
ALTER TABLE public.mobil_oils 
ADD CONSTRAINT valid_category 
CHECK (category IN ('engine oil', 'brake oil', 'coolant'));
