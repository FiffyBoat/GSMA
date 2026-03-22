import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";

// GET - Fetch all assembly members
export async function GET() {
  try {
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const supabase = await createAdminSupabaseClient();
    
    const { data, error } = await supabase
      .from("assembly_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(
      (data || []).map((member) => ({
        ...member,
        image_url: normalizeSupabaseImageUrl(member.image_url || ""),
      }))
    );
  } catch (error) {
    console.error("Assembly members fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch assembly members" }, { status: 500 });
  }
}

// POST - Create new assembly member
export async function POST(request: NextRequest) {
  try {
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const body = await request.json();
    const supabase = await createAdminSupabaseClient();

    const payload = {
      ...body,
      image_url: normalizeSupabaseImageUrl(body.image_url || ""),
    };

    const { data, error } = await supabase
      .from("assembly_members")
      .insert([payload])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Assembly member creation error:", error);
    return NextResponse.json({ error: "Failed to create assembly member" }, { status: 500 });
  }
}
