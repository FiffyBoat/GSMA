# 🗄️ Local Database Architecture & Setup

## Quick Visual Overview

```
Your Application Structure:
┌─────────────────────────────────────────────┐
│        GSMA Ghana Website                    │
│     (Next.js Frontend + Admin)               │
└────────────┬────────────────────────────────┘
             │
             ├─ (Public URLs)
             │  └─ http://localhost:3000
             │     • Homepage
             │     • News pages
             │     • Projects pages
             │     • Gallery pages
             │
             ├─ (Admin URLs)  
             │  └─ http://localhost:3000/admin
             │     • Dashboard
             │     • Content management
             │
             └─ (API Calls)
                └─ http://localhost:3000/api/*
                   • Authentication
                   • Content CRUD
                   • Image uploads

                        ↓ (Connects to)

┌─────────────────────────────────────────────┐
│        Supabase / PostgreSQL                 │
│     (Database + Storage)                     │
└────────────┬────────────────────────────────┘
             │
             ├─ Database Tables:
             │  ├─ users (admin accounts)
             │  ├─ news (news posts)
             │  ├─ projects (projects)
             │  ├─ events (events)
             │  ├─ gallery_items (gallery)
             │  ├─ hero_slides (homepage slides)
             │  ├─ leadership (staff)
             │  └─ content_logs (audit trail)
             │
             └─ Storage:
                └─ website-images bucket
                   (All uploaded images)
```

---

## Setup Options Comparison

### Option 1: Cloud Supabase
```
Your Computer (Windows)
├─ Next.js Dev Server (localhost:3000) ✅
├─ VS Code Editor ✅
└─ npm/Node.js ✅

         ↓ HTTPS

Supabase Cloud (supabase.co)
├─ PostgreSQL Database
├─ Authentication API
├─ Storage Bucket
└─ Backup/Monitoring
```

**Best for:**
- Quick setup
- Internet available
- Production-like environment
- Free tier sufficient

---

### Option 2: Docker Local
```
Your Computer (Windows)
├─ Next.js Dev Server (localhost:3000) ✅
├─ VS Code Editor ✅
├─ npm/Node.js ✅
│
└─ Docker Containers
   ├─ PostgreSQL (localhost:54322)
   ├─ Supabase API (localhost:54321)
   └─ Storage
```

**Best for:**
- Offline development
- Complete local control
- Learning Supabase
- No cloud data

---

### Option 3: Existing Supabase
```
Your Computer (Windows)
├─ Next.js Dev Server (localhost:3000) ✅
├─ VS Code Editor ✅
├─ npm/Node.js ✅
│
└─ Existing Supabase
   (Whatever configuration
    you already have running)
```

**Best for:**
- Reusing setup
- Already configured
- Minimal changes

---

## Database Schema Overview

### Users Table (Admin Accounts)
```sql
users
├─ id (UUID, Primary Key)
├─ email (String, Unique)
├─ password_hash (String, bcrypted)
├─ is_admin (Boolean)
├─ is_active (Boolean)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### News Table
```sql
news
├─ id (UUID, Primary Key)
├─ slug (String, Unique)
├─ title (String)
├─ content (Text)
├─ excerpt (Text)
├─ image_url (String)
├─ category (String)
├─ published (Boolean)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### Projects Table
```sql
projects
├─ id (UUID, Primary Key)
├─ slug (String, Unique)
├─ title (String)
├─ description (Text)
├─ status (String)
├─ budget (Decimal)
├─ start_date (Date)
├─ end_date (Date)
├─ image_url (String)
├─ department (String)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### Events Table
```sql
events
├─ id (UUID, Primary Key)
├─ title (String)
├─ description (Text)
├─ event_date (Date)
├─ start_time (Time)
├─ end_time (Time)
├─ venue (String)
├─ contact_person (String)
├─ contact_email (String)
├─ contact_phone (String)
├─ image_url (String)
├─ is_featured (Boolean)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### Gallery Items Table
```sql
gallery_items
├─ id (UUID, Primary Key)
├─ image_url (String)
├─ video_url (String, Optional)
├─ title (String)
├─ description (Text)
├─ category (String)
├─ display_order (Integer)
└─ created_at (Timestamp)
```

