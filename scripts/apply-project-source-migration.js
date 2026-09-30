const { loadEnvConfig } = require("@next/env");
const { Client } = require("pg");

loadEnvConfig(process.cwd());

const sql = `
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS project_source VARCHAR(30) NOT NULL DEFAULT 'assembly';

ALTER TABLE public.projects
DROP CONSTRAINT IF EXISTS projects_project_source_check;

ALTER TABLE public.projects
ADD CONSTRAINT projects_project_source_check
CHECK (project_source IN ('assembly', 'individual'));

CREATE INDEX IF NOT EXISTS idx_projects_project_source
ON public.projects(project_source);

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

  console.log("Applied project source column and requested schema cache reload.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
