import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
