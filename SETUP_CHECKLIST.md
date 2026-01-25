# Project Setup & Configuration Checklist

This document provides a complete checklist for setting up the GSMA Ghana Website project with all corrections applied.

## ✅ Phase 1: Initial Setup (Required)

- [ ] **Install dependencies**
  ```bash
  npm install
  ```

- [ ] **Start local Supabase** (requires Docker Desktop running)
  ```bash
  npm run supabase:start
  ```
  Save the output credentials - you'll need them in the next step.

- [ ] **Create `.env.local`**
  Copy the credentials from the Supabase output:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase start>
  SUPABASE_SERVICE_ROLE_KEY=<service role key from supabase start>
  NODE_ENV=development
  DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
  ```

- [ ] **Apply database migrations**
  ```bash
  npm run supabase:reset
  ```
  This creates all tables (admin_users, hero_slides, news_posts, leadership, projects, events, gallery_items, site_settings).

- [ ] **Verify database connection**
  ```bash
  npm run verify-db
  ```
  You should see ✅ for all required tables.

## ✅ Phase 2: Admin Setup (Required to Access Admin Panel)

- [ ] **Create admin user**
  ```bash
  npm run create-admin admin@gsma.gov.gh yourpassword "Admin Name"
  ```
  This outputs SQL - copy it and run in Supabase SQL Editor, OR update the admin user creation script to auto-insert.

  **Verify admin user exists:**
  - Go to Supabase Studio (http://localhost:54323)
  - Select "admin_users" table
  - You should see one row with your email

- [ ] **Start development server**
  ```bash
  npm run dev
  ```
  Server runs at http://localhost:3000

- [ ] **Test admin login**
  - Visit http://localhost:3000/admin/login
  - Enter email and password you created
  - Should redirect to http://localhost:3000/admin/dashboard

## ✅ Phase 3: Security Fixes (Applied Automatically)

These corrections have been applied to the codebase:

- [x] **Fixed JWT Secret Handling** (`src/lib/auth.ts`)
  - Removed insecure fallback value
  - Now throws error if `SUPABASE_SERVICE_ROLE_KEY` is missing

- [x] **Enhanced Session Verification** (`src/lib/auth.ts`)
  - Added detailed error logging
  - Better error handling in verification

- [x] **Updated Login Route** (`src/app/api/admin/login/route.ts`)
  - Added existing session check
  - Prevents double login

- [x] **Created Auth Middleware** (`src/lib/auth-middleware.ts`)
  - Helper function for session verification
  - Can be used to reduce code duplication

- [x] **Added Slug Utility** (`src/lib/content-utils.ts`)
  - Automatic slug generation from titles
  - Prevents duplicate slugs
  - Used in: news, projects, events routes

- [x] **Updated All API Routes**
  - News route: Uses `getSlug()` utility
  - Projects route: Uses `getSlug()` utility
  - Events route: Uses `getSlug()` utility
  - Gallery route: Already had proper session checks

- [x] **Health Check Endpoint** (`src/app/api/health/route.ts`)
  - Test: `curl http://localhost:3000/api/health`
  - Returns database and storage status

## ✅ Phase 4: Database Security (Manual Setup Needed)

- [ ] **Apply RLS Policies** (optional but recommended)

  **For Local Supabase:**
  - RLS policies are auto-applied via migrations
  - No additional action needed

  **For Cloud Supabase:**
  1. Go to https://app.supabase.com
  2. Open SQL Editor
  3. Copy entire contents of `supabase/rls-policies.sql`
  4. Click **Run**
  5. Verify in **Authentication** → **Policies**

  See [RLS_SETUP.md](./RLS_SETUP.md) for detailed info.

## ✅ Phase 5: Storage Setup (Required for Image Uploads)

