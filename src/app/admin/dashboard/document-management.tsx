"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Trash2, X, Save } from "lucide-react";
import DocumentUpload from "@/components/admin/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Document } from "./types";

interface DocumentManagementProps {
  documents: Document[];
  editingDocument: Document | null;
  setEditingDocument: Dispatch<SetStateAction<Document | null>>;
  saving: boolean;
  onSaveDocument: (document: Document) => Promise<void>;
  onDeleteDocument: (id: string) => Promise<void>;
}

function createEmptyDocument(): Document {
  return {
    id: "",
    title: "",
    description: "",
    file_url: "",
    file_type: "",
    category: "General",
    file_size: 0,
    is_published: true,
    uploaded_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export default function DocumentManagement({
  documents,
  editingDocument,
  setEditingDocument,
  saving,
  onSaveDocument,
  onDeleteDocument,
}: DocumentManagementProps) {
  return (
    <div className="space-y-6">
      {!editingDocument ? (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold">Upload Document</h3>
            <Button
              size="sm"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] sm:w-auto"
              onClick={() => setEditingDocument(createEmptyDocument())}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col gap-4 rounded-lg border bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold">{doc.title}</h4>
                  <p className="text-sm text-gray-500">
                    {doc.category} • {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {doc.is_published ? "Published" : "Draft"}
                  </p>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => setEditingDocument(doc)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-600 hover:bg-red-50 sm:flex-none"
                    onClick={() => onDeleteDocument(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="py-8 text-center text-gray-500">
                No documents yet. Click "New Document" to get started.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-semibold">
            {editingDocument.id ? "Edit Document" : "New Document"}
          </h3>
          <div className="space-y-4">
            <DocumentUpload
              onUpload={(fileUrl, fileType, fileSize) => {
                setEditingDocument({
                  ...editingDocument,
                  file_url: fileUrl,
                  file_type: fileType,
                  file_size: fileSize,
                });
              }}
              initialFileUrl={editingDocument.file_url}
            />
            <div>
              <Label>Title</Label>
              <Input
                value={editingDocument.title}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    title: e.target.value,
                  })
                }
                placeholder="Document title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={editingDocument.description}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description of the document"
                rows={3}
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={editingDocument.category}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    category: e.target.value,
                  })
                }
                placeholder="e.g., Reports, Policies, Guidelines"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editingDocument.is_published}
                onCheckedChange={(checked) =>
                  setEditingDocument({
                    ...editingDocument,
                    is_published: checked,
                  })
                }
              />
              <Label>Publish</Label>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => onSaveDocument(editingDocument)}
                disabled={
                  saving || !editingDocument.title || !editingDocument.file_url
                }
                className="bg-[#8B0000] hover:bg-[#6B0000]"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Document
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingDocument(null)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
