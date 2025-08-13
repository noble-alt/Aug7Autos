-- Relax RLS policies on the 'cars' table
DROP POLICY IF EXISTS "Admin users can manage cars" ON public.cars;
CREATE POLICY "Allow public access to manage cars" ON public.cars FOR ALL USING (true);

-- Relax RLS policies on the 'mobil_oils' table
DROP POLICY IF EXISTS "Admin users can manage mobil oils" ON public.mobil_oils;
CREATE POLICY "Allow public access to manage mobil oils" ON public.mobil_oils FOR ALL USING (true);

-- Relax RLS policies on the 'blogs' table
DROP POLICY IF EXISTS "Admin users can manage blogs" ON public.blogs;
CREATE POLICY "Allow public access to manage blogs" ON public.blogs FOR ALL USING (true);
