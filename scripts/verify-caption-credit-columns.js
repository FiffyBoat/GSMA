const { loadEnvConfig } = require("@next/env");
const { Client } = require("pg");

loadEnvConfig(process.cwd());

const expectedColumns = [
  "news_posts.image_caption",
  "news_posts.credit_note",
  "events.image_caption",
  "events.credit_note",
  "projects.image_caption",
  "projects.credit_note",
  "gallery_items.image_caption",
  "gallery_items.credit_note",
];

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  const result = await client.query(
    `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = ANY($1)
        AND column_name = ANY($2)
      ORDER BY table_name, column_name
    `,
    [
      ["news_posts", "events", "projects", "gallery_items"],
      ["image_caption", "credit_note"],
    ]
  );
  await client.end();

  const found = new Set(
    result.rows.map((row) => `${row.table_name}.${row.column_name}`)
  );
  const missing = expectedColumns.filter((column) => !found.has(column));

  if (missing.length > 0) {
    throw new Error(`Missing columns: ${missing.join(", ")}`);
  }

  console.log("Verified caption/credit columns exist.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
