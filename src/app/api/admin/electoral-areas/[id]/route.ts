import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// PUT - Update electoral area
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("electoral_areas")
      .update(body)
      .eq("id", params.id)
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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("electoral_areas")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Electoral area deletion error:", error);
    return NextResponse.json({ error: "Failed to delete electoral area" }, { status: 500 });
  }
}
