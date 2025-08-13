-- Drop the old, incorrectly named constraint if it exists
ALTER TABLE public.cars DROP CONSTRAINT IF EXISTS cars_status_check;

-- Drop the other constraint name if it exists, just in case
ALTER TABLE public.cars DROP CONSTRAINT IF EXISTS valid_status;

-- Add the correct constraint with the correct name and values
ALTER TABLE public.cars ADD CONSTRAINT cars_status_check CHECK (status IN ('available', 'sold', 'for hire', 'new', 'fairly used'));
