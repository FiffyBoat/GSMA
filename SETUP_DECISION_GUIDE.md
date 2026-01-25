# 🎯 Local Database Setup - Quick Decision Guide

## Your Current Situation

```
✅ Prerequisites Ready:
   - Docker: v29.1.3 ✓
   - Node.js: v24.13.0 ✓
   - npm: v11.6.2 ✓
   - .env.local: EXISTS ✓

⚠️ To Complete Setup:
   - Choose a Supabase option (see below)
   - Run database migrations
   - Create admin user
   - Start development server
```

---

## 3 Setup Options - Choose One

### 📌 OPTION 1: Cloud Supabase (Recommended)

**Best for:** Quick setup, no complexity

**Time:** 5 minutes

**Steps:**
1. Go to https://supabase.com → Create free account
2. Create new project (copy 3 keys)
3. Update `.env.local` with those keys
4. Run migrations in SQL Editor
5. Create admin user
6. `npm run dev`

**Pros:**
- ✅ Fastest setup
- ✅ No local resources used
- ✅ Same as production
- ✅ Free tier very generous

**Cons:**
- ❌ Requires internet
- ❌ Data on cloud (but encrypted)

**👉 This is recommended for you**

---

### 🏠 OPTION 2: Docker Local (Advanced)

**Best for:** Complete local development

**Time:** 15 minutes

**Steps:**
1. Create `docker-compose.yml`
2. `docker-compose up -d`
3. Run SQL migrations
4. Update `.env.local`
5. Create admin user
6. `npm run dev`

**Pros:**
- ✅ 100% local, no internet needed
- ✅ Full control
- ✅ Same as Option 1 functionality

**Cons:**
- ❌ More complex setup
- ❌ Uses local resources
- ❌ Port management

**👉 Choose this if you want offline development**

---

### 🔄 OPTION 3: Existing Supabase (If you already have one)

**Best for:** Reusing existing setup

**Time:** 2 minutes

**Steps:**
1. Get existing connection details
2. Update `.env.local`
3. `npm run supabase:reset`
4. `npm run verify-db`
5. `npm run dev`

**Pros:**
- ✅ Fastest if already setup
- ✅ Reuse existing data

**Cons:**
- ❌ Only works if you have Supabase running

---

## 🚀 RECOMMENDED SETUP PATH FOR YOU

```
1. OPEN BROWSER
   → Go to https://supabase.com
   → Click "Start your project"
   → Sign up (2 min)
   
2. CREATE PROJECT
   → Name: gsma-ghana-dev
   → Region: Choose US or EU
   → Copy 3 keys from Settings > API (2 min)
   
3. UPDATE .env.local
   → Replace NEXT_PUBLIC_SUPABASE_URL
   → Replace NEXT_PUBLIC_SUPABASE_ANON_KEY
   → Replace SUPABASE_SERVICE_ROLE_KEY
   (1 min)
   
4. INITIALIZE DATABASE
   → Go to Supabase SQL Editor
   → Run: supabase/migrations/20250120090000_init.sql
   → Run: supabase/migrations/20250120091000_storage.sql
   → Run: supabase/migrations/20250120092000_projects_events_gallery.sql
   → Run: supabase/rls-policies.sql
   (3 min)
   
5. CREATE ADMIN USER
   Terminal: npm run create-admin
   (1 min)
   
6. START DEVELOPMENT
   Terminal: npm run dev
   → Visit http://localhost:3000/admin/login
   (instant)
```

**Total Time: ~10 minutes**

---

## 📋 Detailed Instructions by Option

### Option 1: Cloud Supabase Step-by-Step

**Step 1:** Create Supabase Account
```
1. Visit https://supabase.com
2. Click "Start your project" 
3. Sign up with email or GitHub
4. Create password
5. Check email for verification link
```

**Step 2:** Create Project
```
1. In Supabase dashboard, click "New Project"
2. Fill in:
   - Name: gsma-ghana-dev
   - Password: SecurePassword123!
   - Region: us-east-1 (closest to Africa)
3. Wait for project to initialize (2-3 min)
```

**Step 3:** Get API Keys
```
1. In project, click "Settings" (bottom left)
2. Click "API" 
3. Copy these 3 values:
   - Project URL (URL field) → NEXT_PUBLIC_SUPABASE_URL
   - Anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Service role key → SUPABASE_SERVICE_ROLE_KEY
```

