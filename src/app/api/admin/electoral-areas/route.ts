import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET - Fetch all electoral areas
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from("electoral_areas")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Electoral areas fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch electoral areas" }, { status: 500 });
  }
}

// POST - Create new electoral area
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("electoral_areas")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Electoral area creation error:", error);
    return NextResponse.json({ error: "Failed to create electoral area" }, { status: 500 });
  }
}
