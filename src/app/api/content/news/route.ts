import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : undefined;

  if (slug) {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ data });
  }

  let query = supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_date", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
