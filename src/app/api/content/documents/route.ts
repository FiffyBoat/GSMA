import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { equalsLooseText, includesLooseText } from "@/lib/text-match";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(request: Request) {
  const supabase = createPublicServerSupabaseClient();
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("is_published", true)
      .order("uploaded_date", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const filtered = category
      ? (data || []).filter(
          (document) =>
            equalsLooseText(document.category, category) ||
            includesLooseText(document.title, category) ||
            includesLooseText(document.description, category)
        )
      : data || [];

    return NextResponse.json({ data: filtered });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
