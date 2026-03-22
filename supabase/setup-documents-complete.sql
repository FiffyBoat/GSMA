-- Comprehensive Documents Bucket Setup
-- Run this in Supabase SQL Editor to properly configure documents storage

-- 1. Ensure bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop existing policies to recreate them cleanly
DROP POLICY IF EXISTS "Public can read documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete documents" ON storage.objects;

-- 3. Create policies for documents bucket

-- Allow anyone to READ/SELECT documents
CREATE POLICY "Public can read documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Allow authenticated users to INSERT documents
CREATE POLICY "Admin can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to UPDATE documents
CREATE POLICY "Admin can update documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Allow authenticated users to DELETE documents
CREATE POLICY "Admin can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- 4. Verify the configuration
SELECT 
  'Bucket Configuration' as check_name,
  id,
  name,
  public
FROM storage.buckets 
WHERE id = 'documents';
