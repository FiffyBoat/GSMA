"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  children?: SidebarLink[];
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
}

export default function Sidebar({ title, links }: SidebarProps) {
  const pathname = usePathname();
  const [openLink, setOpenLink] = useState<string | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-[#8B0000] px-[16px] sm:px-[18px] md:px-[20px] py-[14px] sm:py-[16px] md:py-[18px]">
        <h3 className="text-white font-bold text-[16px] sm:text-[17px] md:text-[18px]">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-100">
        {links.map((link) => {
          const childIsActive = link.children?.some((child) => pathname === child.href) || false;
          const isActive = pathname === link.href || childIsActive;
          const isOpen = openLink === link.href || childIsActive;

          return (
            <li key={link.href}>
              <div className="flex">
                <Link
                  href={link.href}
                  className={`flex flex-1 items-center justify-between px-[16px] sm:px-[18px] md:px-[20px] py-[12px] sm:py-[13px] md:py-[14px] text-[13px] sm:text-[14px] md:text-[15px] transition-colors ${
                    isActive
                      ? "bg-[#8B0000]/5 text-[#8B0000] font-semibold border-l-4 border-[#8B0000]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#8B0000]"
                  }`}
                >
                  {link.label}
                  {!link.children && (
                    <ChevronRight className={`w-[16px] sm:w-[17px] md:w-[18px] h-[16px] sm:h-[17px] md:h-[18px] ${isActive ? "text-[#8B0000]" : "text-gray-400"}`} />
                  )}
                </Link>
                {link.children && (
                  <button
                    type="button"
                    onClick={() => setOpenLink(isOpen ? null : link.href)}
                    className={`px-[14px] transition-colors ${
                      isActive ? "bg-[#8B0000]/5 text-[#8B0000]" : "text-gray-400 hover:bg-gray-50 hover:text-[#8B0000]"
                    }`}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${link.label}`}
                    aria-expanded={isOpen}
                  >
                    <ChevronDown className={`w-[16px] h-[16px] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {link.children && isOpen && (
                <ul className="bg-gray-50/70 py-[6px]">
                  {link.children.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-[28px] sm:px-[32px] md:px-[36px] py-[9px] text-[12px] sm:text-[13px] md:text-[14px] transition-colors ${
                            childActive
                              ? "text-[#8B0000] font-semibold"
                              : "text-gray-600 hover:text-[#8B0000]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
