import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const access = await requireAdminPermission("upload_media");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "documents";

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const extension = file.name.split(".").pop();
    const filename = `${timestamp}-${random}.${extension}`;
    const filepath = `${folder}/${filename}`;

    // Upload file to Supabase Storage
    const bytes = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filepath, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from("documents")
      .getPublicUrl(data.path);

    return NextResponse.json(
      {
        url: publicData.publicUrl,
        path: data.path,
        filename: filename,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const access = await requireAdminPermission("upload_media");
  if ("response" in access) {
    return access.response;
  }

  const supabase = await createAdminSupabaseClient();
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "No path provided" },
      { status: 400 }
    );
  }

  try {
    // Extract path from full URL if needed
    let filePath = path;
    if (path.includes("/storage/v1/object/public/documents/")) {
      filePath = path.split("/storage/v1/object/public/documents/")[1];
    }

    const { error } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (error) {
      console.error("Storage delete error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete file" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete file" },
      { status: 500 }
    );
  }
}
