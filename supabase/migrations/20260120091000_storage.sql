-- Enable Supabase Storage for image uploads

-- Create storage bucket for website images (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for the bucket
-- Public read access (so the website can display images)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'website-images public read'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "website-images public read"
      ON storage.objects
      FOR SELECT
      USING (bucket_id = 'website-images');
    $pol$;
  END IF;
END $$;

-- Allow service_role (used by server-side admin API) to write/delete
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'website-images service_role write'
  ) THEN
    EXECUTE $pol$
      CREATE POLICY "website-images service_role write"
      ON storage.objects
      FOR ALL
      USING (bucket_id = 'website-images' AND auth.role() = 'service_role')
      WITH CHECK (bucket_id = 'website-images' AND auth.role() = 'service_role');
    $pol$;
  END IF;
END $$;

