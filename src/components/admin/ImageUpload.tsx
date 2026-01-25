"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
  aspectRatio?: "square" | "wide" | "portrait";
}

export default function ImageUpload({
  value,
  onChange,
  folder = "general",
  label = "Image",
  className = "",
  aspectRatio = "wide",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          onChange(data.url);
          toast.success("Image uploaded successfully");
        } else {
          toast.error(data.error || "Failed to upload image");
          setPreview(value || null);
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("An error occurred while uploading the image");
        setPreview(value || null);
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = () => {
    setPreview(null);
    onChange("");
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    wide: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative group">
          <div className={`${aspectRatioClasses[aspectRatio]} rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50`}>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            ${aspectRatioClasses[aspectRatio]}
            border-2 border-dashed rounded-lg cursor-pointer
            transition-colors
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
              <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-[#8B0000]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragActive ? "Drop image here" : "Click or drag to upload"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {value && !preview && (
        <div className="text-xs text-gray-500">
          Current image: <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#8B0000] hover:underline">View</a>
        </div>
      )}
    </div>
  );
}
