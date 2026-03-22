export const ADMIN_ROLES = ["super_admin", "content_admin", "editor"] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminPermission =
  | "view_overview"
  | "manage_slides"
  | "manage_news"
  | "manage_projects"
  | "manage_events"
  | "manage_gallery"
  | "manage_documents"
  | "manage_departments"
  | "manage_leadership"
  | "manage_assembly"
  | "manage_settings"
  | "manage_admin_users"
  | "upload_media";

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  content_admin: "Content Admin",
  editor: "Editor",
};

export const ADMIN_ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin:
    "Full access, including admin account management and site settings.",
  content_admin:
    "Manages site content and structure, but not admin accounts or system settings.",
  editor:
    "Handles day-to-day publishing for news, projects, events, gallery, and documents.",
};

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    "view_overview",
    "manage_slides",
    "manage_news",
    "manage_projects",
    "manage_events",
    "manage_gallery",
    "manage_documents",
    "manage_departments",
    "manage_leadership",
    "manage_assembly",
    "manage_settings",
    "manage_admin_users",
    "upload_media",
  ],
  content_admin: [
    "view_overview",
    "manage_slides",
    "manage_news",
    "manage_projects",
    "manage_events",
    "manage_gallery",
    "manage_documents",
    "manage_departments",
    "manage_leadership",
    "manage_assembly",
    "upload_media",
  ],
  editor: [
    "view_overview",
    "manage_news",
    "manage_projects",
    "manage_events",
    "manage_gallery",
    "manage_documents",
    "upload_media",
  ],
};

export function normalizeAdminRole(role?: string | null): AdminRole {
  if (role && ADMIN_ROLES.includes(role as AdminRole)) {
    return role as AdminRole;
  }

  if (role == null || role === "") {
    return "super_admin";
  }

  return "editor";
}

export function hasAdminPermission(
  role: string | null | undefined,
  permission: AdminPermission
): boolean {
  return ROLE_PERMISSIONS[normalizeAdminRole(role)].includes(permission);
}
