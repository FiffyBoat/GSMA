"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "./types";
import {
  getSlugValidation,
  normalizeSlugInput,
  syncSlugWithTitle,
} from "./slug-utils";

interface ProjectManagementProps {
  projects: Project[];
  editingProject: Project | null;
  setEditingProject: Dispatch<SetStateAction<Project | null>>;
  saving: boolean;
  onSaveProject: (project: Project) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

function createEmptyProject(displayOrder: number): Project {
  return {
    id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    category: "",
    status: "",
    start_date: "",
    end_date: "",
    budget: 0,
    location: "",
    contractor: "",
    progress_percentage: 0,
    is_featured: false,
    display_order: displayOrder,
  };
}

export default function ProjectManagement({
  projects,
  editingProject,
  setEditingProject,
  saving,
  onSaveProject,
  onDeleteProject,
}: ProjectManagementProps) {
  const slugValidation = editingProject
    ? getSlugValidation(editingProject.slug, "/projects")
    : null;
  const canSave = Boolean(
    editingProject?.title.trim() && slugValidation?.tone !== "error"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => setEditingProject(createEmptyProject(projects.length + 1))}
          className="bg-[#8B0000] hover:bg-[#6B0000]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {editingProject && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4">
            {editingProject.id ? "Edit Project" : "New Project"}
          </h3>
          <div className="grid gap-4">
            <ImageUpload
              value={editingProject.image_url}
              onChange={(url) =>
                setEditingProject({ ...editingProject, image_url: url })
              }
              folder="projects"
              label="Project Image"
              aspectRatio="wide"
            />

            <div>
              <Label>Title</Label>
              <Input
                value={editingProject.title}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setEditingProject({
                    ...editingProject,
                    title: nextTitle,
                    slug: syncSlugWithTitle(
                      editingProject.title,
                      nextTitle,
                      editingProject.slug
                    ),
                  });
                }}
              />
            </div>

            <div>
              <Label>Slug (URL)</Label>
              <Input
                value={editingProject.slug}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    slug: normalizeSlugInput(e.target.value),
                  })
                }
                placeholder="my-project-slug"
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

            <div>
              <Label>Category</Label>
              <select
                value={editingProject.category}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              >
                <option value="">Select a category</option>
                <option value="Educational Projects">Educational Projects</option>
                <option value="Health Projects">Health Projects</option>
                <option value="Roads and Drains">Roads and Drains</option>
                <option value="Industrial Projects">Industrial Projects</option>
              </select>
            </div>

            <div>
              <Label>Status</Label>
              <select
                value={editingProject.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  setEditingProject({
                    ...editingProject,
                    status: newStatus,
                    progress_percentage:
                      newStatus === "Completed"
                        ? 100
                        : editingProject.progress_percentage,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              >
                <option value="">Select a status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Proposed">Proposed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={
                    editingProject.start_date
                      ? editingProject.start_date.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      start_date: e.target.value || "",
                    })
                  }
                />
              </div>
              <div>
                <Label>
                  End Date <span className="text-gray-400 text-sm">(Optional)</span>
                </Label>
                <Input
                  type="date"
                  value={
                    editingProject.end_date
                      ? editingProject.end_date.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      end_date: e.target.value || "",
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={editingProject.location}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Contractor</Label>
                <Input
                  value={editingProject.contractor}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      contractor: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Budget (GHS)</Label>
                <Input
                  type="number"
                  value={editingProject.budget || 0}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      budget: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>
                  Progress %{" "}
                  {editingProject.status === "Completed" && (
                    <span className="text-gray-400 text-sm">(Auto: 100%)</span>
                  )}
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={editingProject.progress_percentage || 0}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      progress_percentage: Number(e.target.value),
                    })
                  }
                  disabled={editingProject.status === "Completed"}
                  className={
                    editingProject.status === "Completed"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }
                />
              </div>
            </div>

            <div>
              <Label>Short Description</Label>
              <Textarea
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Full Content</Label>
              <Textarea
                value={editingProject.content}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    content: e.target.value,
                  })
                }
                rows={6}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingProject.is_featured}
                onCheckedChange={(checked) =>
                  setEditingProject({
                    ...editingProject,
                    is_featured: checked,
                  })
                }
              />
              <Label>Featured</Label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onSaveProject(editingProject)}
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
              <Button variant="outline" onClick={() => setEditingProject(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
          >
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-32 h-20 object-cover rounded-lg"
              />
            ) : (
              <div className="w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                No image
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm text-gray-500">
                {project.category} • {project.status} • {project.progress_percentage}%
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingProject(project)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onDeleteProject(project.id)}
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
