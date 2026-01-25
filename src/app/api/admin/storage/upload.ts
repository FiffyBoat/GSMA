import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = await createAdminSupabaseClient();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!bucket) {
      return NextResponse.json({ error: "No bucket specified" }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, "-");
    const filename = `${timestamp}-${originalName}`;

    // Upload to storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, uint8Array, {
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
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename);

    return NextResponse.json({
      file_url: urlData.publicUrl,
      filename: filename,
      path: data?.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
