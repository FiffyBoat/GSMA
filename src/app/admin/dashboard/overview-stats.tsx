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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STAT_CARDS.map(({ label, colorClassName, Icon, countKey }) => (
        <div key={label} className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClassName}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{counts[countKey]}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
