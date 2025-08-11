-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('car-images', 'car-images', true),
  ('oil-images', 'oil-images', true),
  ('blog-images', 'blog-images', true);

-- Create storage policies for car images
CREATE POLICY "Car images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'car-images');

CREATE POLICY "Admin can upload car images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update car images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete car images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'car-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for oil images
CREATE POLICY "Oil images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'oil-images');

CREATE POLICY "Admin can upload oil images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update oil images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete oil images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'oil-images' AND auth.uid() IS NOT NULL);

-- Create storage policies for blog images
CREATE POLICY "Blog images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Admin can upload blog images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update blog images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'blog-images' AND auth.uid() IS NOT NULL);

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