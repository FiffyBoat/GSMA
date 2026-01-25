# Migrating from Local to Cloud Supabase

This guide explains how to migrate your local Supabase database and images to cloud Supabase for production.

## Overview

The migration process involves:
1. Creating a cloud Supabase project
2. Running migrations to create schema
3. Exporting data from local Supabase
4. Importing data to cloud Supabase
5. Migrating images from local storage to cloud storage
6. Updating environment variables

## Prerequisites

- Local Supabase database with data (optional)
- Supabase account at https://app.supabase.com
- Docker Desktop (to keep running local instance during migration)
- Node.js installed

## Step 1: Create Cloud Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `gsma-ghana-website`
   - Database Password: (choose strong password and save)
   - Region: (choose closest region)
4. Wait for project to initialize (~2 minutes)

## Step 2: Get Cloud Credentials

1. In cloud project, go to **Settings** > **API**
2. Copy these values to a temporary file:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service role key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Create Cloud Database Schema

1. In cloud Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste entire contents of `supabase/schema.sql`
4. Click **Run** to create all tables
5. Repeat for:
   - `supabase/migrations/20260120091000_storage.sql`
   - `supabase/migrations/20260120092000_projects_events_gallery.sql`

## Step 4: Apply RLS Policies

1. In cloud Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `supabase/rls-policies.sql`
4. Click **Run**

## Step 5: Export Data from Local Supabase

### Option A: Use Backup Script (Recommended)

```bash
npm run backup-db
```

This creates JSON exports in `backups/backup-YYYY-MM-DD/` folder.

Files created:
- `admin_users.json`
- `hero_slides.json`
- `news_posts.json`
- `leadership.json`
- `projects.json`
- `events.json`
- `gallery_items.json`
- `site_settings.json`

### Option B: Manual Export

1. Start local Supabase (if not running):
   ```bash
   npm run supabase:start
   ```

2. For each table in Supabase Studio:
   - Go to **Table Editor**
   - Select table
   - Click **Download as CSV** button
   - Save to `backups/` folder

## Step 6: Import Data to Cloud Supabase

### Create Admin User First

```bash
npm run create-admin admin@gsma.gov.gh yourpassword "Administrator"
```

This outputs SQL. Run it in cloud Supabase SQL Editor.

### Import Other Data

For each JSON file from backup:

1. Go to cloud Supabase **SQL Editor**
2. Click **New Query**
3. Use this template:

```sql
-- Example for hero_slides
INSERT INTO hero_slides (id, image_url, title, subtitle, description, display_order, is_active, created_at, updated_at)
VALUES 
  ('uuid', 'url', 'title', 'subtitle', 'desc', 0, true, 'timestamp', 'timestamp'),
  -- Add more rows...
ON CONFLICT (id) DO NOTHING;
```

**Or use a script:**

Create a Node.js script to automate:

```javascript
// scripts/import-data.js
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importData() {
  const backupDir = "backups/backup-YYYY-MM-DD"; // Update date
  const tables = [
    "hero_slides",
    "news_posts",
    "leadership",
    "projects",
    "events",
    "gallery_items",
    "site_settings",
  ];

  for (const table of tables) {
    const filePath = path.join(backupDir, `${table}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const { error } = await supabase.from(table).insert(data);

    if (error) {
      console.error(`Failed to import ${table}:`, error);
    } else {
      console.log(`✅ Imported ${table}: ${data.length} records`);
    }
  }
}

importData();
```

Run with:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co \
SUPABASE_SERVICE_ROLE_KEY=YOUR_KEY \
node scripts/import-data.js
```

## Step 7: Create Cloud Storage Bucket

1. In cloud Supabase, go to **Storage**
2. Click **New Bucket**
3. Enter: `website-images`
4. Check **Public bucket**
5. Click **Create bucket**

## Step 8: Migrate Images

### Automated Migration

Create this script:

