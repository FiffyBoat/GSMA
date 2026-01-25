import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET - Fetch all assembly members
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data, error } = await supabase
      .from("assembly_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Assembly members fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch assembly members" }, { status: 500 });
  }
}

// POST - Create new assembly member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("assembly_members")
      .insert([body])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Assembly member creation error:", error);
    return NextResponse.json({ error: "Failed to create assembly member" }, { status: 500 });
  }
}