### Hero Slides Table
```sql
hero_slides
├─ id (UUID, Primary Key)
├─ image_url (String)
├─ title (String)
├─ subtitle (String)
├─ description (Text)
├─ display_order (Integer)
├─ is_active (Boolean)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### Leadership Table
```sql
leadership
├─ id (UUID, Primary Key)
├─ name (String)
├─ position (String)
├─ title (String)
├─ image_url (String)
├─ bio (Text)
├─ display_order (Integer)
├─ is_active (Boolean)
├─ created_at (Timestamp)
└─ updated_at (Timestamp)
```

### Content Logs Table (Audit Trail)
```sql
content_logs
├─ id (UUID, Primary Key)
├─ table_name (String)
├─ record_id (UUID)
├─ action (String)
├─ changes (JSON)
├─ created_by (UUID, Foreign Key to users)
└─ created_at (Timestamp)
```

---

## Setup Workflow

### Phase 1: Installation
```
npm install              ← Download packages
                         ← Downloads next.js, react, supabase, etc.
                         ← Creates node_modules/ folder
```

### Phase 2: Start Database
```
Option 1: supabase.com   ← Sign up → Create project → Get keys
Option 2: docker-compose ← docker-compose up -d → Wait 30s
Option 3: Existing       ← Get connection details
```

### Phase 3: Configuration
```
Create/Update .env.local ← Copy values from database
                         ← Tells app where database is
                         ← Specifies authentication keys
```

### Phase 4: Initialize
```
npm run supabase:reset   ← Drops old database (if exists)
                         ← Creates tables from migrations
                         ← Seeds sample data
                         ← Applies RLS policies
```

### Phase 5: Create Admin
```
npm run create-admin     ← Creates first admin user
                         ← Uses bcrypt for security
                         ← You can login after this
```

### Phase 6: Development
```
npm run dev              ← Starts Next.js dev server
                         ← Watches for file changes
                         ← Compiles on save
                         ← Available at localhost:3000
```

### Phase 7: Verify
```
npm run verify-db        ← Checks all 8 tables exist
                         ← Verifies database connection
                         ← Confirms RLS policies

curl .../api/health      ← Checks API is running
                         ← Confirms database responsive
                         ← Shows storage status
```

---

## Data Flow Diagram

### Public User Viewing News

```
1. Browser
   └─ GET http://localhost:3000/news
   
2. Next.js Server
   └─ Routes to src/app/news/page.tsx
   
3. Component fetches data
   └─ Calls Supabase (server-side)
   
4. Supabase Database
   └─ SELECT * FROM news WHERE published=true
   
5. Returns data
   └─ Sends JSON with 3-5 news posts
   
6. Component renders
   └─ Creates HTML with news posts
   
7. Browser displays
   └─ User sees formatted news page
```

### Admin Creating News Post

```
1. Admin loads dashboard
   └─ GET http://localhost:3000/admin
   
2. Admin fills form
   ├─ Title: "Breaking News"
   ├─ Content: "..."
   ├─ Category: "General"
   └─ Image: (uploads file)
   
3. Image upload
   └─ POST /api/admin/upload
   └─ Supabase Storage saves file
   └─ Returns image URL
   
4. Submit news form
   └─ POST /api/admin/news
   └─ Includes image URL
   
5. API validates
   ├─ Checks session valid
   ├─ Checks admin permission
   ├─ Validates data
   └─ Generates slug from title
   
6. Database insert
   └─ INSERT INTO news (title, content, slug, image_url, ...)
   
7. Response
   └─ API returns created post
   
8. UI updates
   └─ Shows success message
   └─ Clears form
   └─ Post visible in list
```

---

## Ports & URLs Reference

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| **Next.js Dev Server** | 3000 | http://localhost:3000 | Public website |
| **Admin Dashboard** | 3000 | http://localhost:3000/admin | Content management |
| **Supabase API** | 54321 | http://localhost:54321 | Database API |
| **Supabase Studio** | 54323 | http://localhost:54323 | Web UI (Option 2 only) |
| **PostgreSQL** | 54322 | localhost:54322 | Direct database (Option 2 only) |
| **Cloud Supabase** | 443 | https://project.supabase.co | Cloud API (Option 1) |

---

## Environment Variables Explained

```env
# Where the database is located
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
                         ↑                    ↑
                    Host name          Supabase port

# Public key for anonymous access (safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
                               ↑
                        JWT token for public queries

