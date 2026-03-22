import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const access = await requireAdminPermission("manage_documents");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  try {
    let query = supabase
      .from("documents")
      .select("*")
      .order("uploaded_date", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const access = await requireAdminPermission("manage_documents");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();

  try {
    const body = await request.json();
    const { title, description, file_url, file_type, category, file_size, is_published } = body;

    if (!title || !file_url || !file_type || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("documents")
      .insert([
        {
          title,
          description,
          file_url,
          file_type,
          category,
          file_size: file_size || 0,
          is_published: is_published ?? true,
          uploaded_date: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const access = await requireAdminPermission("manage_documents");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();

  try {
    const body = await request.json();
    const { id, title, description, category, file_url, is_published } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("documents")
      .update({
        title,
        description,
        category,
        file_url,
        is_published,
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const access = await requireAdminPermission("manage_documents");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Document ID is required" },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from("documents")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
