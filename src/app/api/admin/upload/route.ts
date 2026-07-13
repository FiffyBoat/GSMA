import { createAdminSupabaseClient } from "@/lib/supabase/server";
import { requireAdminPermission } from "@/lib/admin-route-access";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";

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
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const watermarkImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const WATERMARK_LOGO_PATH = path.join(process.cwd(), "public", "logo.png");

function arraysMatch(left: string[] | null | undefined, right: string[]) {
  if (!left || left.length !== right.length) {
    return false;
  }

  return right.every((item) => left.includes(item));
}

async function ensureWebsiteImagesBucket(
  supabase: Awaited<ReturnType<typeof createAdminSupabaseClient>>
) {
  const desiredConfig = {
    public: true,
    fileSizeLimit: MAX_VIDEO_SIZE,
    allowedMimeTypes,
  };

  const { data: existingBucket, error: getBucketError } =
    await supabase.storage.getBucket("website-images");

  if (getBucketError) {
    const getBucketMessage =
      (getBucketError as any)?.message || String(getBucketError);

    if (!/not found|does not exist|404/i.test(getBucketMessage)) {
      throw getBucketError;
    }

    const { error } = await supabase.storage.createBucket(
      "website-images",
      desiredConfig
    );

    if (error) {
      const createBucketMessage = (error as any)?.message || String(error);
      if (!/already exists/i.test(createBucketMessage)) {
        throw error;
      }
    }

    return;
  }

  const currentLimit = Number(
    (existingBucket as any)?.fileSizeLimit ??
      (existingBucket as any)?.file_size_limit ??
      0
  );
  const currentAllowedMimeTypes =
    (existingBucket as any)?.allowedMimeTypes ??
    (existingBucket as any)?.allowed_mime_types ??
    null;
  const needsUpdate =
    existingBucket.public !== desiredConfig.public ||
    currentLimit !== desiredConfig.fileSizeLimit ||
    !arraysMatch(currentAllowedMimeTypes, desiredConfig.allowedMimeTypes);

  if (!needsUpdate) {
    return;
  }

  const { error } = await supabase.storage.updateBucket(
    "website-images",
    desiredConfig
  );

  if (error) {
    throw error;
  }
}

async function addLogoWatermark(buffer: Buffer, contentType: string) {
  if (!watermarkImageTypes.includes(contentType)) {
    return buffer;
  }

  try {
    const [imageMetadata, logoBuffer] = await Promise.all([
      sharp(buffer).metadata(),
      fs.readFile(WATERMARK_LOGO_PATH),
    ]);

    const imageWidth = imageMetadata.width;
    const imageHeight = imageMetadata.height;

    if (!imageWidth || !imageHeight) {
      return buffer;
    }

    const logoMetadata = await sharp(logoBuffer).metadata();
    const logoWidth = logoMetadata.width || 1;
    const logoHeight = logoMetadata.height || 1;
    const watermarkWidth = Math.min(
      Math.max(Math.round(imageWidth * 0.16), 72),
      180
    );
    const watermarkHeight = Math.round(watermarkWidth * (logoHeight / logoWidth));
    const margin = Math.max(Math.round(imageWidth * 0.035), 18);
    const top = Math.max(imageHeight - watermarkHeight - margin, margin);
    const left = Math.max(imageWidth - watermarkWidth - margin, margin);
    const logoBase64 = logoBuffer.toString("base64");
    const watermarkSvg = Buffer.from(`
      <svg width="${watermarkWidth}" height="${watermarkHeight}" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${logoBase64}" width="${watermarkWidth}" height="${watermarkHeight}" preserveAspectRatio="xMidYMid meet" opacity="0.72"/>
      </svg>
    `);

    const pipeline = sharp(buffer)
      .rotate()
      .composite([{ input: watermarkSvg, left, top }]);

    if (contentType === "image/png") {
      return pipeline.png({ quality: 90 }).toBuffer();
    }

    if (contentType === "image/webp") {
      return pipeline.webp({ quality: 88 }).toBuffer();
    }

    return pipeline.jpeg({ quality: 88, mozjpeg: true }).toBuffer();
  } catch (error) {
    console.error("Watermark processing failed:", error);
    return buffer;
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

    if (
      !file.type ||
      (!file.type.startsWith("image/") && !file.type.startsWith("video/"))
    ) {
      return NextResponse.json(
        { error: "Invalid file type. Only image or video files are allowed." },
        { status: 400 }
      );
    }

    const isImage = allowedImageTypes.includes(file.type);
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;

    if (file.size > maxSize) {
      const maxSizeMB = Math.floor(maxSize / (1024 * 1024));
      return NextResponse.json(
        { error: `File size exceeds ${maxSizeMB}MB limit.` },
        { status: 400 }
      );
    }

    const supabase = await createAdminSupabaseClient();
    await ensureWebsiteImagesBucket(supabase);

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const originalBuffer = Buffer.from(arrayBuffer);
    const buffer = isImage
      ? await addLogoWatermark(originalBuffer, file.type)
      : originalBuffer;

    let { data, error } = await supabase.storage
      .from("website-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      const msg = (error as any)?.message || String(error);

      if (/bucket not found|object exceeded the maximum allowed size/i.test(msg)) {
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
        } catch (bucketError) {
          console.error("Bucket create/retry failed:", bucketError);
          return NextResponse.json(
            {
              error:
                "Storage bucket 'website-images' could not be configured for larger uploads. " +
                "If you're using local Supabase, run `npx supabase stop` then `npx supabase start` (or `npm run supabase:reset`). " +
                "If you're using cloud Supabase, update the 'website-images' bucket file size limit in Storage.",
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

    if (path.includes("/storage/v1/object/public/website-images/")) {
      const urlParts = path.split("/website-images/");
      path = urlParts[1] || path;
    }

    const supabase = await createAdminSupabaseClient();

    try {
      await ensureWebsiteImagesBucket(supabase);
    } catch {
      // Ignore bucket config errors here and let delete report its own failure if needed.
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
