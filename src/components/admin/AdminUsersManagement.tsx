"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ADMIN_ROLES,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_LABELS,
  type AdminRole,
} from "@/lib/admin-roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  created_at?: string;
  updated_at?: string;
}

interface AdminFormState {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}

const emptyForm: AdminFormState = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "editor",
};

export default function AdminUsersManagement({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminFormState | null>(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to load admin users");
        return;
      }

      setAdmins(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Error loading admin users:", error);
      toast.error("Failed to load admin users");
    } finally {
      setLoading(false);
    }
  };

  const resetEditor = () => {
    setEditingAdmin(null);
  };

  const startCreate = () => {
    setEditingAdmin({ ...emptyForm });
  };

  const startEdit = (admin: AdminUser) => {
    setEditingAdmin({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
    });
  };

  const saveAdmin = async () => {
    if (!editingAdmin) return;

    if (!editingAdmin.name.trim() || !editingAdmin.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    if (!editingAdmin.id && editingAdmin.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setSaving(true);
      const isEditing = Boolean(editingAdmin.id);
      const payload = isEditing
        ? {
            id: editingAdmin.id,
            name: editingAdmin.name.trim(),
            email: editingAdmin.email.trim(),
            role: editingAdmin.role,
          }
        : {
            name: editingAdmin.name.trim(),
            email: editingAdmin.email.trim(),
            password: editingAdmin.password,
            role: editingAdmin.role,
          };

      const res = await fetch("/api/admin/users", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save admin user");
        return;
      }

      toast.success(isEditing ? "Admin user updated" : "Admin user created");
      resetEditor();
      await loadAdmins();
    } catch (error) {
      console.error("Error saving admin user:", error);
      toast.error("Failed to save admin user");
    } finally {
      setSaving(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin user?")) return;

    try {
      setSaving(true);
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to delete admin user");
        return;
      }

      toast.success("Admin user deleted");
      if (editingAdmin?.id === id) {
        resetEditor();
      }
      await loadAdmins();
    } catch (error) {
      console.error("Error deleting admin user:", error);
      toast.error("Failed to delete admin user");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!editingAdmin ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold">Admin Users</h3>
              <p className="text-sm text-gray-500 mt-1">
                Create admin accounts and assign the right role for their responsibilities.
              </p>
            </div>
            <Button onClick={startCreate} className="w-full bg-[#8B0000] hover:bg-[#6B0000] sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              New Admin
            </Button>
          </div>

          <div className="space-y-4">
            {admins.length === 0 ? (
              <p className="text-sm text-gray-500">No admin users found.</p>
            ) : (
              admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex flex-col gap-4 rounded-lg border bg-gray-50 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">{admin.name}</h4>
                    <p className="text-sm text-gray-600 break-all">{admin.email}</p>
                    <div className="mt-2">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {ADMIN_ROLE_LABELS[admin.role]}
                      </span>
                    </div>
                    {admin.created_at && (
                      <p className="text-xs text-gray-400 mt-1">
                        Created {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => startEdit(admin)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-red-600 hover:bg-red-50 sm:flex-none"
                      onClick={() => deleteAdmin(admin.id)}
                      disabled={saving || admin.id === currentUserId}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-4">
            {editingAdmin.id ? "Edit Admin User" : "Create Admin User"}
          </h3>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={editingAdmin.name}
                onChange={(e) =>
                  setEditingAdmin({ ...editingAdmin, name: e.target.value })
                }
                placeholder="Full name"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editingAdmin.email}
                onChange={(e) =>
                  setEditingAdmin({ ...editingAdmin, email: e.target.value })
                }
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <Label>Role</Label>
              <select
                value={editingAdmin.role}
                onChange={(e) =>
                  setEditingAdmin({
                    ...editingAdmin,
                    role: e.target.value as AdminRole,
                  })
                }
                className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                disabled={editingAdmin.id === currentUserId}
              >
                {ADMIN_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ADMIN_ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">
                {ADMIN_ROLE_DESCRIPTIONS[editingAdmin.role]}
              </p>
              {editingAdmin.id === currentUserId ? (
                <p className="mt-2 text-sm text-amber-700">
                  Your own role cannot be changed from this screen.
                </p>
              ) : null}
            </div>

            {!editingAdmin.id && (
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={editingAdmin.password}
                  onChange={(e) =>
                    setEditingAdmin({ ...editingAdmin, password: e.target.value })
                  }
                  placeholder="Minimum 8 characters"
                />
              </div>
            )}

            {editingAdmin.id && (
              <p className="text-sm text-gray-500">
                Password changes are not part of this form. This screen updates name, email, and role only.
              </p>
            )}

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                onClick={saveAdmin}
                disabled={saving}
                className="bg-[#8B0000] hover:bg-[#6B0000]"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingAdmin.id ? "Save Changes" : "Create Admin"}
              </Button>
              <Button variant="outline" onClick={resetEditor} disabled={saving}>
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
