"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { HeroSlide } from "./types";

interface SlidesManagementProps {
  slides: HeroSlide[];
  editingSlide: HeroSlide | null;
  setEditingSlide: Dispatch<SetStateAction<HeroSlide | null>>;
  saving: boolean;
  onSaveSlide: (slide: HeroSlide) => Promise<void>;
  onDeleteSlide: (id: string) => Promise<void>;
}

function createEmptySlide(displayOrder: number): HeroSlide {
  return {
    id: "",
    image_url: "",
    title: "",
    subtitle: "",
    description: "",
    display_order: displayOrder,
    is_active: true,
  };
}

export default function SlidesManagement({
  slides,
  editingSlide,
  setEditingSlide,
  saving,
  onSaveSlide,
  onDeleteSlide,
}: SlidesManagementProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setEditingSlide(createEmptySlide(slides.length + 1))}
          className="bg-[#8B0000] hover:bg-[#6B0000]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </Button>
      </div>

      {editingSlide && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4">
            {editingSlide.id ? "Edit Slide" : "New Slide"}
          </h3>
          <div className="grid gap-4">
            <ImageUpload
              value={editingSlide.image_url}
              onChange={(url) =>
                setEditingSlide({ ...editingSlide, image_url: url })
              }
              folder="hero-slides"
              label="Hero Image"
              aspectRatio="wide"
            />
            <div>
              <Label>Title</Label>
              <Input
                value={editingSlide.title}
                onChange={(e) =>
                  setEditingSlide({ ...editingSlide, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={editingSlide.subtitle}
                onChange={(e) =>
                  setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editingSlide.description}
                onChange={(e) =>
                  setEditingSlide({ ...editingSlide, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingSlide.is_active}
                onCheckedChange={(checked) =>
                  setEditingSlide({ ...editingSlide, is_active: checked })
                }
              />
              <Label>Active</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onSaveSlide(editingSlide)}
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
              <Button variant="outline" onClick={() => setEditingSlide(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
          >
            {slide.image_url ? (
              <img
                src={slide.image_url}
                alt={slide.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
            ) : (
              <div className="w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                No image
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{slide.title}</h4>
              <p className="text-sm text-gray-500">{slide.subtitle}</p>
              <span
                className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                  slide.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {slide.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingSlide(slide)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onDeleteSlide(slide.id)}
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
