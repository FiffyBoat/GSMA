import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { deleteImage } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const access = await requireAdminPermission("manage_slides");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const access = await requireAdminPermission("manage_slides");
  if ("response" in access) {
    return access.response;
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .insert({
      image_url: body.image_url,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
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
  const access = await requireAdminPermission("manage_slides");
  if ("response" in access) {
    return access.response;
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .update({
      image_url: body.image_url,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
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
  const access = await requireAdminPermission("manage_slides");
  if ("response" in access) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Get the slide first to retrieve image URL
  const { data: slide } = await supabase
    .from("hero_slides")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete image from storage if it exists
  if (slide?.image_url) {
    await deleteImage(slide.image_url);
  }

  const { error } = await supabase.from("hero_slides").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
