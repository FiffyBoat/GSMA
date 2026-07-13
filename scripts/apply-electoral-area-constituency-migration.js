const { loadEnvConfig } = require("@next/env");
const { Client } = require("pg");

loadEnvConfig(process.cwd());

const sql = `
ALTER TABLE public.electoral_areas
ADD COLUMN IF NOT EXISTS constituency VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_electoral_areas_constituency
ON public.electoral_areas(constituency);

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

  console.log("Applied electoral area constituency column and requested schema cache reload.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
