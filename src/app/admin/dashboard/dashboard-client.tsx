"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DepartmentManagement from "./department-management";
import DocumentManagement from "./document-management";
import EventsManagement from "./events-management";
import GalleryManagement from "./gallery-management";
import LeadershipManagement from "./leadership-management";
import {
  canAccessAdminTab,
  getAdminNavGroupsForRole,
  getDefaultAdminTab,
  getAdminNavOpenState,
  getAdminTabTitle,
  type AdminNavGroup,
} from "./nav-items";
import NewsManagement from "./news-management";
import OverviewStats from "./overview-stats";
import ProjectManagement from "./project-management";
import SettingsManagement from "./settings-management";
import SlidesManagement from "./slides-management";
import { loadAdminDashboardData } from "./load-dashboard-data";
import type {
  AdminTabId,
  Department,
  DepartmentUnit,
  Document,
  Event,
  GalleryItem,
  HeroSlide,
  Leadership,
  NewsPost,
  Project,
  SiteSetting,
  User,
} from "./types";
import AssemblyManagement from "@/components/admin/AssemblyManagement";
import AdminUsersManagement from "@/components/admin/AdminUsersManagement";
import {
  ChevronDown,
  LogOut,
  Menu,
  Loader2,
} from "lucide-react";

const GROUP_STYLES: Record<
  AdminNavGroup["id"],
  {
    border: string;
    headerActive: string;
    iconActive: string;
    iconIdle: string;
    accentBadge: string;
  }
> = {
  dashboard: {
    border: "border-amber-900/40",
    headerActive: "bg-amber-950/60 text-white",
    iconActive: "bg-amber-600 text-white",
    iconIdle: "bg-slate-800 text-amber-200",
    accentBadge: "bg-amber-500/15 text-amber-200",
  },
  content: {
    border: "border-rose-900/40",
    headerActive: "bg-rose-950/60 text-white",
    iconActive: "bg-rose-600 text-white",
    iconIdle: "bg-slate-800 text-rose-200",
    accentBadge: "bg-rose-500/15 text-rose-200",
  },
  structure: {
    border: "border-emerald-900/40",
    headerActive: "bg-emerald-950/60 text-white",
    iconActive: "bg-emerald-600 text-white",
    iconIdle: "bg-slate-800 text-emerald-200",
    accentBadge: "bg-emerald-500/15 text-emerald-200",
  },
  system: {
    border: "border-sky-900/40",
    headerActive: "bg-sky-950/60 text-white",
    iconActive: "bg-sky-600 text-white",
    iconIdle: "bg-slate-800 text-sky-200",
    accentBadge: "bg-sky-500/15 text-sky-200",
  },
};

