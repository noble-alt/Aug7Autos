-- Drop the existing check constraint on the cars.status column
ALTER TABLE public.cars DROP CONSTRAINT IF EXISTS cars_status_check;

-- Update existing data to conform to the new categories
UPDATE public.cars SET status = 'Brand new cars' WHERE status = 'new';
UPDATE public.cars SET status = 'Foreign used cars' WHERE status = 'fairly used';
UPDATE public.cars SET status = 'Rent/Hire a car' WHERE status = 'for hire';

-- Handle any other old statuses (like 'available' or 'sold') by setting them to a default.
-- This is a safe fallback for any statuses not explicitly mapped.
UPDATE public.cars
SET status = 'Foreign used cars'
WHERE status NOT IN ('Rent/Hire a car', 'Foreign used cars', 'Brand new cars');

-- Add a new check constraint with the updated categories
ALTER TABLE public.cars ADD CONSTRAINT cars_status_check CHECK (status IN ('Rent/Hire a car', 'Foreign used cars', 'Brand new cars'));
