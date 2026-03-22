import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { buildManagedSiteSettingsMap } from "./site-settings";

export async function loadPublicSiteSettings() {
  const supabase = createPublicServerSupabaseClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  return buildManagedSiteSettingsMap(data ?? []);
}