- [ ] **Verify website-images bucket exists**
  - Go to Supabase Studio (http://localhost:54323)
  - Click **Storage** in left sidebar
  - You should see `website-images` bucket
  - If missing, run: `npm run supabase:reset`

- [ ] **Test image upload**
  - Go to http://localhost:3000/admin/dashboard
  - Navigate to "Slides", "News", or "Leadership" tab
  - Try uploading an image
  - Should see preview and save successfully

## ✅ Phase 6: Data Management

- [ ] **Backup local database** (recommended before testing)
  ```bash
  npm run backup-db
  ```
  Creates timestamped backup in `backups/` directory.

- [ ] **Seed sample data** (optional)
  Sample data is defined in `supabase/seed.sql` and auto-applied by `supabase reset`.

## ✅ Phase 7: Testing & Validation

- [ ] **Health Check**
  ```bash
  curl http://localhost:3000/api/health
  ```
  Should return status with database and storage info.

- [ ] **Admin Login Test**
  - Visit http://localhost:3000/admin/login
  - Login with credentials created in Phase 2
  - Should access dashboard

- [ ] **Public Content Display**
  - Visit http://localhost:3000
  - Should see hero slides, news, leadership
  - Images should load

- [ ] **Create Test Content**
  - Create a news post in admin dashboard
  - Visit http://localhost:3000/news
  - Post should be visible

- [ ] **Image Upload Test**
  - Upload image in admin dashboard
  - Verify image displays in preview
  - Verify image is saved to Supabase Storage

## ✅ Phase 8: Deployment Preparation

- [ ] **Environment Variables Setup**
  - For cloud Supabase, get credentials:
    1. Go to https://app.supabase.com
    2. Project Settings > API > Copy:
       - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
       - Anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
       - Service role key → `SUPABASE_SERVICE_ROLE_KEY`
  - Store in your deployment platform (Vercel, Railway, etc.)

- [ ] **Database Preparation**
  - [ ] Create cloud Supabase project
  - [ ] Run `schema.sql` in cloud SQL Editor
  - [ ] Apply RLS policies from `rls-policies.sql`
  - [ ] Create admin user in cloud database
  - [ ] Set up storage bucket and policies

- [ ] **Build Testing**
  ```bash
  npm run build
  npm run start
  ```
  Should build without errors (TypeScript errors are ignored).

## 📋 Still To Do (Future Enhancements)

These items are identified but not yet implemented:

- [ ] **Admin User Management** - Create/edit/delete other admins
- [ ] **Password Reset** - Allow admins to change passwords
- [ ] **Image Cleanup** - Auto-delete images when content is removed
- [ ] **Session Timeout UI** - Show warning before session expires
- [ ] **Complete Gallery UI** - Add gallery items management UI
- [ ] **Complete Events UI** - Add events management UI
- [ ] **Structured Logging** - Implement proper error logging
- [ ] **Migration Guide** - Document local → cloud migration
- [ ] **TypeScript Strict Mode** - Fix type safety issues

## 🔗 Useful Links

- [Quick Start Guide](./QUICK_START.md)
- [Database Setup Guide](./DATABASE_SETUP.md)
- [Offline Local Supabase](./OFFLINE_SUPABASE.md)
- [Storage Setup Guide](./STORAGE_SETUP.md)
- [RLS Setup Guide](./RLS_SETUP.md)
- [Admin Dashboard Guide](./ADMIN_DASHBOARD_COMPLETE.md)

## 🆘 Troubleshooting

### Issue: `SUPABASE_SERVICE_ROLE_KEY is not set`
**Fix:** Ensure `.env.local` has the key from `npm run supabase:start`

### Issue: "Unauthorized" when logging in
**Fix:** Verify admin user exists in `admin_users` table

### Issue: Images not uploading
**Fix:** Check `website-images` bucket exists in Storage

### Issue: Database connection failed
**Fix:** Ensure `npm run supabase:start` succeeded and Docker is running

### Issue: Port already in use
**Fix:** Kill existing Supabase: `npm run supabase:stop` and restart

For more help, check individual markdown files or the [README.md](./README.md).

## ✨ Success Indicators

You'll know everything is set up correctly when:

1. ✅ `npm run verify-db` shows all tables exist
2. ✅ Admin login works at `/admin/login`
3. ✅ Dashboard loads with content management sections
4. ✅ Can create/edit/delete content items
5. ✅ Images upload and display correctly
6. ✅ Public pages show created content
7. ✅ `/api/health` endpoint returns "healthy" status
8. ✅ Database backups succeed with `npm run backup-db`

Once all these indicators pass, your project is fully configured! 🎉
