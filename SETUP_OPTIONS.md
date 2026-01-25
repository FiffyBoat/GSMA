# 🗄️ Manual Local Database Setup (No CLI Required)

Since the Supabase CLI requires special installation, here's a manual approach using Docker directly.

## Quick Summary

Your current status:
- ✅ Docker: Installed (v29.1.3)
- ✅ Node.js: Installed (v24.13.0)
- ✅ npm: Installed (v11.6.2)
- ✅ .env.local: Exists
- ⚠️ Supabase CLI: Not available (optional workaround provided below)

---

## Option 1: Using Cloud Supabase (Recommended - Easiest)

Since the CLI is giving issues, I recommend using **cloud Supabase** for development instead:

### Step 1: Create Cloud Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up (email or GitHub)
4. Create new project:
   - Name: `gsma-ghana-dev`
   - Password: Create strong password
   - Region: Choose closest to Ghana (US or EU)

### Step 2: Get Connection Credentials
1. In Supabase console, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Update .env.local
Open `.env.local` and replace with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=super-secret-jwt-token-change-me
NODE_ENV=development
DATABASE_URL=https://your-project.supabase.co/rest/v1/
```

### Step 4: Deploy Database Schema

Go to Supabase SQL Editor and run each file:

1. **supabase/migrations/20250120090000_init.sql**
2. **supabase/migrations/20250120091000_storage.sql**
3. **supabase/migrations/20250120092000_projects_events_gallery.sql**
4. **supabase/rls-policies.sql**

Or in one command:

```bash
# Get connection string
# Replace with your actual values
psql "postgresql://postgres:[password]@db.supabase.co:5432/postgres" < supabase/migrations/20250120090000_init.sql
```

### Step 5: Create Admin User

Run this in Supabase SQL Editor:

```sql
INSERT INTO users (email, password_hash, is_admin, is_active)
VALUES (
  'admin@gsma.org.gh',
  '$2b$10$...',  -- bcrypt hash of your password
  true,
  true
);
```

Or use:
```bash
npm run create-admin
```

### Step 6: Start Development

```bash
npm run dev
```

Visit http://localhost:3000/admin/login

---

## Option 2: Use Local Docker + Manual Supabase

If you prefer local development, use Docker directly:

### Prerequisites
```bash
# These should already be installed
docker --version    # Should be 20+
npm --version      # Should be 9+
node --version     # Should be 18+
```

### Step 1: Create Docker Compose File

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: supabase/postgres:15.1.1.82
    container_name: gsma-postgres
    ports:
      - "54322:5432"
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  supabase-api:
    image: supabase/supabase:latest
    container_name: gsma-supabase-api
    depends_on:
      - postgres
    ports:
      - "54321:8000"
      - "54323:3000"
    environment:
      SUPABASE_URL: http://localhost:54321
      SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTUwMzk0ODAwMCwiZXhwIjoyNTAzOTQ4MDAwfQ.M4e4ZskxUVrJQ5NChv9qWWjKkGX3Z5wO5YiobCVjiqw
      SUPABASE_SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNTAzOTQ4MDAwLCJleHAiOjI1MDM5NDgwMDB9.M4e4ZskxUVrJQ5NChv9qWWjKkGX3Z5wO5YiobCVjiqw
      JWT_SECRET: super-secret-jwt-token-change-me-in-production
      POSTGRES_PASSWORD: postgres

volumes:
  postgres_data:
```

### Step 2: Start Containers

```bash
docker-compose up -d
```

Wait 30 seconds for services to start.

### Step 3: Initialize Database

Run migrations:

```bash
# Connect to postgres and run migrations
psql -h 127.0.0.1 -U postgres -d postgres < supabase/migrations/20250120090000_init.sql
psql -h 127.0.0.1 -U postgres -d postgres < supabase/migrations/20250120091000_storage.sql
psql -h 127.0.0.1 -U postgres -d postgres < supabase/migrations/20250120092000_projects_events_gallery.sql
```

### Step 4: Apply RLS Policies

```bash
psql -h 127.0.0.1 -U postgres -d postgres < supabase/rls-policies.sql
```

### Step 5: Update .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTUwMzk0ODAwMCwiZXhwIjoyNTAzOTQ4MDAwfQ.M4e4ZskxUVrJQ5NChv9qWWjKkGX3Z5wO5YiobCVjiqw
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNTAzOTQ4MDAwLCJleHAiOjI1MDM5NDgwMDB9.M4e4ZskxUVrJQ5NChv9qWWjKkGX3Z5wO5YiobCVjiqw
SUPABASE_JWT_SECRET=super-secret-jwt-token-change-me-in-production
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
NODE_ENV=development
```

### Step 6: Create Admin User

```bash
npm run create-admin
```

Or manually in psql:

```sql
INSERT INTO users (email, password_hash, is_admin, is_active)
VALUES ('admin@gsma.org.gh', '[bcrypt_hash]', true, true);
```

### Step 7: Verify Setup

```bash
npm run verify-db
```

### Step 8: Start Dev Server

```bash
npm run dev
```

---

## Option 3: Use Existing Supabase (If Already Running)

If you already have Supabase running somewhere:

1. **Get the connection details:**
   ```bash
   supabase status
   ```

2. **Update .env.local with those values**

3. **Run migrations:**
   ```bash
   npm run supabase:reset
   ```

4. **Verify:**
   ```bash
   npm run verify-db
   ```

---

## ✅ Verify Everything Works

After setup, run:

```bash
# Check all tables exist
npm run verify-db

# Start dev server
npm run dev

# In another terminal:
curl http://localhost:3000/api/health
```

---

## 📊 Current Status

| Item | Status | Action |
|------|--------|--------|
| Docker | ✅ v29.1.3 | Ready |
| Node.js | ✅ v24.13.0 | Ready |
| npm | ✅ v11.6.2 | Ready |
| .env.local | ✅ Exists | Use Option 1 or 2 |
| Supabase | ⚠️ Not ready | Choose Option 1, 2, or 3 |

---

## 🎯 RECOMMENDED APPROACH

**For you right now, I recommend Option 1 (Cloud Supabase)** because:

1. ✅ No CLI installation needed
2. ✅ Faster setup (5 minutes)
3. ✅ No port conflicts
4. ✅ Same functionality as local
5. ✅ Easy to migrate to production later
6. ✅ Free tier includes everything you need

---

## 📞 Need Help?

If something doesn't work:

1. Check [LOCAL_DATABASE_SETUP.md](./LOCAL_DATABASE_SETUP.md) for detailed steps
2. Check [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for verification
3. Check [OFFLINE_SUPABASE.md](./OFFLINE_SUPABASE.md) for Supabase details
4. Contact: dev@gsma.org.gh

---

**Last Updated:** January 2025
