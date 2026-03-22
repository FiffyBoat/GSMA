import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { normalizeSupabaseImageUrl } from "@/lib/storage-utils";

// PUT - Update assembly member
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

    const payload = {
      ...body,
      image_url: normalizeSupabaseImageUrl(body.image_url || ""),
    };

    const { data, error } = await supabase
      .from("assembly_members")
      .update(payload)
      .eq("id", id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Assembly member update error:", error);
    return NextResponse.json({ error: "Failed to update assembly member" }, { status: 500 });
  }
}

// DELETE - Delete assembly member
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
      .from("assembly_members")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assembly member deletion error:", error);
    return NextResponse.json({ error: "Failed to delete assembly member" }, { status: 500 });
  }
}
