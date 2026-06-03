-- =============================================
-- TOMOBILT.COM — Supabase Schema
-- =============================================

-- Cars table
CREATE TABLE cars (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  seats INT NOT NULL DEFAULT 5,
  doors INT NOT NULL DEFAULT 4,
  transmission TEXT NOT NULL DEFAULT 'Manuelle',
  fuel TEXT NOT NULL DEFAULT 'Essence',
  consumption TEXT,
  price_per_day INT NOT NULL,
  price_per_week INT,
  deposit INT NOT NULL DEFAULT 3000,
  km_included INT NOT NULL DEFAULT 200,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Car colors
CREATE TABLE car_colors (
  id TEXT PRIMARY KEY,
  car_id TEXT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  hex TEXT NOT NULL
);

-- Car images
CREATE TABLE car_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id TEXT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  color_id TEXT REFERENCES car_colors(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);

-- Reservations
CREATE TABLE reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  car_id TEXT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles (linked to auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Set the first user as admin manually after creating your account:
-- UPDATE profiles SET role = 'admin' WHERE email = 'ton-email@gmail.com';

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for cars
CREATE POLICY "Public read cars" ON cars FOR SELECT USING (true);
CREATE POLICY "Public read colors" ON car_colors FOR SELECT USING (true);
CREATE POLICY "Public read images" ON car_images FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "Admin all cars" ON cars FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all colors" ON car_colors FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all images" ON car_images FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all reservations" ON reservations FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Users can read their own reservations
CREATE POLICY "Users own reservations" ON reservations FOR SELECT USING (
  auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Seed data: Dacia Logan
INSERT INTO cars (id, name, brand, seats, doors, transmission, fuel, consumption, price_per_day, price_per_week, deposit, km_included, features)
VALUES ('dacia-logan', 'Dacia Logan', 'Dacia', 5, 4, 'Manuelle', 'Essence', '5.2L/100km', 250, 1400, 3000, 200, ARRAY['Climatisation', 'Bluetooth', 'GPS', 'Caméra de recul'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_colors (id, car_id, name, hex) VALUES
('dacia-noir', 'dacia-logan', 'Noir', '#1a1a1a'),
('dacia-blanc', 'dacia-logan', 'Blanc', '#f0f0f0')
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_images (car_id, color_id, url) VALUES
('dacia-logan', 'dacia-noir', '/images/dacia_logan_noir.png'),
('dacia-logan', 'dacia-blanc', '/images/dacia_logan_blanc.png');

-- Seed data: Peugeot 208
INSERT INTO cars (id, name, brand, seats, doors, transmission, fuel, consumption, price_per_day, price_per_week, deposit, km_included, features)
VALUES ('peugeot-208', 'Peugeot 208', 'Peugeot', 5, 4, 'Manuelle', 'Essence', '4.8L/100km', 350, 2100, 4000, 200, ARRAY['Climatisation', 'Bluetooth', 'GPS', 'Caméra de recul', 'Toit ouvrant'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_colors (id, car_id, name, hex) VALUES
('peugeot-noir', 'peugeot-208', 'Noir', '#1a1a1a'),
('peugeot-blanc', 'peugeot-208', 'Blanc', '#f0f0f0'),
('peugeot-vert', 'peugeot-208', 'Vert', '#a8c97f')
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_images (car_id, color_id, url) VALUES
('peugeot-208', 'peugeot-noir', '/images/peugeot_208_noir.png'),
('peugeot-208', 'peugeot-blanc', '/images/peugeot_208_blanc.png'),
('peugeot-208', 'peugeot-vert', '/images/peugeot_208_vert.png');

-- Seed data: Opel Corsa
INSERT INTO cars (id, name, brand, seats, doors, transmission, fuel, consumption, price_per_day, price_per_week, deposit, km_included, features)
VALUES ('opel-corsa', 'Opel Corsa', 'Opel', 5, 4, 'Manuelle', 'Diesel', '3.9L/100km', 300, 1800, 3500, 200, ARRAY['Climatisation', 'Bluetooth', 'GPS', 'Caméra de recul', 'Régulateur'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_colors (id, car_id, name, hex) VALUES
('opel-noir', 'opel-corsa', 'Noir', '#1a1a1a'),
('opel-blanc', 'opel-corsa', 'Blanc', '#f0f0f0'),
('opel-rouge', 'opel-corsa', 'Rouge', '#dc2626')
ON CONFLICT (id) DO NOTHING;

INSERT INTO car_images (car_id, color_id, url) VALUES
('opel-corsa', 'opel-noir', '/images/opel_corsa_noir.png'),
('opel-corsa', 'opel-blanc', '/images/opel_corsa_blanc.png'),
('opel-corsa', 'opel-rouge', '/images/opel_corsa_rouge.jpg');
