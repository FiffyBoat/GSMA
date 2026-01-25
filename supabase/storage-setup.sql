-- Storage bucket setup for Supabase
-- Run this in Supabase SQL Editor after creating the storage bucket

-- Create storage bucket for website images
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-images');

-- Allow authenticated users (admins) to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'website-images' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users (admins) to update their own uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'website-images' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users (admins) to delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'website-images' AND
  auth.role() = 'authenticated'
);
