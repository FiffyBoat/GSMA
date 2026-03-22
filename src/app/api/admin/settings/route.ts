import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";

interface SettingsPayloadItem {
  key?: string;
  value?: string;
  type?: string;
}

export async function GET() {
  const access = await requireAdminPermission("manage_settings");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const access = await requireAdminPermission("manage_settings");
  if ("response" in access) {
    return access.response;
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();
  const settingsToSave = Array.isArray(body.settings)
    ? (body.settings as SettingsPayloadItem[])
    : [body as SettingsPayloadItem];

  const payload = settingsToSave
    .map((setting) => {
      const key = typeof setting.key === "string" ? setting.key.trim() : "";

      if (!key) {
        return null;
      }

      return {
        key,
        value: typeof setting.value === "string" ? setting.value : "",
        type: typeof setting.type === "string" ? setting.type : "text",
        updated_at: new Date().toISOString(),
      };
    })
    .filter(
      (
        setting
      ): setting is {
        key: string;
        value: string;
        type: string;
        updated_at: string;
      } => Boolean(setting)
    );

  if (payload.length === 0) {
    return NextResponse.json(
      { error: "At least one valid setting is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("site_settings")
    .upsert(payload, { onConflict: "key" })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
