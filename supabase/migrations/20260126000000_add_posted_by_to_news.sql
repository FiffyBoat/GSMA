-- Add posted_by column to news_posts table if it doesn't exist
ALTER TABLE news_posts 
ADD COLUMN IF NOT EXISTS posted_by UUID REFERENCES admin_users(id);

-- Create index for posted_by for better query performance
CREATE INDEX IF NOT EXISTS idx_news_posts_posted_by ON news_posts(posted_by);

