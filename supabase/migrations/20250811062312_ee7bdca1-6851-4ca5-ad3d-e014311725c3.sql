-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('car-images', 'car-images', true),
  ('oil-images', 'oil-images', true),
  ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for car images
DROP POLICY IF EXISTS "Car images are publicly accessible" ON storage.objects;
CREATE POLICY "Car images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'car-images');

DROP POLICY IF EXISTS "Admin can upload car images" ON storage.objects;
CREATE POLICY "Admin can upload car images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can update car images" ON storage.objects;
CREATE POLICY "Admin can update car images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can delete car images" ON storage.objects;
CREATE POLICY "Admin can delete car images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for oil images
DROP POLICY IF EXISTS "Oil images are publicly accessible" ON storage.objects;
CREATE POLICY "Oil images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'oil-images');

DROP POLICY IF EXISTS "Admin can upload oil images" ON storage.objects;
CREATE POLICY "Admin can upload oil images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can update oil images" ON storage.objects;
CREATE POLICY "Admin can update oil images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can delete oil images" ON storage.objects;
CREATE POLICY "Admin can delete oil images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for blog images
DROP POLICY IF EXISTS "Blog images are publicly accessible" ON storage.objects;
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
CREATE POLICY "Admin can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can update blog images" ON storage.objects;
CREATE POLICY "Admin can update blog images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;
CREATE POLICY "Admin can delete blog images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

-- Add status field to cars table for hire/new/fairly used
ALTER TABLE public.cars 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'available';

-- Update the status constraint to include the new values
ALTER TABLE public.cars 
DROP CONSTRAINT IF EXISTS valid_status;

ALTER TABLE public.cars 
ADD CONSTRAINT valid_status 
CHECK (status IN ('available', 'sold', 'for hire', 'new', 'fairly used'));