```javascript
// scripts/migrate-images.js
const fs = require("fs");
const path = require("path");
const https = require("https");
const { createClient } = require("@supabase/supabase-js");

const localSupabase = createClient(
  process.env.LOCAL_SUPABASE_URL,
  process.env.LOCAL_SERVICE_ROLE_KEY
);

const cloudSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const buffer = [];
    https.get(url, (res) => {
      res.on("data", (chunk) => buffer.push(chunk));
      res.on("end", () => resolve(Buffer.concat(buffer)));
    }).on("error", reject);
  });
}

async function migrateImages(imageUrls) {
  let migrated = 0;
  for (const url of imageUrls) {
    try {
      // Extract path from local URL
      const pathMatch = url.match(/website-images\/(.+?)($|\?)/);
      if (!pathMatch) continue;

      const imagePath = pathMatch[1];

      // Download from local
      const imageData = await downloadImage(url);

      // Upload to cloud
      const { error } = await cloudSupabase.storage
        .from("website-images")
        .upload(imagePath, imageData, { upsert: true });

      if (!error) migrated++;
    } catch (error) {
      console.error(`Failed to migrate image ${url}:`, error);
    }
  }
  return migrated;
}

// Run for each table with images
async function migrate() {
  const tables = ["hero_slides", "news_posts", "leadership", "projects", "events", "gallery_items"];
  let totalMigrated = 0;

  for (const table of tables) {
    const { data } = await localSupabase
      .from(table)
      .select("image_url")
      .not("image_url", "is", null);

    if (data) {
      const urls = data.map(row => row.image_url);
      const count = await migrateImages(urls);
      totalMigrated += count;
      console.log(`✅ Migrated ${count} images from ${table}`);
    }
  }

  console.log(`\n✨ Total images migrated: ${totalMigrated}`);
}

migrate();
```

Run with:
```bash
LOCAL_SUPABASE_URL=http://127.0.0.1:54321 \
LOCAL_SERVICE_ROLE_KEY=YOUR_LOCAL_KEY \
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co \
SUPABASE_SERVICE_ROLE_KEY=YOUR_CLOUD_KEY \
node scripts/migrate-images.js
```

### Apply Storage Policies

1. In cloud Supabase, go to **SQL Editor**
2. Copy entire contents of `supabase/storage-setup.sql`
3. Click **Run**

## Step 9: Update Environment Variables

Update `.env.local` with cloud credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NODE_ENV=production
```

## Step 10: Test Cloud Setup

1. Start development server:
   ```bash
   npm run dev
   ```

2. Verify at http://localhost:3000:
   - Homepage shows migrated content
   - Images display correctly
   - Admin login works

3. Test at http://localhost:3000/admin/login:
   - Create new content
   - Upload images
   - Edit existing content

## Step 11: Stop Local Supabase (Optional)

Once you've verified cloud setup is working:

```bash
npm run supabase:stop
```

Keep running locally if you want to test changes before production.

## Rollback Plan

If something goes wrong:

1. Keep original `.env.local` backed up
2. Can revert to local Supabase by switching env vars
3. Data remains in local Supabase until explicitly deleted
4. Images remain in local storage bucket

## Troubleshooting

### Import Failed - "Duplicate Key"
- Data already exists in cloud database
- Solution: Use `ON CONFLICT DO NOTHING` in SQL or delete existing data

### Images Not Found After Migration
- Image paths might have changed
- Solution: Check image URLs in database match storage paths

### Connection Fails
- Verify cloud credentials are correct
- Ensure IP is not blocked (cloud Supabase may have IP whitelist)
- Check environment variables are loaded

### RLS Policy Errors
- RLS policies might be blocking inserts
- Solution: Run `supabase/rls-policies.sql` again

## Performance Tips

- Migrate during off-hours
- Test with small dataset first
- Keep backups of all data
- Verify image counts before/after migration

## Security After Migration

1. Change admin password in cloud Supabase
2. Rotate JWT secret if needed
3. Review RLS policies are correctly applied
4. Enable SSL for all connections (cloud does this by default)

## Keeping Data in Sync

If running both local and cloud:

1. Backup cloud data regularly:
   ```bash
   # Set env to cloud
   npm run backup-db
   ```

2. Restore to local when needed:
   ```bash
   # Set env to local and run import script
   ```

## Next Steps

- Monitor cloud Supabase logs for errors
- Set up automated backups in cloud Supabase
- Consider using Vercel for hosting
- Set up production deployment pipeline

## Support

For Supabase-specific issues, check:
- https://supabase.com/docs/guides/database
- https://supabase.com/docs/guides/storage
- Supabase GitHub issues

---

**Migration Checklist:**
- [ ] Create cloud Supabase project
- [ ] Get cloud credentials
- [ ] Create schema in cloud
- [ ] Apply RLS policies
- [ ] Export data from local
- [ ] Import data to cloud
- [ ] Create storage bucket
- [ ] Migrate images
- [ ] Update environment variables
- [ ] Test cloud setup
- [ ] Update deployment configs
- [ ] Monitor for errors
