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
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

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
    .from("events")
    .insert({
      title: body.title,
      slug: getSlug(body.title, body.slug),
      description: body.description,
      content: body.content,
      image_url: body.image_url,
      event_type: body.event_type,
      start_date: body.start_date,
      end_date: body.end_date,
      location: body.location,
      venue: body.venue,
      organizer: body.organizer,
      contact_person: body.contact_person,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      is_featured: body.is_featured || false,
      is_published: body.is_published !== undefined ? body.is_published : true,
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
    .from("events")
    .update({
      title: body.title,
      slug: body.slug,
      description: body.description,
      content: body.content,
      image_url: body.image_url,
      event_type: body.event_type,
      start_date: body.start_date,
      end_date: body.end_date,
      location: body.location,
      venue: body.venue,
      organizer: body.organizer,
      contact_person: body.contact_person,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      is_featured: body.is_featured,
      is_published: body.is_published,
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

  // Get the event first to retrieve image URL
  const { data: event } = await supabase
    .from("events")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete image from storage if it exists
  if (event?.image_url) {
    await deleteImage(event.image_url);
  }

  // Delete the event
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
