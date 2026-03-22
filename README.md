# GSMA Ghana Official Website

A modern, full-featured website for the Ghana Metropolitan Assembly built with [Next.js](https://nextjs.org) and [Supabase](https://supabase.com).

## Features

### Public Website
- **Hero Slides** - Eye-catching homepage banner with image management
- **News & Updates** - Publish and manage news articles with featured images
- **Leadership Profiles** - Showcase assembly leadership with photos and bios
- **Project Gallery** - Display completed and ongoing projects
- **Event Management** - Announce and manage upcoming events
- **Document Library** - Organize and share official documents
- **Business Permits** - Stream-lined permit application system

### Admin Dashboard
Complete content management system with:
- **Drag-and-drop image upload** to Supabase Storage
- **Image preview** before publishing
- **Automatic image cleanup** when content is deleted
- **Role-based access control** (Admin/Moderator permissions)
- **Real-time content updates** across the website
- **Member management** for assembly members
- **Electoral area management**

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NODE_ENV=development
   ```

3. **Set up the database:**
   ```bash
   npm run verify-db
   ```

4. **Create an admin user:**
   ```bash
   npm run create-admin admin@gsma.gov.gh password "Admin Name"
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Access the website:**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

> For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)

## Available Scripts

```bash
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run create-admin     # Create a new admin user
npm run admin:manage     # Manage admin users
npm run verify-db        # Verify database setup
npm run backup-db        # Backup database
npm run migrate:assembly # Migrate assembly members data
npm run supabase:start   # Start local Supabase (requires CLI)
npm run supabase:stop    # Stop local Supabase
```

## Documentation

| Guide | Purpose |
|-------|---------|
| [Quick Start](./QUICK_START.md) | Get up and running in minutes |
| [Database Setup](./DATABASE_SETUP.md) | Detailed database configuration |
| [Storage Setup](./STORAGE_SETUP.md) | Configure image storage |
| [Admin Dashboard](./ADMIN_DASHBOARD_COMPLETE.md) | Admin panel features and usage |
| [Assembly Members](./ASSEMBLY_MEMBERS_GUIDE.md) | Managing assembly members |
| [Offline Database](./OFFLINE_SUPABASE.md) | Run Supabase locally |
| [Deployment](./DEPLOYMENT_GUIDE.md) | Production deployment guide |

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) with App Router
- **Database:** [Supabase](https://supabase.com) (PostgreSQL)
- **Storage:** Supabase Storage
- **UI Components:** Radix UI with Tailwind CSS
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Authentication:** Supabase Auth
- **Language:** TypeScript

## Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard pages
│   ├── api/                 # API routes
│   └── (public)/            # Public website pages
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   └── ...
├── lib/                     # Utility functions and helpers
├── hooks/                   # Custom React hooks
└── visual-edits/           # Visual editing features
```

## Environment Variables

Required variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application
NODE_ENV=development
```

## Common Tasks

### Adding New Admin Content
1. Log in to the admin dashboard at `/admin/login`
2. Navigate to the relevant section (News, Leadership, etc.)
3. Click "Add New" and fill in the details
4. Upload images using the drag-and-drop area
5. Click "Publish" to make changes live

### Backup Database
```bash
npm run backup-db
```

### Manage Admin Users
```bash
npm run admin:manage
```

## Troubleshooting

- **Database connection error?** Check your Supabase credentials in `.env.local`
- **Image upload failing?** Verify Supabase Storage is configured (see [STORAGE_SETUP.md](./STORAGE_SETUP.md))
- **Admin login not working?** Create a new admin user with `npm run create-admin`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## License

This project is proprietary software for the Ghana Metropolitan Assembly.

---

**Need help?** Check the [documentation index](./MASTER_DOCUMENTATION_INDEX.md) or refer to specific guides listed above.
