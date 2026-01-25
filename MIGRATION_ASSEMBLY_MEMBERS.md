# Assembly Members Migration Guide

## Overview
This guide will help you apply the Assembly Members database migration to enable electoral area and assembly member management.

## Prerequisites
- Node.js and npm installed
- Supabase instance running (local or cloud)
- `.env.local` file with Supabase credentials configured
- Project dependencies installed (`npm install`)

## Migration Files Created

### Database Schema
- **File**: `supabase/migrations/20260124000000_assembly_members.sql`
- **Tables**: 
  - `electoral_areas` - Stores electoral area information
  - `assembly_members` - Stores individual member details

### Frontend Code
- **File**: `src/app/about/assembly/page.tsx`
- **Features**: Displays electoral areas with their assembly members

### Migration Script
- **File**: `scripts/migrate-assembly-members.js`
- **Purpose**: Applies database migration without Supabase CLI

### Documentation
- **File**: `ASSEMBLY_MEMBERS_GUIDE.md` - Detailed admin guide
- **File**: `supabase/seeds/assembly_members_seed.sql` - Sample data template

## Option 1: Using Supabase CLI (Recommended)

### Step 1: Check Supabase CLI Installation
```bash
supabase --version
```

If not installed:
```bash
npm install -g supabase
```

### Step 2: Reset Database
This will automatically apply all pending migrations including the assembly members migration:

```bash
npm run supabase:reset
```

This command:
- Drops all existing tables
- Applies all migrations in `/supabase/migrations/`
- Runs seed data if available

### Step 3: Verify Migration
```bash
npm run verify-db
```

### Step 4: Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000/about/assembly`

---

## Option 2: Using Node Script (Alternative)

### Step 1: Ensure .env.local is Configured
Your `.env.local` should contain:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### Step 2: Run Migration Script
```bash
npm run migrate:assembly
```

This script will:
- Connect to Supabase
- Apply all statements from the migration file
- Verify table creation
- Provide next steps

### Step 3: Check Progress
The script will output:
```
✅ Connected to Supabase
✅ Migration file loaded
✅ Electoral areas table created
✅ Assembly members table created
```

### Step 4: Restart Development Server
```bash
npm run dev
```

---

## Option 3: Manual SQL in Supabase Dashboard

### Step 1: Open Supabase Dashboard
- Cloud: https://app.supabase.com
- Local: http://localhost:54323

### Step 2: Go to SQL Editor
Click on "SQL Editor" in the left sidebar

### Step 3: Copy and Paste Migration SQL
1. Open: `supabase/migrations/20260124000000_assembly_members.sql`
2. Copy all content
3. Paste into the SQL Editor in Supabase Dashboard
4. Click "Run"

### Step 4: Verify Tables
In the "Table Editor" tab, you should see:
- `electoral_areas`
- `assembly_members`

---

## Verification Steps

### Check Tables Exist
```bash
npm run verify-db
```

Or in Supabase Dashboard:
1. Go to "Table Editor"
2. Look for `electoral_areas` and `assembly_members` tables

### Test the Frontend
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/about/assembly`
3. You should see the assembly members section (empty until data is added)

---

## Troubleshooting

### Error: "Missing Supabase credentials"
**Solution**: Ensure `.env.local` exists with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Migration file not found"
**Solution**: Run from project root directory:
```bash
cd /path/to/orchids-remix-of-gsma-ghana-official-website-main
npm run migrate:assembly
```

### Error: "Connection refused"
**Solution**: 
- For local Supabase: Ensure `npm run supabase:start` is running
- For cloud Supabase: Check internet connection and credentials

### Tables not appearing
**Solution**:
1. Clear browser cache
2. Refresh Supabase Dashboard
3. Check table names (case-sensitive): `electoral_areas`, `assembly_members`

---

## After Migration: Adding Data

### Add Electoral Areas
```sql
INSERT INTO electoral_areas (name, display_order, is_active)
VALUES 
  ('Weija Electoral Area', 1, true),
  ('Kasoa Electoral Area', 2, true),
  ('Brofoyedu Electoral Area', 3, true);
```

### Add Assembly Members
```sql
INSERT INTO assembly_members (name, electoral_area_id, position, bio, is_active, display_order)
VALUES (
  'John Doe',
  (SELECT id FROM electoral_areas WHERE name = 'Weija Electoral Area'),
  'Elected Assembly Member',
  'Community leader',
  true,
  1
);
```

### Upload Member Images
1. Go to Supabase Dashboard → Storage
2. Create a bucket called `assembly-members` (if using Supabase Storage)
3. Upload images
4. Update member records with image URLs:
```sql
UPDATE assembly_members 
SET image_url = '<your-image-url>'
WHERE id = '<member-id>';
```

---

## Database Schema Reference

### electoral_areas table
```
id (UUID) - Primary key
name (VARCHAR) - Electoral area name
description (TEXT) - Optional description
display_order (INTEGER) - Sort order
is_active (BOOLEAN) - Show/hide on website
created_at (TIMESTAMP) - Creation time
updated_at (TIMESTAMP) - Last modified time
```

### assembly_members table
```
id (UUID) - Primary key
name (VARCHAR) - Member's full name
electoral_area_id (UUID) - Foreign key to electoral_areas
position (VARCHAR) - Job title
image_url (TEXT) - Profile photo URL
bio (TEXT) - Biography
contact_email (VARCHAR) - Email address
contact_phone (VARCHAR) - Phone number
is_active (BOOLEAN) - Show/hide on website
display_order (INTEGER) - Sort order
created_at (TIMESTAMP) - Creation time
updated_at (TIMESTAMP) - Last modified time
```

---

## Next Steps

1. ✅ Run migration (see options above)
2. ✅ Verify tables created
3. 📝 Add electoral areas
4. 👥 Add assembly members
5. 📸 Upload member images
6. 🧪 Test on website: `/about/assembly`
7. 📱 Test responsive design on mobile (320px, 768px, 1024px+)

---

## Support

For issues or questions:
- Check `ASSEMBLY_MEMBERS_GUIDE.md` for admin instructions
- Review database schema documentation above
- Check Supabase logs in Dashboard

---

## Rollback (If Needed)

To undo the migration and delete tables:

```sql
DROP TABLE IF EXISTS assembly_members CASCADE;
DROP TABLE IF EXISTS electoral_areas CASCADE;
```

Then run migration again to restore.

