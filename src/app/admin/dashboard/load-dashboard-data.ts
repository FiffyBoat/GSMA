import type {
  AdminTabId,
  AdminDashboardData,
  Department,
  Document,
  Event,
  GalleryItem,
  HeroSlide,
  Leadership,
  NewsPost,
  Project,
  SiteSetting,
} from "./types";

type WrappedCollectionResponse<T> = {
  data?: T[];
};

const DASHBOARD_DATA_DEFAULTS: AdminDashboardData = {
  slides: [],
  news: [],
  leadership: [],
  settings: [],
  projects: [],
  events: [],
  gallery: [],
  documents: [],
  departments: [],
};

const DASHBOARD_TAB_ENDPOINTS: Array<{
  tab: AdminTabId;
  url: string;
  parser: "wrapped" | "array";
  key: keyof AdminDashboardData;
  label: string;
}> = [
  { tab: "slides", url: "/api/admin/slides", parser: "wrapped", key: "slides", label: "slides" },
  { tab: "news", url: "/api/admin/news", parser: "wrapped", key: "news", label: "news" },
  { tab: "leadership", url: "/api/admin/leadership", parser: "wrapped", key: "leadership", label: "leadership" },
  { tab: "settings", url: "/api/admin/settings", parser: "wrapped", key: "settings", label: "settings" },
  { tab: "projects", url: "/api/admin/projects", parser: "wrapped", key: "projects", label: "projects" },
  { tab: "events", url: "/api/admin/events", parser: "wrapped", key: "events", label: "events" },
  { tab: "gallery", url: "/api/admin/gallery", parser: "wrapped", key: "gallery", label: "gallery" },
  { tab: "documents", url: "/api/admin/documents", parser: "wrapped", key: "documents", label: "documents" },
  { tab: "departments", url: "/api/admin/departments", parser: "array", key: "departments", label: "departments" },
];

async function parseWrappedCollection<T>(
  response: Response,
  label: string
): Promise<{ data: T[]; error?: string }> {
  if (!response.ok) {
    return { data: [], error: `Failed to load ${label}: HTTP ${response.status}` };
  }

  try {
    const json = (await response.json()) as WrappedCollectionResponse<T>;
    return { data: Array.isArray(json?.data) ? json.data : [] };
  } catch (error) {
    console.error(`Error parsing ${label} response:`, error);
    return { data: [], error: `Failed to parse ${label} response` };
  }
}

async function parseArrayCollection<T>(
  response: Response,
  label: string
): Promise<{ data: T[]; error?: string }> {
  if (!response.ok) {
    return { data: [], error: `Failed to load ${label}: HTTP ${response.status}` };
  }

  try {
    const json = (await response.json()) as T[];
    return { data: Array.isArray(json) ? json : [] };
  } catch (error) {
    console.error(`Error parsing ${label} response:`, error);
    return { data: [], error: `Failed to parse ${label} response` };
  }
}

export async function loadAdminDashboardData(allowedTabs: AdminTabId[]): Promise<{
  data: AdminDashboardData;
  errors: string[];
}> {
  const allowed = new Set(allowedTabs);
  const results = await Promise.all(
    DASHBOARD_TAB_ENDPOINTS.map(async (entry) => {
      if (!allowed.has(entry.tab)) {
        return { key: entry.key, data: [], error: undefined };
      }

      const response = await fetch(entry.url);
      const parsed =
        entry.parser === "wrapped"
          ? await parseWrappedCollection<
              HeroSlide | NewsPost | Leadership | SiteSetting | Project | Event | GalleryItem | Document
            >(response, entry.label)
          : await parseArrayCollection<Department>(response, entry.label);

      return { key: entry.key, data: parsed.data, error: parsed.error };
    })
  );

  const data = { ...DASHBOARD_DATA_DEFAULTS };
  const errors = results
    .map((entry) => entry.error)
    .filter((error): error is string => Boolean(error));

  results.forEach((entry) => {
    data[entry.key] = entry.data as never;
  });

  return {
    data,
    errors,
  };
}