export default function AdminDashboardClient({ user }: { user: User }) {
  const router = useRouter();
  const availableNavGroups = getAdminNavGroupsForRole(user.role);
  const allowedTabs = availableNavGroups.flatMap((group) =>
    group.items.map((item) => item.id)
  );
  const defaultTab = getDefaultAdminTab(user.role);
  const [activeTab, setActiveTab] = useState<AdminTabId>(defaultTab);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(() =>
    getAdminNavOpenState(defaultTab)
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [editingLeader, setEditingLeader] = useState<Leadership | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingUnit, setEditingUnit] = useState<DepartmentUnit | null>(null);

  const tabCounts: Partial<Record<AdminTabId, number>> = {
    slides: slides.length,
    news: news.length,
    projects: projects.length,
    events: events.length,
    gallery: gallery.length,
    documents: documents.length,
    departments: departments.length,
    leadership: leadership.length,
    settings: settings.length,
  };
  const tabAttentionCounts: Partial<Record<AdminTabId, number>> = {
    slides: slides.filter((slide) => !slide.is_active).length,
    news: news.filter((item) => !item.is_published).length,
    events: events.filter((item) => !item.is_published).length,
    documents: documents.filter((item) => !item.is_published).length,
    departments: departments.filter((item) => !item.is_published).length,
    leadership: leadership.filter((item) => !item.is_active).length,
  };

  useEffect(() => {
    loadData();
  }, [user.role]);

  useEffect(() => {
    if (!canAccessAdminTab(user.role, activeTab)) {
      setActiveTab(defaultTab);
      return;
    }

    setOpenGroups((currentState) => {
      const nextState = { ...currentState };
      const activeGroup = availableNavGroups.find((group) =>
        group.items.some((item) => item.id === activeTab)
      );

      if (activeGroup) {
        nextState[activeGroup.id] = true;
      }

      return nextState;
    });
  }, [activeTab, defaultTab, user.role]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, errors } = await loadAdminDashboardData(allowedTabs);

      errors.forEach((error) => toast.error(error));

      setSlides(data.slides);
      setNews(data.news);
      setLeadership(data.leadership);
      setSettings(data.settings);
      setProjects(data.projects);
      setEvents(data.events);
      setGallery(data.gallery);
      setDocuments(data.documents);
      setDepartments(data.departments);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const saveSlide = async (slide: HeroSlide) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/slides", {
        method: slide.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(slide.id ? "Slide updated successfully" : "Slide created successfully");
        await loadData();
        setEditingSlide(null);
        // Revalidate content cache
        await fetch("/api/content/slides");
      } else {
        toast.error(data.error || "Failed to save slide");
      }
    } catch (error) {
      console.error("Error saving slide:", error);
      toast.error("An error occurred while saving the slide");
    } finally {
      setSaving(false);
    }
  };

  const deleteSlide = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      // Find the slide to get its image URL
      const slide = slides.find((s) => s.id === id);
      
      const res = await fetch(`/api/admin/slides?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        // Delete image from storage if it exists and is from our storage
        if (slide?.image_url && slide.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(slide.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
            // Don't fail the whole operation if image deletion fails
          }
        }
        
        toast.success("Slide deleted successfully");
        await loadData();
        // Revalidate content cache
        await fetch("/api/content/slides");
      } else {
        toast.error(data.error || "Failed to delete slide");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error("An error occurred while deleting the slide");
    }
  };

  const saveNews = async (post: NewsPost) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: post.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(post.id ? "News post updated successfully" : "News post created successfully");
        await loadData();
        setEditingNews(null);
        // Revalidate content cache
        await fetch("/api/content/news");
      } else {
        toast.error(data.error || "Failed to save news post");
      }
    } catch (error) {
      console.error("Error saving news:", error);
      toast.error("An error occurred while saving the news post");
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news post?")) return;
    try {
      // Find the news post to get its image URL
      const post = news.find((n) => n.id === id);
      
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        // Delete image from storage if it exists and is from our storage
        if (post?.image_url && post.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(post.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
            // Don't fail the whole operation if image deletion fails
          }
        }
        
        toast.success("News post deleted successfully");
        await loadData();
        // Revalidate content cache
        await fetch("/api/content/news");
      } else {
        toast.error(data.error || "Failed to delete news post");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("An error occurred while deleting the news post");
    }
  };

  const saveLeader = async (leader: Leadership) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/leadership", {
        method: leader.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leader),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(leader.id ? "Leader updated successfully" : "Leader added successfully");
        await loadData();
        setEditingLeader(null);
        // Revalidate content cache
        await fetch("/api/content/leadership");
      } else {
        toast.error(data.error || "Failed to save leader");
      }
    } catch (error) {
      console.error("Error saving leadership:", error);
      toast.error("An error occurred while saving the leader");
    } finally {
      setSaving(false);
    }
  };

  const deleteLeader = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      // Find the leader to get its image URL
      const leader = leadership.find((l) => l.id === id);
      
      const res = await fetch(`/api/admin/leadership?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        // Delete image from storage if it exists and is from our storage
        if (leader?.image_url && leader.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(leader.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
            // Don't fail the whole operation if image deletion fails
          }
        }
        
        toast.success("Leader deleted successfully");
        await loadData();
        // Revalidate content cache
        await fetch("/api/content/leadership");
      } else {
        toast.error(data.error || "Failed to delete leader");
      }
    } catch (error) {
      console.error("Error deleting leadership:", error);
      toast.error("An error occurred while deleting the leader");
    }
  };

  const saveSettings = async (items: SiteSetting[]) => {
    if (items.length === 0) {
      return true;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: items }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(
          items.length === 1
            ? "Setting updated successfully"
            : "Settings updated successfully"
        );
        await loadData();
        // Revalidate content cache
        await fetch("/api/content/settings");
        return true;
      } else {
        toast.error(data.error || "Failed to save settings");
        return false;
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("An error occurred while saving the settings");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async (project: Project) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: project.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(project.id ? "Project updated successfully" : "Project created successfully");
        await loadData();
        setEditingProject(null);
        await fetch("/api/content/projects");
      } else {
        toast.error(data.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("An error occurred while saving the project");
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const project = projects.find((p) => p.id === id);
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        if (project?.image_url && project.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(project.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
          }
        }
        toast.success("Project deleted successfully");
        await loadData();
        await fetch("/api/content/projects");
      } else {
        toast.error(data.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("An error occurred while deleting the project");
    }
  };

  const saveEvent = async (event: Event) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: event.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(event.id ? "Event updated successfully" : "Event created successfully");
        await loadData();
        setEditingEvent(null);
        await fetch("/api/content/events");
      } else {
        toast.error(data.error || "Failed to save event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("An error occurred while saving the event");
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const event = events.find((e) => e.id === id);
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        if (event?.image_url && event.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(event.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
          }
        }
        toast.success("Event deleted successfully");
        await loadData();
        await fetch("/api/content/events");
      } else {
        toast.error(data.error || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("An error occurred while deleting the event");
    }
  };

  const saveGallery = async (item: GalleryItem) => {
    // Validate title
    if (!item.title || item.title.trim() === "") {
      toast.error("Please enter a title for the gallery item");
      return;
    }

    // Validate that at least image or video is provided
    const hasImages = item.images && item.images.length > 0;
    const hasImageUrl = item.image_url && item.image_url.trim() !== "";
    const hasVideoUrl = item.video_url && item.video_url.trim() !== "";

    if (!hasImageUrl && !hasVideoUrl && !hasImages) {
      toast.error("Please upload either an image or video for the gallery item");
      return;
    }

    // Ensure image_url is set (use first image from images array if needed)
    const itemToSave = { ...item };
    if (hasImages && !hasImageUrl && item.images && item.images.length > 0) {
      itemToSave.image_url = item.images[0];
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: item.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSave),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(item.id ? "Gallery item updated successfully" : "Gallery item added successfully");
        await loadData();
        setEditingGallery(null);
        await fetch("/api/content/gallery");
      } else {
        toast.error(data.error || "Failed to save gallery item");
      }
    } catch (error) {
      console.error("Error saving gallery item:", error);
      toast.error("An error occurred while saving the gallery item");
    } finally {
      setSaving(false);
    }
  };

  const deleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      const item = gallery.find((g) => g.id === id);
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        if (item?.image_url && item.image_url.includes("/storage/v1/object/public/website-images/")) {
          try {
            await fetch(`/api/admin/upload?path=${encodeURIComponent(item.image_url)}`, { method: "DELETE" });
          } catch (err) {
            console.error("Error deleting image:", err);
          }
        }
        toast.success("Gallery item deleted successfully");
        await loadData();
        await fetch("/api/content/gallery");
      } else {
        toast.error(data.error || "Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      toast.error("An error occurred while deleting the gallery item");
    }
  };

  const saveDocument = async (document: Document) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/documents", {
        method: document.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(document),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(document.id ? "Document updated successfully" : "Document created successfully");
        await loadData();
        setEditingDocument(null);
      } else {
        toast.error(data.error || "Failed to save document");
      }
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("An error occurred while saving the document");
    } finally {
      setSaving(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      const res = await fetch(`/api/admin/documents?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Document deleted successfully");
        await loadData();
      } else {
        toast.error(data.error || "Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("An error occurred while deleting the document");
    }
  };

  const saveDepartment = async (department: Department) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/departments", {
        method: department.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(department),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(department.id ? "Department updated successfully" : "Department created successfully");
        await loadData();
        setEditingDepartment(null);
      } else {
        toast.error(data.error || "Failed to save department");
      }
    } catch (error) {
      console.error("Error saving department:", error);
      toast.error("An error occurred while saving the department");
    } finally {
      setSaving(false);
    }
  };

  const saveDepartmentUnit = async (unit: DepartmentUnit) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/departments", {
        method: unit.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unit),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(unit.id ? "Unit updated successfully" : "Unit created successfully");
        await loadData();
        setEditingUnit(null);
      } else {
        toast.error(data.error || "Failed to save unit");
      }
    } catch (error) {
      console.error("Error saving unit:", error);
      toast.error("An error occurred while saving the unit");
    } finally {
      setSaving(false);
    }
  };

  const deleteDepartment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      const res = await fetch(`/api/admin/departments?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Department deleted successfully");
        await loadData();
      } else {
        toast.error(data.error || "Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("An error occurred while deleting the department");
    }
  };

  const deleteUnit = async (id: string) => {
    if (!confirm("Are you sure you want to delete this unit?")) return;
    try {
      const res = await fetch(`/api/admin/departments?id=${id}&isUnit=true`, { method: "DELETE" });
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Unit deleted successfully");
        await loadData();
      } else {
        toast.error(data.error || "Failed to delete unit");
      }
    } catch (error) {
      console.error("Error deleting unit:", error);
      toast.error("An error occurred while deleting the unit");
    }
  };

  const handleTabSelect = (tab: AdminTabId) => {
    if (!canAccessAdminTab(user.role, tab)) {
      return;
    }

    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const toggleGroup = (groupId: keyof typeof openGroups) => {
    setOpenGroups((currentState) => ({
      ...currentState,
      [groupId]: !currentState[groupId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-slate-900 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <div className="border-b border-slate-700 px-4 py-4">
            <h1 className="text-lg font-bold text-white">GSMA Admin</h1>
            <p className="mt-1 text-xs text-slate-400">{user.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {user.role.replace("_", " ")}
            </p>
          </div>

          <nav className="flex-1 space-y-2.5 overflow-y-auto p-3">
            {availableNavGroups.map((group) => {
              const groupStyle = GROUP_STYLES[group.id];
              const groupActive = group.items.some((item) => item.id === activeTab);
              const isOpen = openGroups[group.id];
              const groupCount = group.items.reduce(
                (total, item) => total + (tabCounts[item.id] ?? 0),
                0
              );
              const groupAttentionCount = group.items.reduce(
                (total, item) => total + (tabAttentionCounts[item.id] ?? 0),
                0
              );

              return (
                <div
                  key={group.id}
                  className={`overflow-hidden rounded-xl border bg-slate-950/40 ${groupStyle.border}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors ${
                      groupActive
                        ? groupStyle.headerActive
                        : "text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          groupActive
                            ? groupStyle.iconActive
                            : groupStyle.iconIdle
                        }`}
                      >
                        <group.icon className="h-3.5 w-3.5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-semibold">{group.label}</p>
                          {groupCount > 0 ? (
                            <span
                              className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                groupActive
                                  ? "bg-white/15 text-white"
                                  : groupStyle.accentBadge
                              }`}
                            >
                              {groupCount}
                            </span>
                          ) : null}
                          {groupAttentionCount > 0 ? (
                            <span
                              className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-200"
                              title={`${groupAttentionCount} item${groupAttentionCount === 1 ? "" : "s"} need attention`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              {groupAttentionCount}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {group.items.length} section
                          {group.items.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen ? (
                    <div className="space-y-1 border-t border-slate-800 px-2.5 py-2.5">
                      {group.items.map((item) => {
                        const attentionCount = tabAttentionCounts[item.id] ?? 0;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleTabSelect(item.id)}
                            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                              activeTab === item.id
                                ? "bg-[#8B0000] text-white shadow-sm"
                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`}
                          >
                            <item.icon className="h-3.5 w-3.5" />
                            <span className="min-w-0 flex-1 truncate text-left">
                              {item.label}
                            </span>
                            {attentionCount > 0 ? (
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                  activeTab === item.id
                                    ? "bg-amber-300/20 text-amber-50"
                                    : "bg-amber-500/15 text-amber-200"
                                }`}
                                title={`${attentionCount} item${attentionCount === 1 ? "" : "s"} need attention`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                {attentionCount}
                              </span>
                            ) : null}
                            {typeof tabCounts[item.id] === "number" ? (
                              <span
                                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                  activeTab === item.id
                                    ? "bg-white/15 text-white"
                                    : "bg-slate-700 text-slate-200"
                                }`}
                              >
                                {tabCounts[item.id]}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] text-slate-300 transition-colors hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="min-w-0 lg:pl-60">
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">
            {getAdminTabTitle(activeTab)}
          </h2>
        </header>

        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#8B0000]" />
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <OverviewStats
                  slidesCount={slides.length}
                  newsCount={news.length}
                  leadershipCount={leadership.length}
                  settingsCount={settings.length}
                  projectsCount={projects.length}
                  eventsCount={events.length}
                  galleryCount={gallery.length}
                />
              )}

              {activeTab === "slides" && (
                <SlidesManagement
                  slides={slides}
                  editingSlide={editingSlide}
                  setEditingSlide={setEditingSlide}
                  saving={saving}
                  onSaveSlide={saveSlide}
                  onDeleteSlide={deleteSlide}
                />
              )}

              {activeTab === "news" && (
                <NewsManagement
                  news={news}
                  editingNews={editingNews}
                  setEditingNews={setEditingNews}
                  saving={saving}
                  onSaveNews={saveNews}
                  onDeleteNews={deleteNews}
                />
              )}

              {activeTab === "projects" && (
                <ProjectManagement
                  projects={projects}
                  editingProject={editingProject}
                  setEditingProject={setEditingProject}
                  saving={saving}
                  onSaveProject={saveProject}
                  onDeleteProject={deleteProject}
                />
              )}

              {activeTab === "events" && (
                <EventsManagement
                  events={events}
                  editingEvent={editingEvent}
                  setEditingEvent={setEditingEvent}
                  saving={saving}
                  onSaveEvent={saveEvent}
                  onDeleteEvent={deleteEvent}
                />
              )}

              {activeTab === "gallery" && (
                <GalleryManagement
                  gallery={gallery}
                  editingGallery={editingGallery}
                  setEditingGallery={setEditingGallery}
                  saving={saving}
                  onSaveGallery={saveGallery}
                  onDeleteGallery={deleteGallery}
                />
              )}

              {activeTab === "leadership" && (
                <LeadershipManagement
                  leadership={leadership}
                  departments={departments}
                  editingLeader={editingLeader}
                  setEditingLeader={setEditingLeader}
                  saving={saving}
                  onSaveLeader={saveLeader}
                  onDeleteLeader={deleteLeader}
                />
              )}

              {activeTab === "assembly" && (
                <AssemblyManagement />
              )}

              {activeTab === "admin-users" && (
                <AdminUsersManagement currentUserId={user.id} />
              )}

              {activeTab === "settings" && (
                <SettingsManagement
                  settings={settings}
                  setSettings={setSettings}
                  saving={saving}
                  onSaveSettings={saveSettings}
                />
              )}

              {activeTab === "documents" && (
                <DocumentManagement
                  documents={documents}
                  editingDocument={editingDocument}
                  setEditingDocument={setEditingDocument}
                  saving={saving}
                  onSaveDocument={saveDocument}
                  onDeleteDocument={deleteDocument}
                />
              )}

              {activeTab === "departments" && (
                <DepartmentManagement
                  departments={departments}
                  editingDepartment={editingDepartment}
                  setEditingDepartment={setEditingDepartment}
                  editingUnit={editingUnit}
                  setEditingUnit={setEditingUnit}
                  saving={saving}
                  onSaveDepartment={saveDepartment}
                  onSaveDepartmentUnit={saveDepartmentUnit}
                  onDeleteDepartment={deleteDepartment}
                  onDeleteUnit={deleteUnit}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

