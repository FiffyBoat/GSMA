-- Add caption and credit fields to content tables
-- Migration: 20260512000000_add_captions_and_credits.sql

-- Add caption and credit fields to news_posts
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE news_posts ADD COLUMN IF NOT EXISTS credit_note TEXT;

-- Add caption and credit fields to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS credit_note TEXT;

-- Add caption and credit fields to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS credit_note TEXT;

-- Add caption and credit fields to gallery_items
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS credit_note TEXT;