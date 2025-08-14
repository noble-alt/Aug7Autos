-- Drop the existing check constraint on the cars.status column
ALTER TABLE public.cars DROP CONSTRAINT IF EXISTS cars_status_check;

-- Add a new check constraint with the updated categories
ALTER TABLE public.cars ADD CONSTRAINT cars_status_check CHECK (status IN ('Rent/Hire a car', 'Foreign used cars', 'Brand new cars'));
