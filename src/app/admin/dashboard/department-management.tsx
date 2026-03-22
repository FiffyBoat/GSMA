"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Department, DepartmentUnit } from "./types";

interface DepartmentManagementProps {
  departments: Department[];
  editingDepartment: Department | null;
  setEditingDepartment: Dispatch<SetStateAction<Department | null>>;
  editingUnit: DepartmentUnit | null;
  setEditingUnit: Dispatch<SetStateAction<DepartmentUnit | null>>;
  saving: boolean;
  onSaveDepartment: (department: Department) => Promise<void>;
  onSaveDepartmentUnit: (unit: DepartmentUnit) => Promise<void>;
  onDeleteDepartment: (id: string) => Promise<void>;
  onDeleteUnit: (id: string) => Promise<void>;
}

function createEmptyDepartment(): Department {
  return {
    id: "",
    name: "",
    slug: "",
    head_name: "",
    head_title: "",
    head_image_url: "",
    description: "",
    order: 0,
    is_published: false,
    created_at: "",
    updated_at: "",
  };
}

export default function DepartmentManagement({
  departments,
  editingDepartment,
  setEditingDepartment,
  editingUnit,
  setEditingUnit,
  saving,
  onSaveDepartment,
  onSaveDepartmentUnit,
  onDeleteDepartment,
  onDeleteUnit,
}: DepartmentManagementProps) {
  return (
    <div className="space-y-6">
      {!editingDepartment ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Departments</h3>
            <Button
              onClick={() => setEditingDepartment(createEmptyDepartment())}
              className="bg-[#8B0000] hover:bg-[#6B0000]"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Department
            </Button>
          </div>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                    <p className="text-sm text-gray-600">
                      {dept.head_name} - {dept.head_title}
                    </p>
                    <div className="mt-3 space-y-1">
                      {dept.units?.map((unit) => (
                        <p key={unit.id} className="text-xs text-gray-500 pl-4">
                          • {unit.title}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingDepartment(dept)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeleteDepartment(dept.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4">
            {editingDepartment.id ? "Edit Department" : "New Department"}
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Department Name</Label>
              <Input
                value={editingDepartment.name}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="e.g. Central Administration"
              />
            </div>
            <div>
              <Label>Head Name</Label>
              <Input
                value={editingDepartment.head_name}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    head_name: e.target.value,
                  })
                }
                placeholder="e.g. Eugenia Akporhor Agbenyegah"
              />
            </div>
            <div>
              <Label>Head Title</Label>
              <Input
                value={editingDepartment.head_title}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    head_title: e.target.value,
                  })
                }
                placeholder="e.g. Municipal Coordinating Director"
              />
            </div>
            <div>
              <Label>Head Image</Label>
              <ImageUpload
                value={editingDepartment.head_image_url}
                onChange={(url) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    head_image_url: url,
                  })
                }
                folder="departments"
                label="Department Head Image"
              />
            </div>
            <div>
              <Label>Tagline (Short Subtitle)</Label>
              <Input
                value={editingDepartment.tagline || ""}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    tagline: e.target.value,
                  })
                }
                placeholder="e.g., Coordinating the Assembly's Administrative Functions"
              />
            </div>
            <div>
              <Label>Overview (Introduction Paragraph)</Label>
              <Textarea
                value={editingDepartment.overview || ""}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    overview: e.target.value,
                  })
                }
                placeholder="Main introduction paragraph about the department..."
                rows={3}
              />
            </div>
            <div>
              <Label>Description (Deprecated - kept for backwards compatibility)</Label>
              <Textarea
                value={editingDepartment.description}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    description: e.target.value,
                  })
                }
                placeholder="Department description"
                rows={5}
              />
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Department Sections</h4>
                <Button
                  onClick={() => {
                    const newSections = [
                      ...(editingDepartment.sections || []),
                      { title: "", content: "" },
                    ];
                    setEditingDepartment({
                      ...editingDepartment,
                      sections: newSections,
                    });
                  }}
                  size="sm"
                  className="bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Section
                </Button>
              </div>
              <div className="space-y-3">
                {(editingDepartment.sections || []).map((section, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-gray-50 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Section {idx + 1}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newSections = (editingDepartment.sections || []).filter(
                            (_, i) => i !== idx
                          );
                          setEditingDepartment({
                            ...editingDepartment,
                            sections: newSections,
                          });
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <Input
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...(editingDepartment.sections || [])];
                        newSections[idx].title = e.target.value;
                        setEditingDepartment({
                          ...editingDepartment,
                          sections: newSections,
                        });
                      }}
                      placeholder="Section title (e.g., Core Functions)"
                      className="bg-white"
                    />
                    <Textarea
                      value={section.content}
                      onChange={(e) => {
                        const newSections = [...(editingDepartment.sections || [])];
                        newSections[idx].content = e.target.value;
                        setEditingDepartment({
                          ...editingDepartment,
                          sections: newSections,
                        });
                      }}
                      placeholder="Section content (use bullet points with • for lists)"
                      rows={4}
                      className="bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Contact Information</Label>
              <Textarea
                value={editingDepartment.contact_info || ""}
                onChange={(e) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    contact_info: e.target.value,
                  })
                }
                placeholder="e.g., Phone: +233 XXX XXX XXX, Email: info@example.com, Location: Address"
                rows={3}
                className="bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingDepartment.is_published}
                onCheckedChange={(checked) =>
                  setEditingDepartment({
                    ...editingDepartment,
                    is_published: checked,
                  })
                }
              />
              <Label>Publish Department</Label>
            </div>
            {editingDepartment.id && (
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Units/Sections</h4>
                  <Button
                    onClick={() =>
                      setEditingUnit({
                        id: "",
                        department_id: editingDepartment.id,
                        name: "",
                        title: "",
                        description: "",
                        order: 0,
                      })
                    }
                    size="sm"
                    className="bg-[#8B0000] hover:bg-[#6B0000]"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Unit
                  </Button>
                </div>
                {!editingUnit ? (
                  <div className="space-y-2">
                    {editingDepartment.units?.map((unit) => (
                      <div
                        key={unit.id}
                        className="flex items-start justify-between bg-gray-50 p-3 rounded"
                      >
                        <div>
                          <p className="font-semibold text-sm">{unit.title}</p>
                          <p className="text-xs text-gray-600">{unit.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingUnit(unit)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDeleteUnit(unit.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded space-y-3 mb-4">
                    <div>
                      <Label>Unit Name</Label>
                      <Input
                        value={editingUnit.name}
                        onChange={(e) =>
                          setEditingUnit({ ...editingUnit, name: e.target.value })
                        }
                        placeholder="e.g. MUNICIPAL PLANNING AND COORDINATION UNIT"
                      />
                    </div>
                    <div>
                      <Label>Unit Title (Short)</Label>
                      <Input
                        value={editingUnit.title}
                        onChange={(e) =>
                          setEditingUnit({ ...editingUnit, title: e.target.value })
                        }
                        placeholder="e.g. MPCU"
                      />
                    </div>
                    <div>
                      <Label>Unit Description</Label>
                      <Textarea
                        value={editingUnit.description}
                        onChange={(e) =>
                          setEditingUnit({
                            ...editingUnit,
                            description: e.target.value,
                          })
                        }
                        placeholder="What this unit does"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onSaveDepartmentUnit(editingUnit)}
                        disabled={saving || !editingUnit.name}
                        className="bg-[#8B0000] hover:bg-[#6B0000]"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save Unit
                      </Button>
                      <Button variant="outline" onClick={() => setEditingUnit(null)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => onSaveDepartment(editingDepartment)}
                disabled={
                  saving ||
                  !editingDepartment.name ||
                  !editingDepartment.head_name
                }
                className="bg-[#8B0000] hover:bg-[#6B0000]"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Department
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingDepartment(null);
                  setEditingUnit(null);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
