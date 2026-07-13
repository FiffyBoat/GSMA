const { loadEnvConfig } = require("@next/env");
const { Client } = require("pg");

loadEnvConfig(process.cwd());

const sql = `
ALTER TABLE public.news_posts ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE public.news_posts ADD COLUMN IF NOT EXISTS credit_note TEXT;

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS credit_note TEXT;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS credit_note TEXT;

ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS image_caption TEXT;
ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS credit_note TEXT;

SELECT pg_notify('pgrst', 'reload schema');
`;

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  await client.query(sql);
  await client.end();

  console.log("Applied caption/credit columns and requested schema cache reload.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
