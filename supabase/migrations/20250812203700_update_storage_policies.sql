-- Drop existing restrictive policies for car images
DROP POLICY "Admin can upload car images" ON storage.objects;
DROP POLICY "Admin can update car images" ON storage.objects;
DROP POLICY "Admin can delete car images" ON storage.objects;

-- Create new permissive policies for car images
CREATE POLICY "Allow public uploads for car images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'car-images');
CREATE POLICY "Allow public updates for car images" ON storage.objects FOR UPDATE USING (bucket_id = 'car-images');
CREATE POLICY "Allow public deletes for car images" ON storage.objects FOR DELETE USING (bucket_id = 'car-images');

-- Drop existing restrictive policies for oil images
DROP POLICY "Admin can upload oil images" ON storage.objects;
DROP POLICY "Admin can update oil images" ON storage.objects;
DROP POLICY "Admin can delete oil images" ON storage.objects;

-- Create new permissive policies for oil images
CREATE POLICY "Allow public uploads for oil images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'oil-images');
CREATE POLICY "Allow public updates for oil images" ON storage.objects FOR UPDATE USING (bucket_id = 'oil-images');
CREATE POLICY "Allow public deletes for oil images" ON storage.objects FOR DELETE USING (bucket_id = 'oil-images');

-- Drop existing restrictive policies for blog images
DROP POLICY "Admin can upload blog images" ON storage.objects;
DROP POLICY "Admin can update blog images" ON storage.objects;
DROP POLICY "Admin can delete blog images" ON storage.objects;

-- Create new permissive policies for blog images
CREATE POLICY "Allow public uploads for blog images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Allow public updates for blog images" ON storage.objects FOR UPDATE USING (bucket_id = 'blog-images');
CREATE POLICY "Allow public deletes for blog images" ON storage.objects FOR DELETE USING (bucket_id = 'blog-images');
