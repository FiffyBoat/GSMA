import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Play } from "lucide-react";
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

    // Validate file size (max 500MB for videos)
    if (file.size > 500 * 1024 * 1024) {
      toast.error("Video size must be less than 500MB");
      return;
    }

    // Validate file type - accept any video MIME type (includes video/quicktime for .mov)
    if (!file.type || !file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file (any common video format, e.g. MP4, MOV, WebM)");
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
      const errorMessage = error instanceof Error ? error.message : "Network error. Please check your connection.";
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
    <div>
      <Label>{label}</Label>
      <div className="mt-2">
        {value ? (
          <div className="space-y-3">
            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              <video
                src={value}
                controls
                className="w-full max-h-[300px]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group pointer-events-none">
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Remove Video
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-[#8B0000] transition-colors bg-gray-50 hover:bg-red-50">
            <div className="flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Drop your video here or click to upload
              </span>
              <span className="text-xs text-gray-500 mt-1">
                Any video format (e.g. MP4, MOV, WebM) — Max 500MB
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
      {uploading && (
        <div className="mt-2 text-sm text-gray-500">Uploading video...</div>
      )}
    </div>
  );
}
