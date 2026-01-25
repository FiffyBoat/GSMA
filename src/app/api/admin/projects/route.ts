import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/auth";
import { getSlug } from "@/lib/content-utils";
import { deleteImage } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
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
    .from("projects")
    .insert({
      title: body.title,
      slug: getSlug(body.title, body.slug),
      description: body.description,
      content: body.content,
      image_url: body.image_url,
      category: body.category || "ongoing",
      status: body.status,
      start_date: body.start_date,
      end_date: body.end_date,
      budget: body.budget,
      location: body.location,
      contractor: body.contractor,
      progress_percentage: body.progress_percentage || 0,
      is_featured: body.is_featured || false,
      display_order: body.display_order || 0,
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
    .from("projects")
    .update({
      title: body.title,
      slug: getSlug(body.title, body.slug),
      description: body.description,
      content: body.content,
      image_url: body.image_url,
      category: body.category,
      status: body.status,
      start_date: body.start_date,
      end_date: body.end_date,
      budget: body.budget,
      location: body.location,
      contractor: body.contractor,
      progress_percentage: body.progress_percentage,
      is_featured: body.is_featured,
      display_order: body.display_order,
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

  // Get the project first to retrieve image URL
  const { data: project } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete image from storage if it exists
  if (project?.image_url) {
    await deleteImage(project.image_url);
  }

  // Delete the project
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
