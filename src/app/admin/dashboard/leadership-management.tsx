"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, Users, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Department, Leadership } from "./types";

interface LeadershipManagementProps {
  leadership: Leadership[];
  departments: Department[];
  editingLeader: Leadership | null;
  setEditingLeader: Dispatch<SetStateAction<Leadership | null>>;
  saving: boolean;
  onSaveLeader: (leader: Leadership) => Promise<void>;
  onDeleteLeader: (id: string) => Promise<void>;
}

function createEmptyLeader(displayOrder: number): Leadership {
  return {
    id: "",
    name: "",
    position: "",
    title: "",
    image_url: "",
    bio: "",
    department: undefined,
    display_order: displayOrder,
    is_active: true,
  };
}

function formatDepartmentLabel(value: string) {
  const labels: Record<string, string> = {
    "ngleshie-amanfro-bortianor": "Bortianor-Ngleshie-Amanfro Constituency",
    "bortianor-ngleshie-amanfro": "Bortianor-Ngleshie-Amanfro Constituency",
    "obom-domeabra": "Domeabra-Obom Constituency",
    "domeabra-obom": "Domeabra-Obom Constituency",
  };

  return labels[value] || value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function LeadershipManagement({
  leadership,
  departments,
  editingLeader,
  setEditingLeader,
  saving,
  onSaveLeader,
  onDeleteLeader,
}: LeadershipManagementProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
            Management
          </p>
          <h3 className="mt-1 text-lg font-bold text-gray-900">Leadership Records</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage public leadership profiles, MPs, and management members.
          </p>
        </div>
        <Button
          onClick={() => setEditingLeader(createEmptyLeader(leadership.length + 1))}
          className="w-full rounded-[8px] bg-[#8B0000] hover:bg-[#6B0000] sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Leader
        </Button>
      </div>

      {editingLeader && (
        <div className="bg-white p-6 rounded-[8px] shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4">
            {editingLeader.id ? "Edit Leader" : "New Leader"}
          </h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Title (Hon., Dr., etc.)</Label>
                <Input
                  value={editingLeader.title}
                  onChange={(e) =>
                    setEditingLeader({ ...editingLeader, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Full Name</Label>
                <Input
                  value={editingLeader.name}
                  onChange={(e) =>
                    setEditingLeader({ ...editingLeader, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label>Position</Label>
              <Input
                value={editingLeader.position}
                onChange={(e) =>
                  setEditingLeader({ ...editingLeader, position: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Department/Constituency</Label>
              <select
                value={editingLeader.department || ""}
                onChange={(e) =>
                  setEditingLeader({
                    ...editingLeader,
                    department: e.target.value || undefined,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              >
                <option value="">No Department/Constituency (Executive)</option>
                {departments.length > 0 && (
                  <optgroup label="Departments">
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.slug || dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="Constituencies">
                  <option value="ngleshie-amanfro-bortianor">
                    Bortianor-Ngleshie-Amanfro Constituency
                  </option>
                  <option value="obom-domeabra">
                    Domeabra-Obom Constituency
                  </option>
                </optgroup>
              </select>
            </div>
            <ImageUpload
              value={editingLeader.image_url}
              onChange={(url) =>
                setEditingLeader({ ...editingLeader, image_url: url })
              }
              folder="leadership"
              label="Profile Image"
              aspectRatio="portrait"
            />
            <div>
              <Label>Bio</Label>
              <Textarea
                value={editingLeader.bio}
                onChange={(e) =>
                  setEditingLeader({ ...editingLeader, bio: e.target.value })
                }
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingLeader.is_active}
                onCheckedChange={(checked) =>
                  setEditingLeader({ ...editingLeader, is_active: checked })
                }
              />
              <Label>Active</Label>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => onSaveLeader(editingLeader)}
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
              <Button variant="outline" onClick={() => setEditingLeader(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {leadership.map((leader) => (
          <div
            key={leader.id}
            className="bg-white p-4 rounded-[8px] shadow-sm border border-gray-200 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-[8px] flex items-center justify-center overflow-hidden">
              {leader.image_url ? (
                <img
                  src={leader.image_url}
                  alt={leader.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Users className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">
                {leader.title} {leader.name}
              </h4>
              <p className="text-sm text-gray-500">{leader.position}</p>
              {leader.department && (
                <p className="text-xs text-[#8B0000] font-medium mt-1">
                  {leader.position.includes("Parliament")
                    ? "Constituency:"
                    : "Department:"}{" "}
                  {formatDepartmentLabel(leader.department)}
                </p>
              )}
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => setEditingLeader(leader)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 hover:bg-red-50 sm:flex-none"
                onClick={() => onDeleteLeader(leader.id)}
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
