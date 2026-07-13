#!/usr/bin/env node

const https = require('https');
const url = require('url');

const dbUrl = 'postgresql://postgres.kgadsaibqofxpzyehkpi:GHUziWanPBRo8OT5NgfgcS8PpFjpI4UGjDZhq7zCuYcnHfQIDDGaUHXJYwsWnPpY@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

const { Client } = require('pg');

const client = new Client({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

const migration = `
-- Add posted_by column to news_posts table if it doesn't exist
ALTER TABLE news_posts 
ADD COLUMN IF NOT EXISTS posted_by UUID REFERENCES admin_users(id);

-- Create index for posted_by for better query performance
CREATE INDEX IF NOT EXISTS idx_news_posts_posted_by ON news_posts(posted_by);
`;

async function runMigration() {
  try {
    await client.connect();
    console.log('Connected to cloud database');
    
    await client.query(migration);
    console.log('✅ Migration applied successfully to cloud database');
    
    await client.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
