import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { equalsLooseText } from "@/lib/text-match";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const filtered = category
    ? (data || []).filter((project) => equalsLooseText(project.category, category))
    : data || [];

  return NextResponse.json({ data: filtered });
}
