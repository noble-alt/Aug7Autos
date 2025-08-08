-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  specifications JSONB,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mobil oils table
CREATE TABLE public.mobil_oils (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  viscosity TEXT NOT NULL,
  volume TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  benefits TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mobil_oils ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Cars are publicly readable" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Mobil oils are publicly readable" ON public.mobil_oils FOR SELECT USING (true);
CREATE POLICY "Published blogs are publicly readable" ON public.blogs FOR SELECT USING (published = true);

-- Admin policies - only authenticated admin users can modify
CREATE POLICY "Admin users can view all admin users" ON public.admin_users FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin users can manage cars" ON public.cars FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin users can manage mobil oils" ON public.mobil_oils FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admin users can manage blogs" ON public.blogs FOR ALL USING (auth.uid() IS NOT NULL);

-- Create update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_mobil_oils_updated_at BEFORE UPDATE ON public.mobil_oils FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.cars (name, brand, model, year, price, image_url, description, specifications) VALUES
('BMW 3 Series', 'BMW', '3 Series', 2022, 45000.00, '/placeholder.svg', 'Luxury sedan with premium features', '{"engine": "2.0L Turbo", "transmission": "Automatic", "fuel": "Petrol"}'),
('Mercedes C-Class', 'Mercedes', 'C-Class', 2023, 52000.00, '/placeholder.svg', 'Executive luxury sedan', '{"engine": "2.0L Turbo", "transmission": "9G-Tronic", "fuel": "Petrol"}'),
('Audi A4', 'Audi', 'A4', 2022, 48000.00, '/placeholder.svg', 'Premium compact executive car', '{"engine": "2.0L TFSI", "transmission": "S-Tronic", "fuel": "Petrol"}');

INSERT INTO public.mobil_oils (name, type, viscosity, volume, price, image_url, description, benefits) VALUES
('Mobil 1 Advanced Full Synthetic', 'Full Synthetic', '5W-30', '5L', 89.99, '/placeholder.svg', 'Premium full synthetic motor oil', ARRAY['Superior engine protection', 'Extended drain intervals', 'Enhanced fuel economy']),
('Mobil Super 3000', 'Synthetic Blend', '5W-40', '4L', 65.99, '/placeholder.svg', 'High-performance synthetic blend', ARRAY['Excellent wear protection', 'Thermal stability', 'Cold-weather performance']),
('Mobil 1 ESP Formula', 'Full Synthetic', '5W-30', '5L', 94.99, '/placeholder.svg', 'Advanced fuel economy formula', ARRAY['Emission system protection', 'Outstanding fuel economy', 'Extended engine life']);

INSERT INTO public.blogs (title, slug, content, excerpt, author, published, tags) VALUES
('The Ultimate Guide to Car Maintenance', 'ultimate-guide-car-maintenance', 'Regular car maintenance is essential for keeping your vehicle running smoothly...', 'Learn the essential tips for maintaining your vehicle', 'Aug7Autos Team', true, ARRAY['maintenance', 'tips', 'automotive']),
('Why Choose Mobil 1 for Your Engine', 'why-choose-mobil-1', 'Mobil 1 has been the industry leader in synthetic motor oils...', 'Discover the benefits of premium synthetic motor oils', 'Aug7Autos Team', true, ARRAY['oil', 'mobil1', 'engine-care']),
('2024 Car Buying Guide', '2024-car-buying-guide', 'Buying a car in 2024 requires careful consideration of many factors...', 'Everything you need to know about buying a car in 2024', 'Aug7Autos Team', false, ARRAY['buying-guide', '2024', 'cars']);