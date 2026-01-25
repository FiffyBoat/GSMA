# Offline Local Database (Supabase CLI)

You can run the full database **locally** (offline) using the Supabase CLI + Docker, and point this app at `localhost`.

## Requirements (one-time)

- Docker Desktop installed and running
- Supabase CLI installed

Install Supabase CLI (Windows):

```bash
npm i -g supabase
```

## Start local Supabase (offline)

From the project root:

```bash
npm run supabase:start
```

This starts local services and prints local credentials.

Useful:

```bash
npm run supabase:status
npm run supabase:stop
```

## Apply schema + seed data

This repo includes:
- `supabase/migrations/20260120_000001_init.sql` (schema)
- `supabase/seed.sql` (optional sample data)

To wipe and recreate the local database (and re-run migrations/seed):

```bash
npm run supabase:reset
```

## Configure the app to use local Supabase

Create `.env.local` in the project root with the values printed by `supabase start`.

You will set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Typical local values look like:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_LOCAL_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_LOCAL_SERVICE_ROLE_KEY
NODE_ENV=development
```

## Run the app

```bash
npm run dev
```

Admin panel:
- `http://localhost:3000/admin/login`

## Notes

- Once Docker images are downloaded, you can run this **without internet**.
- The admin APIs use `SUPABASE_SERVICE_ROLE_KEY`, so keep your local `.env.local` private.

