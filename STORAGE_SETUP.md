# Image Storage Setup Guide

This guide will help you set up Supabase Storage for image uploads in the admin dashboard.

## For Local Supabase (Offline Development)

### Step 1: Start Local Supabase

```bash
npm run supabase:start
```

### Step 2: Apply migrations (creates the bucket automatically)

If you haven’t reset since enabling Storage, run:

```bash
npm run supabase:reset
```

This will create the `website-images` bucket automatically (via migration).

### Step 3: (Optional) Create Storage Bucket via UI

If you prefer doing it manually:

1. Open Supabase Studio: `http://localhost:54323` (check the URL from `supabase:start` output)
2. Go to **Storage** in the left sidebar
3. Click **New bucket**
4. Enter bucket name: `website-images`
5. Check **Public bucket** (so images are accessible)
6. Click **Create bucket**

### Step 4: Storage policies

For local Supabase, policies are already applied by migration. For cloud Supabase, run the SQL from `supabase/storage-setup.sql`:

1. Go to **SQL Editor** in Supabase Studio
2. Click **New query**
3. Copy and paste the contents of `supabase/storage-setup.sql`
4. Click **Run**

Alternatively, you can run it via CLI:

```bash
supabase db execute --file supabase/storage-setup.sql
```

## For Cloud Supabase (Production)

### Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Enter bucket name: `website-images`
5. Check **Public bucket**
6. Click **Create bucket**

### Step 2: Set Up Storage Policies

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Copy and paste the contents of `supabase/storage-setup.sql`
4. Click **Run**

## Verify Setup

After setup, you should be able to:

1. Upload images from the admin dashboard
2. See uploaded images displayed immediately
3. Delete images when deleting content items

## Troubleshooting

### Images not uploading

- Verify the storage bucket exists and is named `website-images`
- Check that storage policies are set up correctly
- Ensure you're using the correct Supabase credentials in `.env.local`

### Images not displaying

- Verify the bucket is set to **Public**
- Check that the image URL is correct
- Ensure CORS is enabled (should be by default for public buckets)

### Permission errors

- Make sure you're logged in as an admin user
- Verify storage policies allow authenticated users to upload/delete

## Storage Structure

Images are organized in folders:
- `hero-slides/` - Hero slider images
- `news/` - News post images
- `leadership/` - Leadership profile images
- `general/` - Other images

This organization helps keep your storage organized and makes it easier to manage images.
