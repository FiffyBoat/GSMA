-- Create documents storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('documents', 'documents', false, 52428800) -- 50MB limit
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow authenticated users (admin) to upload documents
CREATE POLICY "Allow authenticated users to upload documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to update their uploaded documents
CREATE POLICY "Allow authenticated users to update documents"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to delete documents
CREATE POLICY "Allow authenticated users to delete documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Allow public to read documents (for downloading)
CREATE POLICY "Allow public to read published documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'documents');
