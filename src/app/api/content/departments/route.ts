import { createPublicServerSupabaseClient } from "@/lib/supabase/public-server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const supabase = createPublicServerSupabaseClient();
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    let query = supabase
      .from("departments")
      .select("id, name, slug, head_name, head_title, head_image_url, description, contact_info, order")
      .eq("is_published", true)
      .order("order", { ascending: true });

    // If limit is specified, apply it (for home page preview)
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: departments, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch departments" },
        { status: 500 }
      );
    }

    return NextResponse.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
