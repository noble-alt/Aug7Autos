-- Insert admin user with specified credentials
-- Using crypt() function to hash the password
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES (
  'Aug7-autos@gmail.com',
  crypt('Aug7autos', gen_salt('bf')),
  'Aug7Autos Admin'
)
ON CONFLICT (email) DO NOTHING;