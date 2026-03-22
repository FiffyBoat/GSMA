"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

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
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [previews, setPreviews] = useState<{ [key: string]: string }>(
    values.reduce((acc, url, idx) => {
      acc[`existing-${idx}`] = url;
      return acc;
    }, {} as { [key: string]: string })
  );

  const onDrop = async (acceptedFiles: File[]) => {
    if (values.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

      // Create previews for all files
      const newPreviews = { ...previews };
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        const fileKey = `new-${Date.now()}-${Math.random()}`;
        reader.onloadend = () => {
          newPreviews[fileKey] = reader.result as string;
          setPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
      });

      // Upload all files
      setUploading(true);
      const uploadedUrls: string[] = [];
      let errorCount = 0;

      for (const file of acceptedFiles) {
        try {
          const fileKey = `new-${Date.now()}-${Math.random()}`;
          setUploadProgress((prev) => ({ ...prev, [fileKey]: 0 }));

          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (res.ok && data.url) {
            uploadedUrls.push(data.url);
            setUploadProgress((prev) => ({ ...prev, [fileKey]: 100 }));
            setTimeout(() => {
              setUploadProgress((prev) => {
                const newProgress = { ...prev };
                delete newProgress[fileKey];
                return newProgress;
              });
            }, 500);
          } else {
            errorCount++;
            toast.error(`Failed to upload ${file.name}`);
            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[fileKey];
              return newProgress;
            });
          }
        } catch (error) {
          errorCount++;
          console.error("Upload error:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Network error";
          toast.error(`Error uploading ${file.name}: ${errorMessage}`);
        }
      }

      if (uploadedUrls.length > 0) {
        const newUrls = [...values, ...uploadedUrls];
        onChange(newUrls);
        toast.success(`${uploadedUrls.length} image${uploadedUrls.length !== 1 ? "s" : ""} uploaded successfully`);
      }

    if (errorCount === 0) {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB per file
    disabled: values.length >= maxImages || uploading,
  });

  const removeImage = (index: number) => {
    const newUrls = values.filter((_, i) => i !== index);
    onChange(newUrls);
    
    // Also remove preview
    const previewKeys = Object.keys(previews).filter((k) => k.startsWith("existing-"));
    const keyToRemove = previewKeys[index];
    if (keyToRemove) {
      const newPreviews = { ...previews };
      delete newPreviews[keyToRemove];
      setPreviews(newPreviews);
    }
  };

  const canAddMore = values.length < maxImages;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-xs text-gray-500">
          {values.length} / {maxImages}
        </span>
      </div>

      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg" />
            </div>
          ))}

          {/* Upload More Button */}
          {canAddMore && (
            <div
              {...getRootProps()}
              className={`
                aspect-square
                border-2 border-dashed rounded-lg cursor-pointer
                transition-colors
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
                    <Loader2 className="w-6 h-6 animate-spin text-[#8B0000]" />
                    <p className="text-xs text-gray-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 text-[#8B0000]" />
                    <p className="text-xs font-medium text-gray-700">Add more</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial Upload Area */}
      {values.length === 0 && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg cursor-pointer
            transition-colors
            ${
              isDragActive
                ? "border-[#8B0000] bg-[#8B0000]/5"
                : "border-gray-300 hover:border-[#8B0000] hover:bg-gray-50"
            }
            flex flex-col items-center justify-center p-8
          `}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragActive ? "Drop images here" : "Click or drag to upload"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Multiple images supported • PNG, JPG, WEBP up to 5MB each
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max {maxImages} images
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
