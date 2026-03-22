import {
  BookOpenText,
  Building2,
  Calendar,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Images,
  LayoutDashboard,
  Newspaper,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { hasAdminPermission, type AdminPermission, type AdminRole } from "@/lib/admin-roles";
import type { AdminTabId } from "./types";

export interface AdminNavItem {
  id: AdminTabId;
  label: string;
  icon: LucideIcon;
}

export interface AdminNavGroup {
  id: "dashboard" | "content" | "structure" | "system";
  label: string;
  icon: LucideIcon;
  items: AdminNavItem[];
}

export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }],
  },
  {
    id: "content",
    label: "Content",
    icon: BookOpenText,
    items: [
      { id: "slides", label: "Hero Slides", icon: ImageIcon },
      { id: "news", label: "News Posts", icon: Newspaper },
      { id: "projects", label: "Projects", icon: FolderKanban },
      { id: "events", label: "Events", icon: Calendar },
      { id: "gallery", label: "Gallery", icon: Images },
      { id: "documents", label: "Documents", icon: FileText },
    ],
  },
  {
    id: "structure",
    label: "Assembly Structure",
    icon: Building2,
    items: [
      { id: "departments", label: "Departments", icon: Building2 },
      { id: "leadership", label: "Leadership", icon: Users },
      { id: "assembly", label: "Assembly Members", icon: Users },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: ShieldCheck,
    items: [
      { id: "admin-users", label: "Admin Users", icon: Users },
      { id: "settings", label: "Site Settings", icon: SlidersHorizontal },
    ],
  },
];

const TAB_PERMISSIONS: Record<AdminTabId, AdminPermission> = {
  overview: "view_overview",
  slides: "manage_slides",
  news: "manage_news",
  projects: "manage_projects",
  events: "manage_events",
  gallery: "manage_gallery",
  documents: "manage_documents",
  departments: "manage_departments",
  leadership: "manage_leadership",
  assembly: "manage_assembly",
  "admin-users": "manage_admin_users",
  settings: "manage_settings",
};

export function canAccessAdminTab(role: AdminRole, tab: AdminTabId) {
  return hasAdminPermission(role, TAB_PERMISSIONS[tab]);
}

export function getAdminNavGroupsForRole(role: AdminRole): AdminNavGroup[] {
  return ADMIN_NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => canAccessAdminTab(role, item.id)),
  })).filter((group) => group.items.length > 0);
}

export function getDefaultAdminTab(role: AdminRole): AdminTabId {
  const firstItem = getAdminNavGroupsForRole(role)
    .flatMap((group) => group.items)[0];

  return firstItem?.id || "overview";
}

export function getAdminTabTitle(tab: AdminTabId): string {
  const item = ADMIN_NAV_GROUPS.flatMap((group) => group.items).find(
    (navItem) => navItem.id === tab
  );

  return item?.label || tab.replace("-", " ");
}

export function getAdminNavOpenState(activeTab: AdminTabId) {
  return Object.fromEntries(
    ADMIN_NAV_GROUPS.map((group) => [
      group.id,
      group.items.some((item) => item.id === activeTab),
    ])
  ) as Record<AdminNavGroup["id"], boolean>;
}
