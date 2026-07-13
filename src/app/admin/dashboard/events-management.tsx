"use client";

import type { Dispatch, SetStateAction } from "react";
import { Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Event } from "./types";
import {
  getSlugValidation,
  normalizeSlugInput,
  syncSlugWithTitle,
} from "./slug-utils";

interface EventsManagementProps {
  events: Event[];
  editingEvent: Event | null;
  setEditingEvent: Dispatch<SetStateAction<Event | null>>;
  saving: boolean;
  onSaveEvent: (event: Event) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
}

function createEmptyEvent(displayOrder: number): Event {
  return {
    id: "",
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    image_caption: "",
    credit_note: "",
    event_type: "meeting",
    start_date: new Date().toISOString(),
    end_date: null,
    location: "",
    venue: "",
    organizer: "",
    contact_person: "",
    contact_email: "",
    contact_phone: "",
    is_featured: false,
    is_published: true,
    display_order: displayOrder,
  };
}

function toDateTimeLocalValue(value: string | null | undefined): string {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

export default function EventsManagement({
  events,
  editingEvent,
  setEditingEvent,
  saving,
  onSaveEvent,
  onDeleteEvent,
}: EventsManagementProps) {
  const slugValidation = editingEvent
    ? getSlugValidation(editingEvent.slug, "/events")
    : null;
  const canSave = Boolean(
    editingEvent?.title.trim() && slugValidation?.tone !== "error"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
            Programmes
          </p>
          <h3 className="mt-1 text-lg font-bold text-gray-900">Events</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage meetings, durbars, hearings, workshops, and public events.
          </p>
        </div>
        <Button
          onClick={() => setEditingEvent(createEmptyEvent(events.length + 1))}
          className="rounded-[8px] bg-[#8B0000] hover:bg-[#6B0000]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {editingEvent && (
        <div className="bg-white p-6 rounded-[8px] shadow-sm border border-gray-200">
          <h3 className="font-semibold mb-4">
            {editingEvent.id ? "Edit Event" : "New Event"}
          </h3>
          <div className="grid gap-4">
            <ImageUpload
              value={editingEvent.image_url}
              onChange={(url) =>
                setEditingEvent({ ...editingEvent, image_url: url })
              }
              folder="events"
              label="Event Image"
              aspectRatio="wide"
            />

            <div>
              <Label>Image Caption</Label>
              <Textarea
                value={editingEvent.image_caption || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, image_caption: e.target.value })
                }
                rows={2}
                placeholder="Optional caption to display under the image"
              />
            </div>

            <div>
              <Label>Credit Note</Label>
              <Textarea
                value={editingEvent.credit_note || ""}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, credit_note: e.target.value })
                }
                rows={2}
                placeholder="Optional credit information (e.g., Photo by: John Doe)"
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={editingEvent.title}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setEditingEvent({
                    ...editingEvent,
                    title: nextTitle,
                    slug: syncSlugWithTitle(
                      editingEvent.title,
                      nextTitle,
                      editingEvent.slug
                    ),
                  });
                }}
              />
            </div>

            <div>
              <Label>Slug (URL)</Label>
              <Input
                value={editingEvent.slug}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    slug: normalizeSlugInput(e.target.value),
                  })
                }
                placeholder="my-event-slug"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date/Time</Label>
                <Input
                  type="datetime-local"
                  value={toDateTimeLocalValue(editingEvent.start_date)}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      start_date: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : "",
                    })
                  }
                />
              </div>
              <div>
                <Label>End Date/Time (Optional)</Label>
                <Input
                  type="datetime-local"
                  value={toDateTimeLocalValue(editingEvent.end_date)}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      end_date: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Event Type</Label>
                <Input
                  value={editingEvent.event_type}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      event_type: e.target.value,
                    })
                  }
                  placeholder="meeting / durbar / hearing / workshop / outreach"
                />
              </div>
              <div>
                <Label>Venue</Label>
                <Input
                  value={editingEvent.venue}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, venue: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Organizer</Label>
                <Input
                  value={editingEvent.organizer}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      organizer: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Contact Email</Label>
                <Input
                  value={editingEvent.contact_email}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      contact_email: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input
                  value={editingEvent.contact_phone}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      contact_phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Short Description</Label>
              <Textarea
                value={editingEvent.description}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Full Content</Label>
              <Textarea
                value={editingEvent.content}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    content: e.target.value,
                  })
                }
                rows={6}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingEvent.is_published}
                onCheckedChange={(checked) =>
                  setEditingEvent({ ...editingEvent, is_published: checked })
                }
              />
              <Label>Published</Label>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onSaveEvent(editingEvent)}
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
              <Button variant="outline" onClick={() => setEditingEvent(null)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white p-4 rounded-[8px] shadow-sm border border-gray-200 flex items-center gap-4"
          >
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.title}
                className="h-16 w-24 rounded-[8px] object-contain bg-gray-100 sm:h-[72px] sm:w-28"
              />
            ) : (
              <div className="flex h-16 w-24 items-center justify-center rounded-[8px] bg-gray-100 text-xs text-gray-500 sm:h-[72px] sm:w-28">
                No image
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-500">
                {event.event_type} |{" "}
                {event.start_date ? new Date(event.start_date).toLocaleString() : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingEvent(event)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onDeleteEvent(event.id)}
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
