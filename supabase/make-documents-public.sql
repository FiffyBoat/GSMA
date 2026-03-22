-- Make documents bucket public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'documents';

-- Verify the change
SELECT id, name, public FROM storage.buckets WHERE id = 'documents';
