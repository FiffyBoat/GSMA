-- Row Level Security (RLS) Policies for Admin Tables
-- This file sets up RLS policies to ensure only authenticated admins can modify content
-- Run this in Supabase SQL Editor after database setup

-- Enable RLS on admin tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Admin Users - Only admins can view their own record
CREATE POLICY "Admin users can view own record"
ON admin_users FOR SELECT
USING (auth.uid()::text = id::text OR auth.role() = 'service_role');

CREATE POLICY "Only service_role can insert admin users"
ON admin_users FOR INSERT
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service_role can update admin users"
ON admin_users FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service_role can delete admin users"
ON admin_users FOR DELETE
USING (auth.role() = 'service_role');

-- Hero Slides - Public read, admin write
CREATE POLICY "Anyone can view hero slides"
ON hero_slides FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert hero slides"
ON hero_slides FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update hero slides"
ON hero_slides FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete hero slides"
ON hero_slides FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- News Posts - Public read, admin write
CREATE POLICY "Anyone can view news posts"
ON news_posts FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert news posts"
ON news_posts FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update news posts"
ON news_posts FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete news posts"
ON news_posts FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Leadership - Public read, admin write
CREATE POLICY "Anyone can view leadership"
ON leadership FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert leadership"
ON leadership FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update leadership"
ON leadership FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete leadership"
ON leadership FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Projects - Public read, admin write
CREATE POLICY "Anyone can view projects"
ON projects FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update projects"
ON projects FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete projects"
ON projects FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Events - Public read, admin write
CREATE POLICY "Anyone can view events"
ON events FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert events"
ON events FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update events"
ON events FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete events"
ON events FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Gallery Items - Public read, admin write
CREATE POLICY "Anyone can view gallery items"
ON gallery_items FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert gallery items"
ON gallery_items FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update gallery items"
ON gallery_items FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete gallery items"
ON gallery_items FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Site Settings - Public read, admin write
CREATE POLICY "Anyone can view site settings"
ON site_settings FOR SELECT
USING (true);

CREATE POLICY "Only authenticated users can insert site settings"
ON site_settings FOR INSERT
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can update site settings"
ON site_settings FOR UPDATE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Only authenticated users can delete site settings"
ON site_settings FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
