"use client";

import Link from "next/link";
import {
  Contact,
  FileStack,
  FileText,
  Landmark,
  CalendarDays,
  Images,
} from "lucide-react";

const quickAccessItems = [
  {
    title: "Our Services",
    href: "/services",
    icon: FileStack,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Departments",
    href: "/departments",
    icon: Landmark,
  },
  {
    title: "Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: Images,
  },
  {
    title: "Contact Us",
    href: "/contact",
    icon: Contact,
  },
];

export default function QuickAccessSection() {
  return (
    <section className="relative z-20 -mt-8 bg-transparent pb-[22px] sm:-mt-12 sm:pb-[28px] md:-mt-14 md:pb-[34px]">
      <div className="container mx-auto max-w-[1200px] px-[15px]">
        <div className="rounded-[28px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,250,244,0.96),rgba(247,243,236,0.94))] p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-[#eadfce] bg-white/90 px-4 py-4 text-center shadow-[0_10px_24px_rgba(16,24,40,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8B0000]/25 hover:bg-white hover:shadow-[0_18px_36px_rgba(16,24,40,0.12)] sm:min-h-[116px] sm:px-5"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B0000] text-white transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#6f0000]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-0 text-[13px] font-bold leading-tight text-[#1f2937] sm:text-[14px]">
                  {item.title}
                </h3>
              </Link>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}