**Step 4:** Update .env.local
```
Edit c:\Users\USER\Desktop\orchids-remix-of-gsma-ghana-official-website-main\.env.local

Replace these lines:
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Step 5:** Run Migrations
```
1. In Supabase, click "SQL Editor" (left sidebar)
2. Click "New Query"
3. Paste contents of: supabase/migrations/20250120090000_init.sql
4. Click "Run"
5. Repeat for the other 2 migration files and rls-policies.sql
```

**Step 6:** Create Admin
```
Terminal command:
npm run create-admin

When prompted:
Email: admin@gsma.org.gh
Password: (create strong one)
Name: Admin User
```

**Step 7:** Verify & Start
```
npm run verify-db
npm run dev

Then:
→ Open http://localhost:3000/admin/login
→ Login with your credentials
```

---

### Option 2: Docker Local Step-by-Step

**Step 1:** Create docker-compose.yml
```
Create file: docker-compose.yml in project root
Copy content from SETUP_OPTIONS.md docker-compose section
```

**Step 2:** Start Docker
```
docker-compose up -d

Wait 30 seconds for services to start
```

**Step 3:** Run Migrations
```
For Windows PowerShell:
psql -h 127.0.0.1 -U postgres -d postgres < supabase/migrations/20250120090000_init.sql

(Repeat for other migration files)
```

**Step 4:** Update .env.local
```
Replace in .env.local:
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=(from docker output or use default)
SUPABASE_SERVICE_ROLE_KEY=(from docker output or use default)
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

**Step 5:** Create Admin
```
npm run create-admin
```

**Step 6:** Verify & Start
```
npm run verify-db
npm run dev
```

---

## 🎯 QUICK DECISION TREE

```
Do you have internet connection?
  ├─ YES → Use Option 1 (Cloud Supabase)
  │       Fastest, easiest, recommended
  │
  └─ NO → Use Option 2 (Docker Local)
         More complex, but 100% offline

Do you already have Supabase running?
  └─ YES → Use Option 3 (Existing)
          Just need to update .env.local
```

---

## 📊 Comparison Table

| Aspect | Option 1 (Cloud) | Option 2 (Docker) | Option 3 (Existing) |
|--------|------------------|-------------------|---------------------|
| Setup Time | 5 min | 15 min | 2 min |
| Complexity | Easy | Medium | Easy |
| Offline | ❌ No | ✅ Yes | Depends |
| Production Ready | ✅ Same as prod | ⚠️ Different | ✅ Same as prod |
| Free | ✅ Yes | ✅ Yes | ✅ Yes |
| **Recommended** | **✅ YES** | ⚠️ If needed | Only if exists |

---

## 🆘 If Something Goes Wrong

### "Port already in use"
```bash
# Option 1: Doesn't have this issue (cloud)
# Option 2: Find and kill process using port
netstat -ano | findstr ":54321"
taskkill /PID <number> /F
```

### "Cannot connect to database"
```bash
# Option 1: Check Supabase project status
# Option 2: Ensure docker-compose still running
docker-compose ps

# All options: Verify .env.local has correct values
type .env.local
```

### "Admin login fails"
```bash
# Recreate admin user
npm run create-admin

# Verify user exists
npm run verify-db
```

---

## ✅ Success Indicators

After setup, you should be able to:

1. ✅ Access http://localhost:3000 (public site)
2. ✅ Login at http://localhost:3000/admin/login
3. ✅ See admin dashboard
4. ✅ Create content (news, projects, etc.)
5. ✅ Upload images
6. ✅ `npm run verify-db` shows all 8 tables

---

## 📞 Next Steps

**Choose your option above and follow the detailed steps.**

**If you get stuck, check:**
- [LOCAL_DATABASE_SETUP.md](./LOCAL_DATABASE_SETUP.md) - Detailed guide
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Verification
- [OFFLINE_SUPABASE.md](./OFFLINE_SUPABASE.md) - Technical details

**Or contact:** dev@gsma.org.gh

---

**Recommended for you: Option 1 (Cloud Supabase) - Takes ~10 minutes** ✅
