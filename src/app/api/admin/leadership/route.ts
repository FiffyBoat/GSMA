import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/auth";
import { deleteImage } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("leadership")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("leadership")
    .insert({
      name: body.name,
      position: body.position,
      title: body.title,
      image_url: body.image_url,
      bio: body.bio,
      department: body.department,
      display_order: body.display_order,
      is_active: body.is_active,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("leadership")
    .update({
      name: body.name,
      position: body.position,
      title: body.title,
      image_url: body.image_url,
      bio: body.bio,
      department: body.department,
      display_order: body.display_order,
      is_active: body.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Get the leadership record first to retrieve image URL
  const { data: leader } = await supabase
    .from("leadership")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete image from storage if it exists
  if (leader?.image_url) {
    await deleteImage(leader.image_url);
  }

  const { error } = await supabase.from("leadership").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
