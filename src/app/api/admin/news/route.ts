import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { getSlug } from "@/lib/content-utils";
import { deleteImage } from "@/lib/storage-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const access = await requireAdminPermission("manage_news");
  if ("response" in access) {
    return access.response;
  }

  try {
    const supabase = await createAdminSupabaseClient();
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("published_date", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const access = await requireAdminPermission("manage_news");
  if ("response" in access) {
    return access.response;
  }
  const session = access.session;

  try {
    const body = await request.json();
    const supabase = await createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("news_posts")
      .insert({
        slug: getSlug(body.title, body.slug),
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        image_url: body.image_url,
        published_date: body.published_date,
        is_published: body.is_published,
        tags: body.tags || [],
        posted_by: session.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const access = await requireAdminPermission("manage_news");
  if ("response" in access) {
    return access.response;
  }

  try {
    const body = await request.json();
    const supabase = await createAdminSupabaseClient();

    const { data, error } = await supabase
      .from("news_posts")
      .update({
        slug: getSlug(body.title, body.slug),
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        image_url: body.image_url,
        published_date: body.published_date,
        is_published: body.is_published,
        tags: body.tags || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const access = await requireAdminPermission("manage_news");
  if ("response" in access) {
    return access.response;
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Get the post first to retrieve image URL
  const { data: post } = await supabase
    .from("news_posts")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete image from storage if it exists
  if (post?.image_url) {
    await deleteImage(post.image_url);
  }

  // Delete the post
  const { error } = await supabase.from("news_posts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
