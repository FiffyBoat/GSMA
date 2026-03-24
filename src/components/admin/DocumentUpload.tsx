"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, X } from "lucide-react";

interface DocumentUploadProps {
  onUpload?: (fileUrl: string, fileType: string, fileSize: number) => void;
  onSuccess?: () => void;
  initialFileUrl?: string;
  folder?: string;
}

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function DocumentUpload({
  onUpload,
  onSuccess,
  initialFileUrl = "",
  folder = "documents",
}: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState(initialFileUrl);
  const [fileName, setFileName] = useState("");

  const getFileType = (file: File): string => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "unknown";
    return extension;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(
        "Invalid file type. Only PDF, Word, Excel, and PowerPoint allowed."
      );
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", folder);

      const uploadRes = await fetch("/api/admin/storage/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        throw new Error(error.error || "Upload failed");
      }

      const { url } = await uploadRes.json();
      setFileUrl(url);
      setFileName(file.name);
      setSelectedFile(file);

      if (onUpload) {
        onUpload(url, getFileType(file), file.size);
        toast.success("File uploaded successfully");
      }

      onSuccess?.();
    } catch (error) {
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Upload failed"}`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async () => {
    if (!fileUrl) return;

    try {
      await fetch(
        `/api/admin/storage/upload?path=${encodeURIComponent(fileUrl)}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }

    setFileUrl("");
    setFileName("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Document File</Label>
        <div className="mt-2">
          {!fileUrl ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                disabled={uploading}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                className="hidden"
              />
              <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
              <p className="mb-2 text-sm text-gray-600">
                Click to select or drag and drop
              </p>
              <p className="mb-4 text-xs text-gray-500">
                Supported: PDF, Word, Excel, PowerPoint (Max 50MB)
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-green-900">
                  {fileName}
                </p>
                <p className="mt-1 text-xs text-green-700">
                  ✓ File uploaded successfully
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="w-full text-red-600 hover:bg-red-50 sm:w-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
