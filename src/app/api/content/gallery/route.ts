import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = createPublicServerSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");

  let query = supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  if (featured === "true") {
    query = query.eq("is_featured", true);
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
