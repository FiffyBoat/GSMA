import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// PUT - Update assembly member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("assembly_members")
      .update(body)
      .eq("id", params.id)
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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from("assembly_members")
      .delete()
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Assembly member deletion error:", error);
    return NextResponse.json({ error: "Failed to delete assembly member" }, { status: 500 });
  }
}
