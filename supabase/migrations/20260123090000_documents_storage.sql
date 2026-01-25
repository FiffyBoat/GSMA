-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public can read published documents
CREATE POLICY "Public can read documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Policy: Authenticated users (admin) can upload documents
CREATE POLICY "Admin can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Authenticated users (admin) can update documents
CREATE POLICY "Admin can update documents"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Authenticated users (admin) can delete documents
CREATE POLICY "Admin can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);
