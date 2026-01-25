"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2, Edit, Save, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ElectoralArea {
  id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface AssemblyMember {
  id: string;
  name: string;
  electoral_area_id: string;
  position: string;
  image_url: string;
  bio: string;
  contact_email: string;
  contact_phone: string;
  is_active: boolean;
  display_order: number;
}

export default function AssemblyManagement() {
  const [activeTab, setActiveTab] = useState<"areas" | "members">("areas");
  const [electoralAreas, setElectoralAreas] = useState<ElectoralArea[]>([]);
  const [assemblyMembers, setAssemblyMembers] = useState<AssemblyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form states for electoral areas
  const [areaForm, setAreaForm] = useState({
    name: "",
    description: "",
    display_order: 0,
    is_active: true,
  });

  // Form states for members
  const [memberForm, setMemberForm] = useState({
    name: "",
    electoral_area_id: "",
    position: "",
    image_url: "",
    bio: "",
    contact_email: "",
    contact_phone: "",
    is_active: true,
    display_order: 0,
  });

  // Load data
  useEffect(() => {
    loadElectoralAreas();
    loadAssemblyMembers();
  }, []);

  const loadElectoralAreas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/electoral-areas");
      if (response.ok) {
        const data = await response.json();
        setElectoralAreas(data);
      }
    } catch (error) {
      toast.error("Failed to load electoral areas");
    } finally {
      setLoading(false);
    }
  };

  const loadAssemblyMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/assembly-members");
      if (response.ok) {
        const data = await response.json();
        setAssemblyMembers(data);
      }
    } catch (error) {
      toast.error("Failed to load assembly members");
    } finally {
      setLoading(false);
    }
  };

  // Electoral Area handlers
  const handleSaveArea = async () => {
    if (!areaForm.name.trim()) {
      toast.error("Please enter an electoral area name");
      return;
    }

    try {
      setLoading(true);
      const url = editingId ? `/api/admin/electoral-areas/${editingId}` : "/api/admin/electoral-areas";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(areaForm),
      });

      if (response.ok) {
        toast.success(editingId ? "Electoral area updated" : "Electoral area created");
        setAreaForm({ name: "", description: "", display_order: 0, is_active: true });
        setEditingId(null);
        loadElectoralAreas();
      } else {
        toast.error("Failed to save electoral area");
      }
    } catch (error) {
      toast.error("Error saving electoral area");
    } finally {
      setLoading(false);
    }
  };

  const handleEditArea = (area: ElectoralArea) => {
    setAreaForm(area);
    setEditingId(area.id);
  };

  const handleDeleteArea = async (id: string) => {
    if (!confirm("Are you sure you want to delete this electoral area?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/electoral-areas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Electoral area deleted");
        loadElectoralAreas();
      } else {
        toast.error("Failed to delete electoral area");
      }
    } catch (error) {
      toast.error("Error deleting electoral area");
    } finally {
      setLoading(false);
    }
  };

  // Assembly Member handlers
  const handleSaveMember = async () => {
    if (!memberForm.name.trim()) {
      toast.error("Please enter member name");
      return;
    }
    if (!memberForm.electoral_area_id) {
      toast.error("Please select an electoral area");
      return;
    }

    try {
      setLoading(true);
      const url = editingId ? `/api/admin/assembly-members/${editingId}` : "/api/admin/assembly-members";
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberForm),
      });

      if (response.ok) {
        toast.success(editingId ? "Member updated" : "Member created");
        setMemberForm({
          name: "",
          electoral_area_id: "",
          position: "",
          image_url: "",
          bio: "",
          contact_email: "",
          contact_phone: "",
          is_active: true,
          display_order: 0,
        });
        setEditingId(null);
        loadAssemblyMembers();
      } else {
        toast.error("Failed to save member");
      }
    } catch (error) {
      toast.error("Error saving member");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = (member: AssemblyMember) => {
    setMemberForm(member);
    setEditingId(member.id);
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/assembly-members/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Member deleted");
        loadAssemblyMembers();
      } else {
        toast.error("Failed to delete member");
      }
    } catch (error) {
      toast.error("Error deleting member");
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setAreaForm({ name: "", description: "", display_order: 0, is_active: true });
    setMemberForm({
      name: "",
      electoral_area_id: "",
      position: "",
      image_url: "",
      bio: "",
      contact_email: "",
      contact_phone: "",
      is_active: true,
      display_order: 0,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("areas")}
          className={`px-4 py-2 font-medium ${
            activeTab === "areas"
              ? "border-b-2 border-[#8B0000] text-[#8B0000]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Electoral Areas
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 font-medium ${
            activeTab === "members"
              ? "border-b-2 border-[#8B0000] text-[#8B0000]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Assembly Members
        </button>
      </div>

      {/* Electoral Areas Tab */}
      {activeTab === "areas" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Electoral Area" : "Add New Electoral Area"}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="area-name">Area Name *</Label>
                <Input
                  id="area-name"
                  value={areaForm.name}
                  onChange={(e) => setAreaForm({ ...areaForm, name: e.target.value })}
                  placeholder="e.g., Weija Electoral Area"
                />
              </div>

              <div>
                <Label htmlFor="area-desc">Description</Label>
                <Textarea
                  id="area-desc"
                  value={areaForm.description}
                  onChange={(e) => setAreaForm({ ...areaForm, description: e.target.value })}
                  placeholder="Brief description of the area"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area-order">Display Order</Label>
                  <Input
                    id="area-order"
                    type="number"
                    value={areaForm.display_order}
                    onChange={(e) => setAreaForm({ ...areaForm, display_order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Label htmlFor="area-active">Active</Label>
                  <Switch
                    id="area-active"
                    checked={areaForm.is_active}
                    onCheckedChange={(checked) => setAreaForm({ ...areaForm, is_active: checked })}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSaveArea}
                  disabled={loading}
                  className="bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button onClick={resetForms} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Electoral Areas List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Electoral Areas</h3>
            </div>
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            ) : electoralAreas.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No electoral areas yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Active</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {electoralAreas.map((area) => (
                      <tr key={area.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{area.name}</td>
                        <td className="px-6 py-4 text-sm">{area.display_order}</td>
                        <td className="px-6 py-4 text-sm">
                          {area.is_active ? (
                            <span className="text-green-600">✓ Active</span>
                          ) : (
                            <span className="text-gray-400">Inactive</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditArea(area)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArea(area.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assembly Members Tab */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Assembly Member" : "Add New Assembly Member"}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="member-name">Full Name *</Label>
                  <Input
                    id="member-name"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="Member name"
                  />
                </div>
                <div>
                  <Label htmlFor="member-area">Electoral Area *</Label>
                  <select
                    id="member-area"
                    value={memberForm.electoral_area_id}
                    onChange={(e) => setMemberForm({ ...memberForm, electoral_area_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select an area</option>
                    {electoralAreas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="member-position">Position</Label>
                  <Input
                    id="member-position"
                    value={memberForm.position}
                    onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                    placeholder="e.g., Elected Assembly Member"
                  />
                </div>
                <div>
                  <Label htmlFor="member-email">Email</Label>
                  <Input
                    id="member-email"
                    type="email"
                    value={memberForm.contact_email}
                    onChange={(e) => setMemberForm({ ...memberForm, contact_email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="member-phone">Phone</Label>
                  <Input
                    id="member-phone"
                    value={memberForm.contact_phone}
                    onChange={(e) => setMemberForm({ ...memberForm, contact_phone: e.target.value })}
                    placeholder="+233 XXX XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="member-order">Display Order</Label>
                  <Input
                    id="member-order"
                    type="number"
                    value={memberForm.display_order}
                    onChange={(e) => setMemberForm({ ...memberForm, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="member-bio">Biography</Label>
                <Textarea
                  id="member-bio"
                  value={memberForm.bio}
                  onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                  placeholder="Short biography or description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Profile Image</Label>
                <ImageUpload
                  onChange={(url: string) => setMemberForm({ ...memberForm, image_url: url })}
                  value={memberForm.image_url}
                  folder="assembly-members"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="member-active">Active</Label>
                <Switch
                  id="member-active"
                  checked={memberForm.is_active}
                  onCheckedChange={(checked) => setMemberForm({ ...memberForm, is_active: checked })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSaveMember}
                  disabled={loading}
                  className="bg-[#8B0000] hover:bg-[#6B0000]"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  {editingId ? "Update" : "Create"}
                </Button>
                {editingId && (
                  <Button onClick={resetForms} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Assembly Members List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Assembly Members</h3>
            </div>
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading...</div>
            ) : assemblyMembers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No members yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Position</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Electoral Area</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Active</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assemblyMembers.map((member) => {
                      const area = electoralAreas.find((a) => a.id === member.electoral_area_id);
                      return (
                        <tr key={member.id} className="border-t hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{member.name}</td>
                          <td className="px-6 py-4 text-sm">{member.position}</td>
                          <td className="px-6 py-4 text-sm">{area?.name}</td>
                          <td className="px-6 py-4 text-sm">
                            {member.is_active ? (
                              <span className="text-green-600">✓ Active</span>
                            ) : (
                              <span className="text-gray-400">Inactive</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditMember(member)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
