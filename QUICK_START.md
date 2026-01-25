# Quick Start Guide

Get your GSMA Ghana website up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** > **API** and copy your credentials

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NODE_ENV=development
```

### 4. Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** to create all tables

### 5. Create Admin User

```bash
npm run create-admin admin@gsma.gov.gh yourpassword "Admin Name"
```

Copy the generated SQL and run it in Supabase SQL Editor, or use the hash directly.

### 6. Verify Setup

```bash
npm run verify-db
```

This will check that all tables exist and are accessible.

### 7. Start Development Server

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:3000` to see the website, and `http://localhost:3000/admin/login` for the admin panel.

## Troubleshooting

- **Database connection errors**: Verify your `.env.local` file has the correct Supabase credentials
- **Table not found**: Make sure you ran the `schema.sql` file completely
- **Can't login**: Ensure you created an admin user and used the correct email/password

## Next Steps

- Add sample data by running `supabase/seed.sql` in Supabase SQL Editor
- Customize the site settings through the admin panel
- Add your first news post, hero slide, or leadership member

For detailed information, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)
