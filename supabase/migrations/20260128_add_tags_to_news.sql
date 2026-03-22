-- Add tags column to news_posts table
ALTER TABLE news_posts
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Create index for tags if needed
CREATE INDEX IF NOT EXISTS idx_news_posts_tags ON news_posts USING GIN (tags);
