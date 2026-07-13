import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Play } from "lucide-react";
import { toast } from "sonner";

interface VideoUploadProps {
  value: string | null | undefined;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function VideoUpload({
  value,
  onChange,
  folder = "videos",
  label = "Video",
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 50MB for videos)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video size must be less than 50MB");
      return;
    }

    // Validate file type - accept any video MIME type (includes video/quicktime for .mov)
    if (!file.type || !file.type.startsWith("video/")) {
      toast.error(
        "Please upload a valid video file (any common video format, e.g. MP4, MOV, WebM)"
      );
      return;
    }

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

      if (res.ok && data.url) {
        onChange(data.url);
        toast.success("Video uploaded successfully");
        setPreview(URL.createObjectURL(file));
      } else {
        toast.error(data.error || "Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network error. Please check your connection.";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setPreview("");
  };

  return (
    <div className="max-w-xl space-y-2">
      <Label>{label}</Label>
      <div>
        {value ? (
          <div className="space-y-3">
            <div className="relative w-full overflow-hidden rounded-[8px] bg-black">
              <video
                src={value}
                controls
                className="w-full max-h-[220px] sm:max-h-[240px]"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group hover:bg-black/20">
                <Play className="h-12 w-12 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <X className="mr-2 h-4 w-4" />
              Remove Video
            </Button>
          </div>
        ) : (
          <label className="flex min-h-[180px] w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-colors hover:border-[#8B0000] hover:bg-red-50">
            <div className="flex flex-col items-center justify-center">
              {uploading ? (
                <Loader2 className="mb-2 h-8 w-8 animate-spin text-[#8B0000]" />
              ) : (
                <Upload className="mb-2 h-8 w-8 text-gray-400" />
              )}
              <span className="text-sm font-medium text-gray-700">
                {uploading ? "Uploading video..." : "Drop your video here or click to upload"}
              </span>
              <span className="mt-1 text-xs text-gray-500">
                Any video format (for example MP4, MOV, WebM) | Max 50MB
              </span>
            </div>
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}
