import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";

// PUT - Update electoral area
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = await createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("electoral_areas")
      .update(body)
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Electoral area update error:", error);
    return NextResponse.json({ error: "Failed to update electoral area" }, { status: 500 });
  }
}

// DELETE - Delete electoral area
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const access = await requireAdminPermission("manage_assembly");
    if ("response" in access) {
      return access.response;
    }

    const { id } = await params;
    const supabase = await createAdminSupabaseClient();

    const { error } = await supabase
      .from("electoral_areas")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Electoral area deletion error:", error);
    return NextResponse.json({ error: "Failed to delete electoral area" }, { status: 500 });
  }
}