# Secret key for admin operations (KEEP SECRET!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
                          ↑
                   JWT token for server-side operations

# Secret for signing JWT tokens
SUPABASE_JWT_SECRET=super-secret-...
                    ↑
             Keep this very secret!

# Database connection string
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
             ↑          ↑        ↑         ↑                 ↑
          Protocol   User   Password  Host:Port         Database

# Environment type
NODE_ENV=development
        ↑
   dev / production
```

---

## Security Architecture

```
┌─────────────────────────────────────────────┐
│     Browser (Public User)                    │
│                                             │
│  Can access:                               │
│  • Anon Key (in client code)               │
│  • Public data only                        │
│  • Published news/projects/gallery         │
└────────────┬────────────────────────────────┘
             │ Uses: ANON_KEY
             ↓
┌─────────────────────────────────────────────┐
│     Supabase API                            │
│                                             │
│  Row Level Security (RLS)                  │
│  • Only published content visible         │
│  • Cannot modify/delete                    │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│     PostgreSQL Database                     │
│                                             │
│  All data stored with RLS policies         │
│  • Policies enforced at DB level          │
│  • Users see only allowed data             │
└─────────────────────────────────────────────┘


┌─────────────────────────────────────────────┐
│     Next.js Server (Admin)                  │
│                                             │
│  Can access:                               │
│  • Service Role Key (in env vars)         │
│  • All data (admin operations)             │
│  • Create/edit/delete content              │
└────────────┬────────────────────────────────┘
             │ Uses: SERVICE_ROLE_KEY (secret)
             ↓
┌─────────────────────────────────────────────┐
│     Supabase API (Admin)                    │
│                                             │
│  No RLS restrictions                       │
│  • Can modify any data                     │
│  • Admin-only operations                   │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│     PostgreSQL Database                     │
│                                             │
│  All data accessible to server             │
│  • Used for admin operations               │
│  • Backed up regularly                     │
└─────────────────────────────────────────────┘
```

---

## Migration Files

When you initialize the database, these files are applied:

### Migration 1: `20250120090000_init.sql`
Creates core tables:
- users
- news
- projects
- events
- leadership
- content_logs

### Migration 2: `20250120091000_storage.sql`
Creates:
- gallery_items
- Storage bucket configuration
- RLS policies for storage

### Migration 3: `20250120092000_projects_events_gallery.sql`
Creates:
- hero_slides
- Additional indexes
- Final RLS policies

### RLS Policies: `rls-policies.sql`
Applied after migrations:
- Read policies (public can see published)
- Write policies (only admin with service key)
- Delete policies (protected)

---

## File Locations You'll Need

```
Project Root
│
├─ .env.local                    ← Edit this with API keys
├─ package.json                  ← npm scripts
├─ next.config.ts               ← Next.js configuration
│
├─ src/
│  ├─ app/
│  │  ├─ page.tsx               ← Homepage
│  │  ├─ admin/login/page.tsx    ← Admin login
│  │  └─ api/admin/             ← API routes
│  │     ├─ login/              ← Login endpoint
│  │     ├─ news/               ← News CRUD
│  │     ├─ projects/           ← Projects CRUD
│  │     ├─ events/             ← Events CRUD
│  │     ├─ gallery/            ← Gallery CRUD
│  │     └─ upload/             ← Image upload
│  │
│  ├─ lib/
│  │  ├─ auth.ts                ← Authentication logic
│  │  └─ supabase/              ← Database clients
│  │
│  └─ components/
│     └─ admin/                 ← Dashboard components
│
├─ supabase/
│  ├─ config.toml               ← Supabase config
│  ├─ migrations/               ← Database migrations
│  │  ├─ 20250120090000_init.sql
│  │  ├─ 20250120091000_storage.sql
│  │  └─ 20250120092000_projects_events_gallery.sql
│  ├─ schema.sql               ← Database schema
│  ├─ rls-policies.sql         ← Security policies
│  └─ seed.sql                 ← Sample data
│
├─ scripts/
│  ├─ create-admin-user.js     ← Create admin user
│  ├─ verify-setup.js          ← Verify database
│  └─ backup-db.js             ← Backup database
│
└─ SETUP_DECISION_GUIDE.md     ← Read this first!
```

---

**Next Steps: Read SETUP_DECISION_GUIDE.md to choose your database option →**
