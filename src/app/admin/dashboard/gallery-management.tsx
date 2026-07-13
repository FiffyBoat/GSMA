"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import VideoUpload from "@/components/admin/VideoUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { GalleryItem } from "./types";

interface GalleryManagementProps {
  gallery: GalleryItem[];
  editingGallery: GalleryItem | null;
  setEditingGallery: Dispatch<SetStateAction<GalleryItem | null>>;
  saving: boolean;
  onSaveGallery: (item: GalleryItem) => Promise<void>;
  onDeleteGallery: (id: string) => Promise<void>;
}

function createEmptyGalleryItem(displayOrder: number): GalleryItem {
  return {
    id: "",
    title: "",
    description: "",
    image_url: "",
    video_url: "",
    images: [],
    category: "general",
    is_featured: false,
    display_order: displayOrder,
  };
}

export default function GalleryManagement({
  gallery,
  editingGallery,
  setEditingGallery,
  saving,
  onSaveGallery,
  onDeleteGallery,
}: GalleryManagementProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
            Media Library
          </p>
          <h3 className="mt-1 text-lg font-bold text-gray-900">Gallery Albums</h3>
          <p className="mt-1 text-sm text-gray-600">
            Upload and organize public photos and videos into gallery records.
          </p>
        </div>
        <Button
          onClick={() =>
            setEditingGallery(createEmptyGalleryItem(gallery.length + 1))
          }
          className="rounded-[8px] bg-[#8B0000] hover:bg-[#6B0000]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Gallery Item
        </Button>
      </div>

      {editingGallery && (
        <div className="bg-white p-6 rounded-[8px] shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4">
            {editingGallery.id ? "Edit Gallery Item" : "New Gallery Item"}
          </h3>
          <div className="grid gap-4">
            <MultiImageUpload
              values={
                editingGallery.images ||
                (editingGallery.image_url ? [editingGallery.image_url] : [])
              }
              onChange={(urls) =>
                setEditingGallery({
                  ...editingGallery,
                  images: urls,
                  image_url: urls[0] || "",
                })
              }
              folder="gallery"
              label="Gallery Images"
              maxImages={20}
            />

            <VideoUpload
              value={editingGallery.video_url}
              onChange={(url) =>
                setEditingGallery({ ...editingGallery, video_url: url })
              }
              folder="gallery"
              label="Video Upload (optional)"
            />

            <div>
              <Label>Title</Label>
              <Input
                value={editingGallery.title}
                onChange={(e) =>
                  setEditingGallery({
                    ...editingGallery,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={editingGallery.description}
                onChange={(e) =>
                  setEditingGallery({
                    ...editingGallery,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Input
                  value={editingGallery.category}
                  onChange={(e) =>
                    setEditingGallery({
                      ...editingGallery,
                      category: e.target.value,
                    })
                  }
                  placeholder="general / photo / video / project / event"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingGallery.is_featured}
                onCheckedChange={(checked) =>
                  setEditingGallery({
                    ...editingGallery,
                    is_featured: checked,
                  })
                }
              />
              <Label>Featured</Label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onSaveGallery(editingGallery)}
                disabled={saving}
                className="bg-[#8B0000] hover:bg-[#6B0000]"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditingGallery(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-[8px] shadow-sm border border-gray-200 flex items-center gap-4"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="h-16 w-24 rounded-[8px] object-contain bg-gray-100 sm:h-[72px] sm:w-28"
              />
            ) : (
              <div className="flex h-16 w-24 items-center justify-center rounded-[8px] bg-gray-100 text-xs text-gray-500 sm:h-[72px] sm:w-28">
                No image
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingGallery(item)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onDeleteGallery(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
