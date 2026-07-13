"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2, Plus, RefreshCw, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MultiImageUploadProps {
  values?: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  values = [],
  onChange,
  folder = "general",
  label = "Images",
  maxImages = 10,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

  const uploadImageFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error || `Failed to upload ${file.name}`);
    }

    return data.url as string;
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (values.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of acceptedFiles) {
        const url = await uploadImageFile(file);
        uploadedUrls.push(url);
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls]);
        toast.success(
          `${uploadedUrls.length} image${uploadedUrls.length === 1 ? "" : "s"} uploaded successfully`
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const replaceImage = async (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setReplacingIndex(index);

    try {
      const url = await uploadImageFile(file);
      const nextUrls = [...values];
      nextUrls[index] = url;
      onChange(nextUrls);
      toast.success("Image replaced successfully");
    } catch (error) {
      console.error("Replace error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      toast.error(errorMessage);
    } finally {
      setReplacingIndex(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxSize: 5 * 1024 * 1024,
    disabled: values.length >= maxImages || uploading || replacingIndex !== null,
  });

  const removeImage = (index: number) => {
    onChange(values.filter((_, currentIndex) => currentIndex !== index));
    toast.success("Image removed from album. Save to apply changes.");
  };

  const canAddMore = values.length < maxImages;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-500">
          {values.length} / {maxImages}
        </span>
      </div>

      {values.length > 0 ? (
        <div className="grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {values.map((url, index) => {
            const isReplacing = replacingIndex === index;

            return (
              <div key={`${url}-${index}`} className="group relative">
                <div className="aspect-square overflow-hidden rounded-[8px] border border-gray-200 bg-gray-50">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                {index === 0 ? (
                  <span className="absolute left-2 top-2 rounded-[6px] bg-[#8B0000] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Cover
                  </span>
                ) : null}

                <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading || replacingIndex !== null}
                      onChange={(event) => replaceImage(index, event)}
                    />
                    <span className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-white/95 px-2 py-1.5 text-[11px] font-medium text-gray-800 shadow-sm transition hover:bg-white">
                      {isReplacing ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                      Replace
                    </span>
                  </label>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-auto px-2 py-1.5 text-[11px]"
                    onClick={() => removeImage(index)}
                    disabled={uploading || replacingIndex !== null}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}

          {canAddMore ? (
            <div
              {...getRootProps()}
              className={`
                aspect-square rounded-[8px] border-2 border-dashed cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-[#8B0000] bg-[#8B0000]/5"
                    : "border-gray-300 hover:border-[#8B0000] hover:bg-gray-50"
                }
                flex flex-col items-center justify-center p-4
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-1 text-center">
                {uploading ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin text-[#8B0000]" />
                    <p className="text-xs text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Plus className="h-6 w-6 text-[#8B0000]" />
                    <p className="text-xs font-medium text-gray-700">Add more</p>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {values.length === 0 ? (
        <div
          {...getRootProps()}
          className={`
            max-w-3xl rounded-[8px] border-2 border-dashed cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-[#8B0000] bg-[#8B0000]/5"
                : "border-gray-300 hover:border-[#8B0000] hover:bg-gray-50"
            }
            flex flex-col items-center justify-center p-6
          `}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-[#8B0000]" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#8B0000]/10">
                <Upload className="h-6 w-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragActive ? "Drop images here" : "Click or drag to upload"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Multiple images supported | PNG, JPG, WEBP up to 5MB each
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Max {maxImages} images
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {values.length > 0 ? (
        <div className="rounded-[8px] border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <ImagePlus className="mt-0.5 h-3.5 w-3.5 text-[#8B0000]" />
            <span>
              Remove or replace any single image in this album. The first image is
              used as the cover image.
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
