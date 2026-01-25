# Database Migration & RLS Setup Guide

This guide explains how to set up Row Level Security (RLS) policies and migrate your database.

## What is Row Level Security (RLS)?

RLS is a security feature in PostgreSQL/Supabase that controls access to data at the row level. It ensures:
- Only authenticated admins can modify content
- Public users can still view public data
- Service role (backend) can perform admin operations

## Setup Instructions

### Step 1: Apply Base Schema (REQUIRED - Do This First)

If you haven't already set up your database, run:

```bash
npm run supabase:reset
```

This applies the core schema and tables from `supabase/migrations/`.

### Step 2: Enable RLS Policies

#### For Local Supabase (Offline):

1. Run migrations:
```bash
npm run supabase:reset
```

The RLS policies should be automatically applied (check `supabase/migrations/rls-policies.sql` if needed).

#### For Cloud Supabase:

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of `supabase/rls-policies.sql`
5. Click **Run** to apply the policies
6. Verify in **Authentication** → **Policies** that policies were created

### Step 3: Verify RLS is Enabled

You can verify RLS is working by checking the Supabase dashboard:

1. Go to **Database** → **Tables**
2. Click on a table (e.g., `admin_users`)
3. Click the **RLS** button in the top right
4. You should see the policies listed

## How RLS Works in This Project

### Admin Operations:
- **Create**: Only authenticated users can insert new content
- **Read**: Authenticated users can fetch their own data; service_role can fetch all
- **Update**: Only authenticated users can update content they own
- **Delete**: Only authenticated users can delete content

### Public Data:
- **Read**: Anyone can view public content (hero slides, news, leadership, etc.)
- **Write**: Only authenticated users can modify

## API Route Auth Flow

1. Frontend calls `/api/admin/*` route
2. Route calls `verifySession()` to check JWT token
3. Session is verified using JWT secret from `SUPABASE_SERVICE_ROLE_KEY`
4. If valid, route uses `createAdminSupabaseClient()` which includes service_role key
5. Service role bypasses RLS and can access all data
6. Database RLS policies provide additional protection layer

## Environment Variables Needed

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321  (local) or https://...supabase.co (cloud)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NODE_ENV=development
```

⚠️ **Important**: Never commit `SUPABASE_SERVICE_ROLE_KEY` to version control!

## Testing RLS

To test if RLS is working:

1. Create a news post via the admin panel
2. The post should be visible on the homepage (public read access)
3. Try accessing the database directly without proper auth - you should be denied
4. Only the admin API route (with service role key) should be able to modify it

## Troubleshooting

### "RLS policy violated" Error
- Check that `SUPABASE_SERVICE_ROLE_KEY` is correctly set in `.env.local`
- Ensure the key is the **service_role** key, not the anon key
- Verify RLS policies were applied to all tables

### "No rows returned" After Adding RLS
- RLS may have been applied incorrectly
- Go to SQL Editor and run: `SELECT * FROM admin_users;`
- If using service_role key in the session, it should return data
- If not, check policy conditions

### Public Data Not Visible
- Verify the SELECT policy allows `true` (public access)
- Check that the policy is applied to the correct table
- Run a test query in SQL Editor without auth to verify

## Next Steps

1. ✅ Set up RLS policies (this guide)
2. Add admin user management UI
3. Add password reset functionality
4. Set up proper logging and monitoring
5. Configure backup and disaster recovery

## Learn More

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL SECURITY DEFINER](https://www.postgresql.org/docs/current/sql-createfunction.html)
- [Supabase Policies Best Practices](https://supabase.com/docs/guides/database/postgres/row-level-security)
