This is a [Next.js](https://nextjs.org) project for the GSMA Ghana Official Website, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Quick Start

**For a complete setup guide, see [QUICK_START.md](./QUICK_START.md)**

### Prerequisites

- Node.js 18+ 
- A Supabase account (free tier works)

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NODE_ENV=development
   ```

3. **Set up the database:**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run `supabase/schema.sql` in Supabase SQL Editor
   - Create an admin user: `npm run create-admin admin@gsma.gov.gh password "Admin Name"`

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Verify setup:**
   ```bash
   npm run verify-db
   ```

Open [http://localhost:3000](http://localhost:3000) to see the website, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

## Admin Panel

The admin panel provides a full content management system for:
- **Hero slides management** - Upload and manage homepage hero images
- **News posts** - Create and publish news articles with images
- **Leadership team** - Manage leadership profiles with photos
- **Site settings** - Configure site-wide settings

### Features:
- **Image Upload**: Drag-and-drop or click to upload images directly from your device
- **Image Preview**: See image previews before saving
- **Automatic Cleanup**: Images are automatically deleted when content is removed
- **Organized Storage**: Images are organized by type (hero-slides, news, leadership)

Access it at `/admin/login` after creating an admin user.

**Note**: Make sure to set up Supabase Storage for image uploads. See [STORAGE_SETUP.md](./STORAGE_SETUP.md) for instructions.

## Documentation

- [Quick Start Guide](./QUICK_START.md) - Get started in minutes
- [Database Setup Guide](./DATABASE_SETUP.md) - Detailed database setup instructions
- [Offline Local Supabase](./OFFLINE_SUPABASE.md) - Run the database locally (offline) using Supabase CLI

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
