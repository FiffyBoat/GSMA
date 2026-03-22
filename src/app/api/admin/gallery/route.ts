import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { deleteImage } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const access = await requireAdminPermission("manage_gallery");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const access = await requireAdminPermission("manage_gallery");
  if ("response" in access) {
    return access.response;
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  // Handle both single image_url and multiple images array
  const images = body.images || (body.image_url ? [body.image_url] : []);
  const featuredImage = body.image_url || images[0] || null;

  // Validate that we have at least one image or video
  if (!featuredImage && !body.video_url) {
    return NextResponse.json(
      { error: "Gallery item must have either an image or video URL" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("gallery_items")
    .insert({
      title: body.title,
      description: body.description,
      image_url: featuredImage || "", // Ensure non-null string
      images: images, // All images array
      video_url: body.video_url,
      category: body.category || "general",
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
  const access = await requireAdminPermission("manage_gallery");
  if ("response" in access) {
    return access.response;
  }

  const body = await request.json();
  const supabase = await createAdminSupabaseClient();

  // Handle both single image_url and multiple images array
  const images = body.images || (body.image_url ? [body.image_url] : []);
  const featuredImage = body.image_url || images[0] || null;

  // Validate that we have at least one image or video
  if (!featuredImage && !body.video_url) {
    return NextResponse.json(
      { error: "Gallery item must have either an image or video URL" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("gallery_items")
    .update({
      title: body.title,
      description: body.description,
      image_url: featuredImage || "", // Ensure non-null string
      images: images, // All images array
      video_url: body.video_url,
      category: body.category,
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
  const access = await requireAdminPermission("manage_gallery");
  if ("response" in access) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Get the gallery item first to retrieve image URLs
  const { data: item } = await supabase
    .from("gallery_items")
    .select("image_url, images, video_url")
    .eq("id", id)
    .single();

  // Delete images from storage - handle both old single image_url and new images array
  const imagesToDelete = [];
  if (item?.image_url) imagesToDelete.push(item.image_url);
  if (item?.images && Array.isArray(item.images)) {
    imagesToDelete.push(...item.images);
  }

  // Remove duplicates
  const uniqueImagesToDelete = [...new Set(imagesToDelete)];
  
  for (const imageUrl of uniqueImagesToDelete) {
    if (imageUrl) {
      await deleteImage(imageUrl);
    }
  }

  // Delete the gallery item
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
