"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { NewsPost } from "./types";
import {
  getSlugValidation,
  normalizeSlugInput,
  syncSlugWithTitle,
} from "./slug-utils";

interface NewsManagementProps {
  news: NewsPost[];
  editingNews: NewsPost | null;
  setEditingNews: Dispatch<SetStateAction<NewsPost | null>>;
  saving: boolean;
  onSaveNews: (post: NewsPost) => Promise<void>;
  onDeleteNews: (id: string) => Promise<void>;
}

function createEmptyNewsPost(): NewsPost {
  return {
    id: "",
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    published_date: new Date().toISOString().split("T")[0],
    is_published: false,
    tags: [],
  };
}

export default function NewsManagement({
  news,
  editingNews,
  setEditingNews,
  saving,
  onSaveNews,
  onDeleteNews,
}: NewsManagementProps) {
  const slugValidation = editingNews
    ? getSlugValidation(editingNews.slug, "/news")
    : null;
  const canSave = Boolean(
    editingNews?.title.trim() && slugValidation?.tone !== "error"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setEditingNews(createEmptyNewsPost())}
          className="bg-[#8B0000] hover:bg-[#6B0000]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add News Post
        </Button>
      </div>

      {editingNews && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4">
            {editingNews.id ? "Edit News Post" : "New News Post"}
          </h3>
          <div className="grid gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editingNews.title}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setEditingNews({
                    ...editingNews,
                    title: nextTitle,
                    slug: syncSlugWithTitle(
                      editingNews.title,
                      nextTitle,
                      editingNews.slug
                    ),
                  });
                }}
              />
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <Input
                value={editingNews.slug}
                onChange={(e) =>
                  setEditingNews({
                    ...editingNews,
                    slug: normalizeSlugInput(e.target.value),
                  })
                }
                placeholder="my-news-post"
              />
              {slugValidation ? (
                <p
                  className={`mt-2 text-xs ${
                    slugValidation.tone === "error"
                      ? "text-red-600"
                      : slugValidation.tone === "success"
                        ? "text-green-700"
                        : "text-amber-700"
                  }`}
                >
                  {slugValidation.message}
                </p>
              ) : null}
            </div>
            <ImageUpload
              value={editingNews.image_url}
              onChange={(url) =>
                setEditingNews({ ...editingNews, image_url: url })
              }
              folder="news"
              label="News Image"
              aspectRatio="wide"
            />
            <div>
              <Label>Excerpt</Label>
              <Textarea
                value={editingNews.excerpt}
                onChange={(e) =>
                  setEditingNews({ ...editingNews, excerpt: e.target.value })
                }
                rows={2}
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={editingNews.content}
                onChange={(e) =>
                  setEditingNews({ ...editingNews, content: e.target.value })
                }
                rows={6}
              />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input
                type="text"
                value={(editingNews.tags || []).join(", ")}
                onChange={(e) => {
                  const newTags = e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0);

                  setEditingNews({
                    ...editingNews,
                    tags: newTags,
                  });
                }}
                placeholder="e.g. infrastructure, sanitation, education"
              />
            </div>
            <div>
              <Label>Published Date</Label>
              <Input
                type="date"
                value={
                  editingNews.published_date
                    ? editingNews.published_date.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditingNews({
                    ...editingNews,
                    published_date: e.target.value
                      ? new Date(e.target.value).toISOString().split("T")[0]
                      : "",
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingNews.is_published}
                onCheckedChange={(checked) =>
                  setEditingNews({ ...editingNews, is_published: checked })
                }
              />
              <Label>Published</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onSaveNews(editingNews)}
                disabled={saving || !canSave}
                className="bg-[#8B0000] hover:bg-[#6B0000]"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditingNews(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {news.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-sm text-gray-500">
                {new Date(post.published_date).toLocaleDateString()}
              </p>
              {post.admin_users && (
                <p className="text-xs text-gray-600 mt-1">
                  Posted by: <strong>{post.admin_users.name}</strong>
                </p>
              )}
              <span
                className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                  post.is_published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingNews(post)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onDeleteNews(post.id)}
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
