"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface BulkGalleryUploadProps {
  folder?: string;
  onSuccess?: () => void;
}

interface UploadingFile {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "uploading" | "completed" | "failed";
  error?: string;
  url?: string;
}

export default function BulkGalleryUpload({
  folder = "gallery",
  onSuccess,
}: BulkGalleryUploadProps) {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 50) {
      toast.error("Maximum 50 images allowed at once");
      return;
    }

    const newFiles = acceptedFiles.map((file) => {
      const reader = new FileReader();
      let preview = "";
      reader.onloadend = () => {
        preview = reader.result as string;
      };
      reader.readAsDataURL(file);

      return {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: "",
        status: "pending" as const,
      };
    });

    // Set preview asynchronously
    newFiles.forEach((item, idx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id ? { ...f, preview: reader.result as string } : f
          )
        );
      };
      reader.readAsDataURL(acceptedFiles[idx]);
    });

    setFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} image(s) selected`);
  }, [files.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
    },
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
  });

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const item of files) {
      if (item.status === "completed") continue;

      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: "uploading" } : f))
      );

      try {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("folder", folder);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok && data.url) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? { ...f, status: "completed", url: data.url }
                : f
            )
          );
          successCount++;
        } else {
          errorCount++;
          setFiles((prev) =>
            prev.map((f) =>
              f.id === item.id
                ? {
                    ...f,
                    status: "failed",
                    error: data.error || "Upload failed",
                  }
                : f
            )
          );
        }
      } catch (error) {
        errorCount++;
        const errorMessage =
          error instanceof Error ? error.message : "Network error";
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: "failed", error: errorMessage }
              : f
          )
        );
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast.success(
        `${successCount} image(s) uploaded successfully${
          errorCount > 0 ? `. ${errorCount} failed.` : "."
        }`
      );
    }

    if (successCount > 0 && !errorCount) {
      // Create gallery items automatically
      const uploadedUrls = files
        .filter((f) => f.status === "completed" && f.url)
        .map((f) => f.url!);

      try {
        // Create individual gallery items for each image
        for (const url of uploadedUrls) {
          const res = await fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: title || `Gallery Item ${new Date().toLocaleDateString()}`,
              description: description || "",
              image_url: url,
              video_url: "",
              category: category,
              tags: [],
              is_featured: false,
              display_order: 0,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to create gallery item");
          }
        }

        toast.success(
          `${uploadedUrls.length} gallery item(s) created successfully`
        );

        // Clear form
        setFiles([]);
        setTitle("");
        setDescription("");
        setCategory("general");

        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("Error creating gallery items:", error);
        toast.error(
          "Images uploaded but failed to create gallery items. Upload them manually."
        );
      }
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  return (
    <div className="space-y-6">
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
          flex flex-col items-center justify-center p-12
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-[#8B0000]" />
            <p className="text-sm text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-[#8B0000]/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-[#8B0000]" />
            </div>
            <div>
              <p className="text-base font-medium text-gray-700">
                {isDragActive
                  ? "Drop images here"
                  : "Click or drag to upload images"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, WEBP, GIF up to 5MB each • Max 50 images
              </p>
            </div>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold text-lg">
              Selected Images ({files.length})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              disabled={uploading}
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {files.map((item) => (
              <div key={item.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 relative">
                  {item.preview && (
                    <img
                      src={item.preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Status Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    {item.status === "pending" && (
                      <div className="text-white text-xs font-medium">
                        Ready
                      </div>
                    )}
                    {item.status === "uploading" && (
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                    )}
                    {item.status === "completed" && (
                      <div className="text-white text-xs font-medium">✓</div>
                    )}
                    {item.status === "failed" && (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-1 left-1">
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "failed"
                            ? "bg-red-100 text-red-700"
                            : item.status === "uploading"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                {item.status !== "uploading" && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(item.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}

                {/* Error Message */}
                {item.status === "failed" && item.error && (
                  <div className="absolute -bottom-8 left-0 right-0 bg-red-50 border border-red-200 rounded p-2 text-xs text-red-600 whitespace-nowrap overflow-hidden text-ellipsis opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gallery Item Details */}
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="item-title">
                  Gallery Title (optional)
                </Label>
                <Input
                  id="item-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Project Photos 2024"
                  disabled={uploading}
                />
              </div>
              <div>
                <Label htmlFor="item-category">Category</Label>
                <select
                  id="item-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={uploading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  <option value="general">General</option>
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="project">Project</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="item-desc">Description (optional)</Label>
              <textarea
                id="item-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add description for all gallery items..."
                disabled={uploading}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={uploadFiles}
              disabled={uploading || files.length === 0}
              className="bg-[#8B0000] hover:bg-[#6B0000]"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload All Images
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={uploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
