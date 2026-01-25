import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const upcoming = searchParams.get("upcoming");
  const limit = searchParams.get("limit");

  let query = supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: true });

  if (upcoming === "true") {
    query = query.gte("start_date", new Date().toISOString());
  }

  if (limit) {
    query = query.limit(parseInt(limit));
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
