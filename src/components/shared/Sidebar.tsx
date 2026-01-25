"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
}

export default function Sidebar({ title, links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-[#8B0000] px-[16px] sm:px-[18px] md:px-[20px] py-[14px] sm:py-[16px] md:py-[18px]">
        <h3 className="text-white font-bold text-[16px] sm:text-[17px] md:text-[18px]">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center justify-between px-[16px] sm:px-[18px] md:px-[20px] py-[12px] sm:py-[13px] md:py-[14px] text-[13px] sm:text-[14px] md:text-[15px] transition-colors ${
                  isActive
                    ? "bg-[#8B0000]/5 text-[#8B0000] font-semibold border-l-4 border-[#8B0000]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#8B0000]"
                }`}
              >
                {link.label}
                <ChevronRight className={`w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] ${isActive ? "text-[#8B0000]" : "text-gray-400"}`} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
