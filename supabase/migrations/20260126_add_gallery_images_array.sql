-- Add images JSON array column to gallery_items table
-- This allows storing multiple images for a single gallery item

-- Add the images column if it doesn't exist
ALTER TABLE gallery_items
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Migrate existing image_url to images array
UPDATE gallery_items
SET images = CASE
  WHEN image_url IS NOT NULL AND image_url != '' THEN jsonb_build_array(image_url)
  ELSE '[]'::jsonb
END
WHERE (images IS NULL OR images = '[]'::jsonb) AND image_url IS NOT NULL;

-- Create index on images column for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_items_images 
ON gallery_items USING GIN (images);

-- Success message
SELECT 'Migration completed: Added images JSONB array column to gallery_items';
