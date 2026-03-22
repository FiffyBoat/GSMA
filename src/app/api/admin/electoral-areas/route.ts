import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";

// GET - Fetch all electoral areas
export async function GET() {
  try {
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const supabase = await createAdminSupabaseClient();
    
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
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const body = await request.json();
    const supabase = await createAdminSupabaseClient();

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
