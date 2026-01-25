# Database Setup Guide

This guide will help you set up the local database for the GSMA Ghana Official Website.

## Prerequisites

1. A Supabase account (free tier works fine)
2. Node.js installed on your machine
3. npm or bun package manager

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `gsma-ghana-website`
   - Database Password: (choose a strong password and save it)
   - Region: Choose the closest region
5. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role** key (this is your `SUPABASE_SERVICE_ROLE_KEY` - keep this secret!)

## Step 3: Set Up Environment Variables

1. Create a `.env.local` file in the root directory of the project
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NODE_ENV=development
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Run the Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute the SQL
5. Verify that all tables were created by checking the **Table Editor** section

## Step 5: Create an Admin User

You have two options:

### Option A: Using the Script (Recommended)

1. Run the script to generate a password hash:
```bash
node scripts/create-admin-user.js admin@gsma.gov.gh your-password "Admin Name"
```

2. Copy the generated SQL INSERT statement
3. Go to Supabase SQL Editor and run the INSERT statement

### Option B: Manual Creation

1. Generate a password hash using Node.js:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-password', 10);
console.log(hash);
```

2. In Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@gsma.gov.gh', 'your-generated-hash', 'Administrator');
```

## Step 6: (Optional) Add Sample Data

If you want to populate the database with sample data for testing:

1. Go to Supabase SQL Editor
2. Copy and paste the contents of `supabase/seed.sql`
3. Click "Run"

## Step 7: Verify Setup

1. Start your development server:
```bash
npm run dev
# or
bun run dev
```

2. Navigate to `http://localhost:3000/admin/login`
3. Log in with your admin credentials
4. You should see the admin dashboard

## Database Tables

The following tables are created:

- **admin_users** - Stores admin user accounts
- **hero_slides** - Hero slider images and content for the homepage
- **news_posts** - News articles and blog posts
- **leadership** - Leadership team members
- **site_settings** - Site-wide configuration settings

## Troubleshooting

### Connection Issues

- Verify your `.env.local` file has the correct Supabase URL and keys
- Make sure your Supabase project is active (not paused)
- Check that you're using the correct keys (anon vs service_role)

### Authentication Errors

- Ensure the `admin_users` table exists and has at least one user
- Verify the password hash was generated correctly
- Check that the email matches exactly (case-insensitive)

### Table Not Found Errors

- Make sure you ran the `schema.sql` file completely
- Check the Supabase Table Editor to verify tables exist
- Ensure you're connected to the correct Supabase project

## Security Notes

- **NEVER** commit your `.env.local` file to version control
- The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges - keep it secret
- Change the default admin password immediately after setup
- Use strong passwords for admin accounts

## Local Development with Supabase CLI (Alternative)

If you prefer to run Supabase locally:

1. Install Supabase CLI: `npm install -g supabase`
2. Initialize: `supabase init`
3. Start local instance: `supabase start`
4. Use the local credentials provided by the CLI in your `.env.local`

For more information, see: [https://supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)
