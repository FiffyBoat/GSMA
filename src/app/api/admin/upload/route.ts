import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";

// Allowed MIME types used for validation and bucket configuration
const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const allowedVideoTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/3gpp",
  "video/3gpp2",
  "video/x-m4v",
];

const allowedMimeTypes = [...allowedImageTypes, ...allowedVideoTypes];

async function ensureWebsiteImagesBucket(supabase: Awaited<ReturnType<typeof createAdminSupabaseClient>>) {
  // Try to create the bucket if it's missing. If it already exists, Supabase will return an error
  // like "Bucket already exists", which we can safely ignore.
    const { error } = await supabase.storage.createBucket("website-images", {
      public: true,
      fileSizeLimit: 500 * 1024 * 1024, // 500MB for videos and images
      allowedMimeTypes,
    });

  if (error) {
    const msg = (error as any)?.message || String(error);
    if (!/already exists/i.test(msg)) {
      // Not an "already exists" error → surface it so the caller knows bucket creation failed.
      throw error;
    }
  }
}

export async function POST(request: Request) {
  const access = await requireAdminPermission("upload_media");
  if ("response" in access) {
    return access.response;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (images and videos). Accept any image/* or video/* MIME type.
    if (!file.type || (!file.type.startsWith("image/") && !file.type.startsWith("video/"))) {
      return NextResponse.json(
        { error: "Invalid file type. Only image or video files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB for images, 500MB for videos)
    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 500 * 1024 * 1024; // 500MB
    const isImage = allowedImageTypes.includes(file.type);
    const maxSize = isImage ? maxImageSize : maxVideoSize;

    if (file.size > maxSize) {
      const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
      return NextResponse.json(
        { error: `File size exceeds ${maxSizeMB}MB limit.` },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExt}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    let { data, error } = await supabase.storage
      .from("website-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      const msg = (error as any)?.message || String(error);
      // Self-heal: if the bucket isn't found (common when env points to a fresh/local Supabase),
      // create it and retry once.
      if (/bucket not found/i.test(msg)) {
        try {
          await ensureWebsiteImagesBucket(supabase);
          const retry = await supabase.storage
            .from("website-images")
            .upload(fileName, buffer, {
              contentType: file.type,
              upsert: false,
            });
          data = retry.data;
          error = retry.error;
        } catch (e) {
          console.error("Bucket create/retry failed:", e);
          return NextResponse.json(
            {
              error:
                "Storage bucket 'website-images' was not found and could not be created. " +
                "If you're using local Supabase, run `npx supabase stop` then `npx supabase start` (or `npm run supabase:reset`). " +
                "If you're using cloud Supabase, create a public bucket named 'website-images' in Storage.",
            },
            { status: 500 }
          );
        }
      }

      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
          {
            error:
              (error as any)?.message ||
              "Failed to upload file. Confirm `.env.local` points to the same Supabase instance where the bucket exists.",
          },
          { status: 500 }
        );
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: urlData.publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "An error occurred while uploading the file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const access = await requireAdminPermission("upload_media");
  if ("response" in access) {
    return access.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    let path = searchParams.get("path");

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // If path is a full URL, extract the path part
    if (path.includes("/storage/v1/object/public/website-images/")) {
      const urlParts = path.split("/website-images/");
      path = urlParts[1] || path;
    }

    const supabase = await createAdminSupabaseClient();
    // If the bucket is missing in this Supabase instance, create it so future uploads work.
    // Deleting a non-existent object will still fail gracefully if it doesn't exist.
    try {
      await ensureWebsiteImagesBucket(supabase);
    } catch {
      // ignore – delete will report its own error if needed
    }
    const { error } = await supabase.storage
      .from("website-images")
      .remove([path]);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the image" },
      { status: 500 }
    );
  }
}
