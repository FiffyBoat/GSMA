"use client";

import {
  Calendar,
  FolderKanban,
  Image as ImageIcon,
  Images,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";

interface OverviewStatsProps {
  slidesCount: number;
  newsCount: number;
  leadershipCount: number;
  settingsCount: number;
  projectsCount: number;
  eventsCount: number;
  galleryCount: number;
}

const STAT_CARDS = [
  {
    label: "Hero Slides",
    colorClassName: "bg-[#8B0000]/10 text-[#8B0000]",
    Icon: ImageIcon,
    countKey: "slidesCount",
  },
  {
    label: "News Posts",
    colorClassName: "bg-emerald-100 text-emerald-700",
    Icon: Newspaper,
    countKey: "newsCount",
  },
  {
    label: "Leadership",
    colorClassName: "bg-[#ffcc00]/25 text-[#8B0000]",
    Icon: Users,
    countKey: "leadershipCount",
  },
  {
    label: "Settings",
    colorClassName: "bg-slate-100 text-slate-700",
    Icon: Settings,
    countKey: "settingsCount",
  },
  {
    label: "Projects",
    colorClassName: "bg-sky-100 text-sky-700",
    Icon: FolderKanban,
    countKey: "projectsCount",
  },
  {
    label: "Events",
    colorClassName: "bg-rose-100 text-rose-700",
    Icon: Calendar,
    countKey: "eventsCount",
  },
  {
    label: "Gallery Items",
    colorClassName: "bg-teal-100 text-teal-700",
    Icon: Images,
    countKey: "galleryCount",
  },
] as const;

export default function OverviewStats({
  slidesCount,
  newsCount,
  leadershipCount,
  settingsCount,
  projectsCount,
  eventsCount,
  galleryCount,
}: OverviewStatsProps) {
  const counts = {
    slidesCount,
    newsCount,
    leadershipCount,
    settingsCount,
    projectsCount,
    eventsCount,
    galleryCount,
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
          Dashboard Overview
        </p>
        <h3 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
          Website Content Summary
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
          Review the main records currently managed from the admin dashboard.
          Use the sidebar to add, edit, publish, or organize public website
          content.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {STAT_CARDS.map(({ label, colorClassName, Icon, countKey }) => (
          <div key={label} className="rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-[8px] sm:h-12 sm:w-12 ${colorClassName}`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {counts[countKey]}
                </p>
                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                  {label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
