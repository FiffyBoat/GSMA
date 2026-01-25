"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/admin/ImageUpload";
import DocumentUpload from "@/components/admin/DocumentUpload";
import AssemblyManagement from "@/components/admin/AssemblyManagement";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Menu,
  Users,
  Loader2,
  FolderKanban,
  Calendar,
  Images,
  FileText,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface NewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_date: string;
  is_published: boolean;
}

interface Leadership {
  id: string;
  name: string;
  position: string;
  title: string;
  image_url: string;
  bio: string;
  department?: string;
  display_order: number;
  is_active: boolean;
}

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  location: string;
  contractor: string;
  progress_percentage: number;
  is_featured: boolean;
  display_order: number;
}

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string;
  event_type: string;
  start_date: string;
  end_date: string;
  location: string;
  venue: string;
  organizer: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url: string;
  category: string;
  tags: string[];
  is_featured: boolean;
  display_order: number;
}

interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  category: string;
  file_size: number;
  is_published: boolean;
  uploaded_date: string;
  created_at: string;
  updated_at: string;
}

export default function AdminDashboardClient({ user }: { user: User }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [editingLeader, setEditingLeader] = useState<Leadership | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [slidesRes, newsRes, leadershipRes, settingsRes, projectsRes, eventsRes, galleryRes, documentsRes] = await Promise.all([
        fetch("/api/admin/slides"),
        fetch("/api/admin/news"),
        fetch("/api/admin/leadership"),
        fetch("/api/admin/settings"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/events"),
        fetch("/api/admin/gallery"),
        fetch("/api/admin/documents"),
      ]);

      // Parse responses
      let slidesData: any = { data: [] };
      let newsData: any = { data: [] };
      let leadershipData: any = { data: [] };
      let settingsData: any = { data: [] };
      let projectsData: any = { data: [] };
      let eventsData: any = { data: [] };
      let galleryData: any = { data: [] };
      let documentsData: any = { data: [] };

      try {
        if (slidesRes.ok) slidesData = await slidesRes.json();
        if (newsRes.ok) newsData = await newsRes.json();
        if (leadershipRes.ok) leadershipData = await leadershipRes.json();
        if (settingsRes.ok) settingsData = await settingsRes.json();
        if (projectsRes.ok) projectsData = await projectsRes.json();
        if (eventsRes.ok) eventsData = await eventsRes.json();
        if (galleryRes.ok) galleryData = await galleryRes.json();
        if (documentsRes.ok) documentsData = await documentsRes.json();
      } catch (parseError) {
        console.error("Error parsing JSON responses:", parseError);
      }

      // Show errors for failed requests
      if (!slidesRes.ok) {
        toast.error(`Failed to load slides: HTTP ${slidesRes.status}`);
      }
      if (!newsRes.ok) {
        toast.error(`Failed to load news: HTTP ${newsRes.status}`);
      }
      if (!leadershipRes.ok) {
        toast.error(`Failed to load leadership: HTTP ${leadershipRes.status}`);
      }
      if (!settingsRes.ok) {
        toast.error(`Failed to load settings: HTTP ${settingsRes.status}`);
      }
      if (!projectsRes.ok) {
        toast.error(`Failed to load projects: HTTP ${projectsRes.status}`);
      }
      if (!eventsRes.ok) {
        toast.error(`Failed to load events: HTTP ${eventsRes.status}`);
      }
      if (!galleryRes.ok) {
        toast.error(`Failed to load gallery: HTTP ${galleryRes.status}`);
      }
      if (!documentsRes.ok) {
        toast.error(`Failed to load documents: HTTP ${documentsRes.status}`);
      }

      // Update state with data
      setSlides(Array.isArray(slidesData?.data) ? slidesData.data : []);
      setNews(Array.isArray(newsData?.data) ? newsData.data : []);
      setLeadership(Array.isArray(leadershipData?.data) ? leadershipData.data : []);
      setSettings(Array.isArray(settingsData?.data) ? settingsData.data : []);
      setProjects(Array.isArray(projectsData?.data) ? projectsData.data : []);
      setEvents(Array.isArray(eventsData?.data) ? eventsData.data : []);
      setGallery(Array.isArray(galleryData?.data) ? galleryData.data : []);
      setDocuments(Array.isArray(documentsData?.data) ? documentsData.data : []);
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

  const saveSetting = async (setting: SiteSetting) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setting),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Setting updated successfully");
        await loadData();
        // Revalidate content cache
        await fetch("/api/content/settings");
      } else {
        toast.error(data.error || "Failed to save setting");
      }
    } catch (error) {
      console.error("Error saving setting:", error);
      toast.error("An error occurred while saving the setting");
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
    setSaving(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: item.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
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

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "slides", label: "Hero Slides", icon: Image },
    { id: "news", label: "News Posts", icon: Newspaper },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "events", label: "Events", icon: Calendar },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "leadership", label: "Leadership", icon: Users },
    { id: "assembly", label: "Assembly Members", icon: Users },
    { id: "settings", label: "Site Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-xl font-bold text-white">GSMA Admin</h1>
            <p className="text-slate-400 text-sm mt-1">{user.name}</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-[#8B0000] text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
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

      <main className="flex-1 min-w-0">
        <header className="bg-white border-b px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">
            {activeTab === "overview" ? "Dashboard" : activeTab.replace("-", " ")}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Image className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{slides.length}</p>
                        <p className="text-gray-500 text-sm">Hero Slides</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{news.length}</p>
                        <p className="text-gray-500 text-sm">News Posts</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{leadership.length}</p>
                        <p className="text-gray-500 text-sm">Leadership</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{settings.length}</p>
                        <p className="text-gray-500 text-sm">Settings</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{projects.length}</p>
                        <p className="text-gray-500 text-sm">Projects</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{events.length}</p>
                        <p className="text-gray-500 text-sm">Events</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Images className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{gallery.length}</p>
                        <p className="text-gray-500 text-sm">Gallery Items</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "slides" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingSlide({
                          id: "",
                          image_url: "",
                          title: "",
                          subtitle: "",
                          description: "",
                          display_order: slides.length + 1,
                          is_active: true,
                        })
                      }
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
                            onClick={() => saveSlide(editingSlide)}
                            disabled={saving}
                            className="bg-[#8B0000] hover:bg-[#6B0000]"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
                            onClick={() => deleteSlide(slide.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "news" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingNews({
                          id: "",
                          slug: "",
                          title: "",
                          excerpt: "",
                          content: "",
                          image_url: "",
                          published_date: new Date().toISOString().split("T")[0],
                          is_published: false,
                        })
                      }
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
                            onChange={(e) =>
                              setEditingNews({ ...editingNews, title: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Slug (URL)</Label>
                          <Input
                            value={editingNews.slug}
                            onChange={(e) =>
                              setEditingNews({ ...editingNews, slug: e.target.value })
                            }
                            placeholder="my-news-post"
                          />
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
                          <Label>Published Date</Label>
                          <Input
                            type="date"
                            value={editingNews.published_date ? editingNews.published_date.split('T')[0] : ''}
                            onChange={(e) =>
                              setEditingNews({ ...editingNews, published_date: e.target.value ? new Date(e.target.value).toISOString().split('T')[0] : '' })
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
                            onClick={() => saveNews(editingNews)}
                            disabled={saving}
                            className="bg-[#8B0000] hover:bg-[#6B0000]"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
                            onClick={() => deleteNews(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingProject({
                          id: "",
                          title: "",
                          slug: "",
                          description: "",
                          content: "",
                          image_url: "",
                          category: "ongoing",
                          status: "in-progress",
                          start_date: "",
                          end_date: "",
                          budget: 0,
                          location: "",
                          contractor: "",
                          progress_percentage: 0,
                          is_featured: false,
                          display_order: projects.length + 1,
                        })
                      }
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
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Slug (URL)</Label>
                          <Input
                            value={editingProject.slug}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, slug: e.target.value })
                            }
                            placeholder="my-project-slug"
                          />
                        </div>

                        <div>
                          <Label>Category</Label>
                          <Input
                            value={editingProject.category}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, category: e.target.value })
                            }
                            placeholder="ongoing / completed / proposed"
                          />
                        </div>

                        <div>
                          <Label>Status</Label>
                          <Input
                            value={editingProject.status}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, status: e.target.value })
                            }
                            placeholder="planning / in-progress / completed / on-hold"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={editingProject.start_date ? editingProject.start_date.split('T')[0] : ""}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  start_date: e.target.value || "",
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={editingProject.end_date ? editingProject.end_date.split('T')[0] : ""}
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
                            <Label>Progress %</Label>
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
                              setEditingProject({ ...editingProject, is_featured: checked })
                            }
                          />
                          <Label>Featured</Label>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => saveProject(editingProject)}
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
                          <Button
                            variant="outline"
                            onClick={() => setEditingProject(null)}
                          >
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
                            onClick={() => deleteProject(project.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "events" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingEvent({
                          id: "",
                          title: "",
                          slug: "",
                          description: "",
                          content: "",
                          image_url: "",
                          event_type: "meeting",
                          start_date: new Date().toISOString(),
                          end_date: "",
                          location: "",
                          venue: "",
                          organizer: "",
                          contact_person: "",
                          contact_email: "",
                          contact_phone: "",
                          is_featured: false,
                          is_published: true,
                          display_order: events.length + 1,
                        })
                      }
                      className="bg-[#8B0000] hover:bg-[#6B0000]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </div>

                  {editingEvent && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
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
                          <Label>Title</Label>
                          <Input
                            value={editingEvent.title}
                            onChange={(e) =>
                              setEditingEvent({ ...editingEvent, title: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Slug (URL)</Label>
                          <Input
                            value={editingEvent.slug}
                            onChange={(e) =>
                              setEditingEvent({ ...editingEvent, slug: e.target.value })
                            }
                            placeholder="my-event-slug"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Start Date/Time</Label>
                            <Input
                              type="datetime-local"
                              value={editingEvent.start_date ? new Date(editingEvent.start_date).toISOString().slice(0, 16) : ""}
                              onChange={(e) =>
                                setEditingEvent({
                                  ...editingEvent,
                                  start_date: e.target.value ? new Date(e.target.value).toISOString() : "",
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>End Date/Time (Optional)</Label>
                            <Input
                              type="datetime-local"
                              value={editingEvent.end_date ? new Date(editingEvent.end_date).toISOString().slice(0, 16) : ""}
                              onChange={(e) =>
                                setEditingEvent({
                                  ...editingEvent,
                                  end_date: e.target.value ? new Date(e.target.value).toISOString() : "",
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
                            onClick={() => saveEvent(editingEvent)}
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
                        className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
                      >
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-32 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {event.event_type} •{" "}
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
                            onClick={() => deleteEvent(event.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingGallery({
                          id: "",
                          title: "",
                          description: "",
                          image_url: "",
                          video_url: "",
                          category: "general",
                          tags: [],
                          is_featured: false,
                          display_order: gallery.length + 1,
                        })
                      }
                      className="bg-[#8B0000] hover:bg-[#6B0000]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Gallery Item
                    </Button>
                  </div>

                  {editingGallery && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <h3 className="font-semibold mb-4">
                        {editingGallery.id ? "Edit Gallery Item" : "New Gallery Item"}
                      </h3>
                      <div className="grid gap-4">
                        <ImageUpload
                          value={editingGallery.image_url}
                          onChange={(url) =>
                            setEditingGallery({ ...editingGallery, image_url: url })
                          }
                          folder="gallery"
                          label="Gallery Image"
                          aspectRatio="wide"
                        />

                        <div>
                          <Label>Title</Label>
                          <Input
                            value={editingGallery.title}
                            onChange={(e) =>
                              setEditingGallery({ ...editingGallery, title: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editingGallery.description}
                            onChange={(e) =>
                              setEditingGallery({
                                ...editingGallery,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label>Video URL (optional)</Label>
                          <Input
                            value={editingGallery.video_url || ""}
                            onChange={(e) =>
                              setEditingGallery({
                                ...editingGallery,
                                video_url: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Category</Label>
                            <Input
                              value={editingGallery.category}
                              onChange={(e) =>
                                setEditingGallery({
                                  ...editingGallery,
                                  category: e.target.value,
                                })
                              }
                              placeholder="general / photo / video / project / event"
                            />
                          </div>
                          <div>
                            <Label>Tags (comma separated)</Label>
                            <Input
                              value={(editingGallery.tags || []).join(", ")}
                              onChange={(e) =>
                                setEditingGallery({
                                  ...editingGallery,
                                  tags: e.target.value
                                    .split(",")
                                    .map((t) => t.trim())
                                    .filter(Boolean),
                                })
                              }
                              placeholder="e.g. durbar, sanitation, project"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={editingGallery.is_featured}
                            onCheckedChange={(checked) =>
                              setEditingGallery({ ...editingGallery, is_featured: checked })
                            }
                          />
                          <Label>Featured</Label>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => saveGallery(editingGallery)}
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
                          <Button
                            variant="outline"
                            onClick={() => setEditingGallery(null)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4">
                    {gallery.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
                      >
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-32 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-32 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No image
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-gray-500">
                            {item.category} {item.tags?.length ? `• ${item.tags.join(", ")}` : ""}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingGallery(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => deleteGallery(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "leadership" && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      onClick={() =>
                        setEditingLeader({
                          id: "",
                          name: "",
                          position: "",
                          title: "",
                          image_url: "",
                          bio: "",
                          department: undefined,
                          display_order: leadership.length + 1,
                          is_active: true,
                        })
                      }
                      className="bg-[#8B0000] hover:bg-[#6B0000]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Leader
                    </Button>
                  </div>

                  {editingLeader && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <h3 className="font-semibold mb-4">
                        {editingLeader.id ? "Edit Leader" : "New Leader"}
                      </h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
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
                          <Label>Department (HOD)</Label>
                          <select
                            value={editingLeader.department || ""}
                            onChange={(e) =>
                              setEditingLeader({ ...editingLeader, department: e.target.value || undefined })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                          >
                            <option value="">No Department (Executive)</option>
                            <option value="central-administration">Central Administration</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education, Youth & Sports</option>
                            <option value="health">Health</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="social-welfare">Social Welfare</option>
                            <option value="works">Works</option>
                          </select>
                        </div>
                        <ImageUpload
                          value={editingLeader.image_url}
                          onChange={(url) =>
                            setEditingLeader({ ...editingLeader, image_url: url })
                          }
                          folder="leadership"
                          label="Profile Image"
                          aspectRatio="square"
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
                        <div className="flex gap-2">
                          <Button
                            onClick={() => saveLeader(editingLeader)}
                            disabled={saving}
                            className="bg-[#8B0000] hover:bg-[#6B0000]"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
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
                        className="bg-white p-4 rounded-xl shadow-sm border flex items-center gap-4"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          {leader.image_url ? (
                            <img
                              src={leader.image_url}
                              alt={leader.name}
                              className="w-full h-full object-cover rounded-full"
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
                              Department: {leader.department.replace(/-/g, " ").toUpperCase()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingLeader(leader)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => deleteLeader(leader.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "assembly" && (
                <AssemblyManagement />
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-4">Site Settings</h3>
                    <div className="space-y-6">
                      {settings.map((setting) => (
                        <div key={setting.id} className="space-y-2">
                          <Label className="capitalize">
                            {setting.key.replace(/_/g, " ")}
                          </Label>
                          {setting.type === "textarea" ? (
                            <Textarea
                              value={setting.value}
                              onChange={(e) => {
                                const updated = settings.map((s) =>
                                  s.id === setting.id ? { ...s, value: e.target.value } : s
                                );
                                setSettings(updated);
                              }}
                              onBlur={() => saveSetting(setting)}
                              rows={4}
                            />
                          ) : (
                            <Input
                              value={setting.value}
                              onChange={(e) => {
                                const updated = settings.map((s) =>
                                  s.id === setting.id ? { ...s, value: e.target.value } : s
                                );
                                setSettings(updated);
                              }}
                              onBlur={() => saveSetting(setting)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-6">
                  {!editingDocument ? (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold">Upload Document</h3>
                        <Button
                          size="sm"
                          className="bg-[#8B0000] hover:bg-[#6B0000]"
                          onClick={() => setEditingDocument({
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
                          })}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          New Document
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold">{doc.title}</h4>
                              <p className="text-sm text-gray-500">
                                {doc.category} • {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {doc.is_published ? "✓ Published" : "Draft"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingDocument(doc)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => deleteDocument(doc.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {documents.length === 0 && (
                          <p className="text-center text-gray-500 py-8">
                            No documents yet. Click "New Document" to get started.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <h3 className="font-semibold mb-6">
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
                        <div className="flex gap-2">
                          <Button
                            onClick={() => saveDocument(editingDocument)}
                            disabled={saving || !editingDocument.title || !editingDocument.file_url}
                            className="bg-[#8B0000] hover:bg-[#6B0000]"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Document
                          </Button>
                          <Button variant="outline" onClick={() => setEditingDocument(null)}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
