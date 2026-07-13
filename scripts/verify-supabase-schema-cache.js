const { loadEnvConfig } = require("@next/env");
const { createClient } = require("@supabase/supabase-js");

loadEnvConfig(process.cwd());

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase
    .from("news_posts")
    .select("id, image_caption, credit_note")
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  console.log("Verified Supabase API schema cache can read news_posts.credit_note.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
