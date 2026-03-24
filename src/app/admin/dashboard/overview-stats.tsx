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
    colorClassName: "bg-blue-100 text-blue-600",
    Icon: ImageIcon,
    countKey: "slidesCount",
  },
  {
    label: "News Posts",
    colorClassName: "bg-green-100 text-green-600",
    Icon: Newspaper,
    countKey: "newsCount",
  },
  {
    label: "Leadership",
    colorClassName: "bg-purple-100 text-purple-600",
    Icon: Users,
    countKey: "leadershipCount",
  },
  {
    label: "Settings",
    colorClassName: "bg-orange-100 text-orange-600",
    Icon: Settings,
    countKey: "settingsCount",
  },
  {
    label: "Projects",
    colorClassName: "bg-indigo-100 text-indigo-600",
    Icon: FolderKanban,
    countKey: "projectsCount",
  },
  {
    label: "Events",
    colorClassName: "bg-pink-100 text-pink-600",
    Icon: Calendar,
    countKey: "eventsCount",
  },
  {
    label: "Gallery Items",
    colorClassName: "bg-teal-100 text-teal-600",
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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {STAT_CARDS.map(({ label, colorClassName, Icon, countKey }) => (
        <div key={label} className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${colorClassName}`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold sm:text-2xl">{counts[countKey]}</p>
              <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
