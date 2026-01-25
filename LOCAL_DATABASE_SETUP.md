# 🗄️ Local Database Setup Guide - Step by Step

This guide walks you through setting up your local Supabase database from scratch for the GSMA Ghana Website project.

**Estimated Time:** 30-45 minutes  
**Prerequisites:** Docker Desktop, Node.js, npm

---

## 🚀 QUICK START (5 minutes)

If you just want to get running quickly:

```bash
# 1. Install dependencies
npm install

# 2. Start Supabase
npm run supabase:start

# 3. Create .env.local (see below for values)

# 4. Initialize database
npm run supabase:reset

# 5. Start dev server
npm run dev
```

---

## 📋 DETAILED STEP-BY-STEP SETUP

### Step 1: Verify Prerequisites (2 minutes)

Before starting, make sure you have:

#### Check Docker
```bash
docker --version
```
✅ Should output version like `Docker version 20.x.x`

**If Docker is not installed:**
- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Install and restart your computer
- Verify with `docker --version`

#### Check Node.js
```bash
node --version
npm --version
```
✅ Should output versions like `v18.x.x` and `9.x.x`

**If Node.js is not installed:**
- Download from [nodejs.org](https://nodejs.org)
- Install LTS version
- Restart terminal
- Verify with above commands

#### Check Current Directory
```bash
pwd  # On Mac/Linux
cd   # On Windows to show current directory
```
✅ Should be in `orchids-remix-of-gsma-ghana-official-website-main` folder

**If not in correct folder:**
```bash
cd c:\Users\USER\Desktop\orchids-remix-of-gsma-ghana-official-website-main
```

---

### Step 2: Install npm Dependencies (3 minutes)

```bash
npm install
```

**What this does:**
- Installs all project dependencies from package.json
- Creates node_modules folder
- Generates package-lock.json

**Expected output:**
```
added XXX packages in Xs
```

✅ **Success indicator:** No error messages, final line shows "added ... packages"

**If you get errors:**
- Try clearing cache: `npm cache clean --force`
- Delete node_modules: `rm -r node_modules` (Windows: `rmdir /s node_modules`)
- Try install again: `npm install`

---

### Step 3: Stop Any Existing Supabase (1 minute)

If you have Supabase running from before, stop it:

```bash
npm run supabase:stop
```

Or if using direct command:
```bash
supabase stop
```

⏳ Wait for it to complete (usually 5-10 seconds)

✅ **Success indicator:** Returns to prompt without errors

---

### Step 4: Start Supabase (5 minutes)

```bash
npm run supabase:start
```

**What this does:**
- Downloads Supabase Docker image (if first time, ~2-3 min)
- Starts PostgreSQL database
- Starts Supabase API server
- Generates API keys and credentials

**Expected output:**
```
Started supabase local development server.

API URL: http://127.0.0.1:54321
Anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

**⚠️ IMPORTANT:** Copy these values - you'll need them in Step 5!

✅ **Success indicators:**
- See "Started supabase local development server"
- See all 4 URLs/keys above
- Terminal prompt returns
- Can access http://localhost:54323 in browser

**If ports are already in use:**
```bash
# Kill existing process on port 54321
# Windows:
netstat -ano | findstr ":54321"
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :54321
kill -9 <PID>

# Then try again
npm run supabase:start
```

---

### Step 5: Create .env.local File (2 minutes)

Create a new file named `.env.local` in your project root:

```
c:\Users\USER\Desktop\orchids-remix-of-gsma-ghana-official-website-main\.env.local
```

**Copy-paste the values from Step 4 output:**

```env
# Supabase Local Connection
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database
SUPABASE_JWT_SECRET=super-secret-jwt-token-change-me-in-production
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

⚠️ **Replace the JWT secret and keys with actual values from Step 4!**

✅ **Success indicator:**
- File `.env.local` exists in project root
- Contains all 4-6 environment variables
- Values are not empty

**To verify file was created:**
```bash
cat .env.local  # Mac/Linux
type .env.local # Windows
```

Should display the environment variables.

---

### Step 6: Reset Database & Apply Migrations (3 minutes)

Now initialize your database with schema and migrations:

```bash
npm run supabase:reset
```

**What this does:**
- Drops existing database (if any)
- Creates fresh database from scratch
- Runs all migrations in `supabase/migrations/`
- Seeds sample data from `supabase/seed.sql`
- Creates RLS policies
- Configures storage buckets

**Expected output:**
```
Seeding data...
✓ Applied 3 migrations
✓ Completed initial setup
```

✅ **Success indicators:**
- Returns to prompt without errors
- Shows "Applied X migrations"
- No error messages about tables

**If this step fails with "Exit Code: 1":**

**Issue 1: Port already in use**
```bash
npm run supabase:stop
# Wait 10 seconds
npm run supabase:start
# Get new credentials, update .env.local
npm run supabase:reset
```

**Issue 2: Docker not running**
- Open Docker Desktop app
- Wait for it to fully start (~30 seconds)
- Try again: `npm run supabase:reset`

**Issue 3: Migrations failing**
```bash
# Check migration files
ls supabase/migrations/

# Try manual reset
supabase db push --dry-run
supabase db reset
```

**Issue 4: Permission denied**
```bash
# May need elevated permissions on Windows
# Run PowerShell as Administrator and try again
```

---

### Step 7: Verify Database Was Created (2 minutes)

Check that all tables were created:

```bash
npm run verify-db
```

**Expected output:**
```
✅ Database connection successful
✅ Table: users
✅ Table: news
✅ Table: projects
✅ Table: events
✅ Table: gallery_items
✅ Table: hero_slides
✅ Table: leadership
✅ Table: content_logs
✅ All tables verified successfully!
```

✅ **Success indicator:** All 8 tables show ✅

**If some tables are missing:**

```bash
# Force reset the database
npm run supabase:reset

# If still failing, check migrations
supabase migration list
```

---

### Step 8: Access Supabase Studio (Optional but Recommended) (1 minute)

Access the web interface to verify database:

1. Open browser and go to: **http://localhost:54323**
2. Login with:
   - Email: `supabase`
   - Password: `password`
3. You should see:
   - Tables in left sidebar
   - Editor, SQL tabs at top

✅ **Success indicators:**
- Can login to Supabase Studio
- See all 8 tables listed
- Can see schema for each table
- Can see Storage bucket named "website-images"

---

### Step 9: Create Admin User (3 minutes)

Create your first admin user to access the dashboard:

```bash
npm run create-admin
```

**This will prompt you for:**
- Email: `admin@gsma.org.gh`
- Password: Create a strong password (8+ characters)
- Name: `Admin User`

**Or with parameters:**
```bash
npm run create-admin admin@gsma.org.gh MyPassword123 "Admin User"
```

✅ **Success indicator:** Script completes without errors

**To verify in database:**
1. Go to http://localhost:54323 (Supabase Studio)
2. Click **users** table
3. Should see your admin user row

**If the script fails:**

```bash
# Check that the script exists
cat scripts/create-admin-user.js

# Run manually with Node
node scripts/create-admin-user.js
```

---

### Step 10: Start Development Server (2 minutes)

Now start your Next.js development server:

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.3.5
  - Local:        http://localhost:3000
  ▲ Compiled successfully in 5s
```

✅ **Success indicator:**
- Server starts without errors
- Shows "Compiled successfully"
- Server is running at http://localhost:3000

**If build fails:**

```bash
# Clear Next.js cache
rm -r .next

# Try again
npm run dev
```

---

### Step 11: Test Admin Login (3 minutes)

Now test that you can actually log in:

1. Open browser: **http://localhost:3000/admin/login**
2. Enter credentials from Step 9:
   - Email: `admin@gsma.org.gh`
   - Password: (whatever you created)
3. Click **Login**

✅ **Success indicators:**
- Login page loads without errors
- Credentials are accepted
- Redirects to http://localhost:3000/admin/dashboard
- Dashboard loads with tabs for: Slides, News, Projects, Events, Gallery, Leadership

**If login fails:**

```bash
# Check admin user exists
npm run verify-db

# Try creating admin again
npm run create-admin

# Check .env.local has correct JWT_SECRET
cat .env.local
```

---

### Step 12: Test Public Website (2 minutes)

Verify the public website works:

1. Open browser: **http://localhost:3000**
2. Should see:
   - Homepage with hero slider
   - News section
   - Leadership section
   - Navigation bar

✅ **Success indicator:**
- Homepage loads without errors
- All sections visible
- No console errors

---

### Step 13: Test Image Upload (3 minutes)

Test that image uploads work:

1. Go to **http://localhost:3000/admin/dashboard**
2. Click **Slides** tab
3. Click **Add Slide** button
4. Upload a test image (JPG, PNG, or WebP)
5. Fill in other fields (title, description)
6. Click **Save**

✅ **Success indicators:**
- Image preview shows
- Save completes without errors
- Image appears in Supabase Storage bucket

**If image upload fails:**

```bash
# Check storage bucket exists
npm run supabase:reset

# Verify in Supabase Studio
# Click Storage > website-images bucket should exist
```

---

### Step 14: Run Health Check (1 minute)

Test the API health endpoint:

```bash
curl http://localhost:3000/api/health
```

**Expected output:**
```json
{
  "status": "healthy",
  "database": "connected",
  "storage": "operational",
  "timestamp": "2025-01-23T12:34:56Z"
}
```

✅ **Success indicator:** Shows "healthy" and "connected"

---

## ✅ COMPLETE SETUP CHECKLIST

After completing all steps above, verify you have:

- [ ] Step 1: Prerequisites verified (Docker, Node.js)
- [ ] Step 2: npm dependencies installed
- [ ] Step 3: Existing Supabase stopped (if any)
- [ ] Step 4: Supabase started and credentials obtained
- [ ] Step 5: .env.local file created with credentials
- [ ] Step 6: Database migrations applied successfully
- [ ] Step 7: Database verification passed (8 tables)
- [ ] Step 8: Can access Supabase Studio (optional)
- [ ] Step 9: Admin user created
- [ ] Step 10: Dev server running on port 3000
- [ ] Step 11: Can login to admin dashboard
- [ ] Step 12: Public website accessible
- [ ] Step 13: Image upload works
- [ ] Step 14: Health check returns "healthy"

**If all steps pass:** ✅ Your local database setup is complete!

---

## 🆘 TROUBLESHOOTING

### Problem: "Port already in use"
```bash
# Find what's using port 54321
netstat -ano | findstr ":54321"

# Kill the process (replace PID)
taskkill /PID 12345 /F

# Or stop Supabase
npm run supabase:stop
```

### Problem: "Docker daemon not running"
- Open Docker Desktop application
- Wait 30 seconds for it to fully start
- Try again

### Problem: "SUPABASE_SERVICE_ROLE_KEY is not set"
- Check .env.local file exists
- Verify it has correct value from Step 4
- Restart dev server: `npm run dev`

### Problem: "Cannot find module..."
```bash
npm install
npm run dev
```

### Problem: "Database is locked"
```bash
npm run supabase:stop
# Wait 10 seconds
npm run supabase:start
npm run supabase:reset
```

### Problem: Admin login doesn't work
```bash
# Recreate admin user
npm run create-admin

# Verify it was created
npm run verify-db
```

### Problem: "Table already exists"
```bash
# This is normal on second setup, but if error:
npm run supabase:reset  # This drops and recreates
```

---

## 📚 USEFUL COMMANDS REFERENCE

```bash
# Start/Stop Supabase
npm run supabase:start    # Start local database
npm run supabase:stop     # Stop local database
npm run supabase:reset    # Reset database (drop and recreate)

# Database management
npm run verify-db         # Check all tables exist
npm run backup-db         # Create backup of current database

# Development
npm run dev               # Start dev server
npm run build             # Build for production
npm run type-check        # Check TypeScript types

# Admin
npm run create-admin      # Create admin user
```

---

## 🎯 QUICK REFERENCE - IF SOMETHING GOES WRONG

**Database won't start:**
```bash
npm run supabase:stop
docker ps
docker kill <container-id>
npm run supabase:start
```

**Lost .env.local:**
```bash
# Run Supabase again to get credentials
npm run supabase:start
# Copy credentials to new .env.local file
```

**Need to start fresh:**
```bash
npm run supabase:stop
npm run supabase:start
npm run supabase:reset
npm run verify-db
npm run create-admin
npm run dev
```

**Port conflicts:**
```bash
# Change Supabase port in supabase/config.toml
# Or kill existing process
taskkill /PID <PID> /F
```

---

## ✨ AFTER SETUP

Once setup is complete:

1. **Development:** Run `npm run dev` to start coding
2. **Testing:** Use http://localhost:3000 for public site
3. **Admin:** Use http://localhost:3000/admin for dashboard
4. **Database:** Access at http://localhost:54323
5. **Backup:** Run `npm run backup-db` before major changes

---

## 📞 STILL HAVING ISSUES?

Check these guides:
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - General checklist
- [OFFLINE_SUPABASE.md](./OFFLINE_SUPABASE.md) - Detailed Supabase info
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Database schema info
- [QUICK_START.md](./QUICK_START.md) - Quick reference

Contact: dev@gsma.org.gh

---

**Last Updated:** January 2025  
**Status:** ✅ Complete  
**Estimated Setup Time:** 30-45 minutes
