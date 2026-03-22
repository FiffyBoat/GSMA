"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  backgroundImage?: string;
}

export default function PageHeader({
  title,
  breadcrumbs,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <div
      className="relative overflow-hidden bg-[#8B0000] py-[44px] sm:py-[56px] md:py-[68px] lg:py-[88px]"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(96, 11, 11, 0.82), rgba(43, 10, 10, 0.9)), url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,204,0,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="container relative mx-auto px-[15px]">
        <div className="max-w-4xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 sm:text-[12px]">
            Ga South Municipal Assembly
          </p>
          <h1 className="mb-[16px] text-[28px] font-bold leading-[1.12] text-white sm:text-[34px] md:mb-[18px] md:text-[40px] lg:text-[46px] xl:text-[52px]">
            {title}
          </h1>
        </div>

        <nav className="relative flex flex-wrap items-center gap-[6px] rounded-full border border-white/15 bg-white/8 px-4 py-2.5 text-[11px] shadow-sm backdrop-blur-sm sm:gap-[8px] sm:text-[12px] md:inline-flex md:text-[13px]">
          <Link
            href="/"
            className="flex items-center gap-[4px] text-white/80 transition-colors hover:text-[#ffcc00] sm:gap-[6px]"
          >
            <Home className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px] md:h-[18px] md:w-[18px]" />
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-[4px] sm:gap-[6px]">
              <ChevronRight className="h-[14px] w-[14px] text-white/60 sm:h-[15px] sm:w-[15px] md:h-[16px] md:w-[16px]" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-white/80 transition-colors hover:text-[#ffcc00]"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-medium text-[#ffcc00]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
